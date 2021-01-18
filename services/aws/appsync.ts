import {BasketItem, Item} from "../../contexts/Container";
import {v4 as uuidv4} from "uuid";
import {Storage} from "../../types/Storage";
import {DataStore, Predicates} from "aws-amplify";
import {Item as ItemModel} from "../../models";


export async function createItem(basket: Array<BasketItem>) {
    // convert items in basket
    const items = basket.map(item => {
        const date = new Date();
        date.setDate(date.getDate() + 10);

        return {
            id: uuidv4(),
            name: item.name,
            /*
                - JS string to AWSDateTime
                https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
                The AWSDateTime scalar type represents a valid extended ISO 8601 DateTime string.
             */
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            expiredAt: date.toISOString(), // | Date;
            storage: Storage.FRIDGE,
            category: item.category,
            memo: ''
        }
    })

    // save using appsync
    // for (const itemForm of items) {
    //     await DataStore.save(new ItemModel(itemForm));
    // }
    Promise.all(items.map(i => DataStore.save(new ItemModel(i))))
        .then(items => console.debug(`[HOMEBAB]: success to create item, ${items.map(i => i.name).join(', ')}`))


    // record event
    // Analytics.record({
    //     name: 'ADD_FRIDGE_ITEMS',
    //     deleteItem: {},
    //     addItemIds: items.map(item => item.id),
    //     metrics: {}
    // })
    //     .then(res => console.debug(`[HOMEBAB]: success to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(res)}`))
    //     .catch(err => console.warn(`[HOMEBAB]: fail to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(err)}`))
}

export async function updateItem(item: Item) {
    const original = await DataStore.query(ItemModel, item.id)

    await DataStore.save<ItemModel>(
        ItemModel.copyOf(original!, updated => {
            console.log('updateItem ', updated)

            // editable
            updated.memo = item.memo
            updated.storage = item.storage
            updated.expiredAt = item.expiredAt.toISOString()

            // timestamp
            updated.updatedAt = new Date().toISOString()
        })
    );
}

export function deleteItem(item: any, wasteAmount: number) {
    DataStore.delete(ItemModel, item.id)
        .then(res => console.debug("[HOMEBAB]: success to delete item, ", res.name))
        .catch(err => console.debug("[HOMEBAB]: fail to delete item, ", err))

    // Analytics.record({
    //     name: 'DELETE_FRIDGE_ITEM',
    //     // customize spreading Object
    //     deleteItem: {...item},
    //     addItemIds: [],
    //     metrics: {'WASTE_AMOUNT': wasteAmount}
    // })
    //     .then(res => console.debug(`[HOMEBAB]: success to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(res)}`))
    //     .catch(err => console.warn(`[HOMEBAB]: fail to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(err)}`))
}

export function deleteAllItems() {
    DataStore.delete(ItemModel, Predicates.ALL)
        .then((res: Array<ItemModel>) => console.debug("[HOMEBAB]: success to delete all items, ", res.map(i => i.name)))
        .catch(err => console.debug("[HOMEBAB]: fail to delete all items, ", err));
}
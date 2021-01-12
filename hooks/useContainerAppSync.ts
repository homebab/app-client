import {useContainerContext, Item as CustomItem} from "../contexts/Container";
import {Analytics, DataStore, Predicates} from "aws-amplify";
import {Item} from "../src/models";
import {ModelInit} from "@aws-amplify/datastore";
import {useEffect} from "react";
import {Storage} from "../types/Storage";

/*
    This is bridge between Container Context and AppSync (Amplify DataStore)
    Appsync takes precedence over Context
 */
const useContainerAppSync = () => {

    const {containerState, containerDispatch} = useContainerContext();
    const {fridge, basket} = containerState;

    useEffect(() => {
        fetchItems()
        const subscription = DataStore.observe(Item).subscribe(() => fetchItems())
        console.debug("[omtm]: subscribe appsync")
        return () => {
            subscription.unsubscribe()
            console.debug("[omtm]: unsubscribe appsync")
        }
    }, [])

    async function fetchItems() {
        const items = await DataStore.query(Item)
        console.debug("[omtm] success to fetch items, ", items.map(item => item.name))
        containerDispatch({
            type: 'SET_FRIDGE',
            fridge: new Map(items.map(item => {
                return [item.id, {...item, storage: Storage[item.storage as keyof typeof Storage], expiredAt: new Date(item.expiredAt)}]
            })) // ? convertContainer(new Map(JSON.parse(items))) : new Map()
        });
    }

    async function createItem() {
        // convert items in basket
        // Array<ModelInit<Item>>
        const items: any = basket.map(item => {
            const date = new Date();
            date.setDate(date.getDate() + 10);

            return {
                id: item.id,
                name: item.name,
                /*
                    - JS string to AWSDateTime
                    https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
                    The AWSDateTime scalar type represents a valid extended ISO 8601 DateTime string.
                 */
                expiredAt: date.toISOString(), // | Date;
                storage: Storage.FREEZER,
                category: item.category,
                memo: ''
            }
        })

        // save using appsync
        for (const itemForm of items) {
            await DataStore.save(new Item(itemForm));
        }

        // record event
        Analytics.record({
            name: 'ADD_FRIDGE_ITEMS',
            deleteItem: {},
            addItemIds: items.map(item => item.id),
            metrics: {}
        })
            .then(res => console.debug(`[omtm]: success to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(res)}`))
            .catch(err => console.warn(`[omtm]: fail to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(err)}`))
    }

    function deleteItem(item: any, wasteAmount: number) {
        // const item = await DataStoreore.query(Item, id)
        DataStore.delete(Item, item.id)
            .then(res => console.debug("[omtm]: success to delete item, ", res))
            .catch(err => console.debug("[omtm]: fail to delete item, ", err))

        Analytics.record({
            name: 'DELETE_FRIDGE_ITEM',
            // customize spreading Object
            deleteItem: {...item},
            addItemIds: [],
            metrics: {'WASTE_AMOUNT': wasteAmount}
        })
            .then(res => console.debug(`[omtm]: success to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(res)}`))
            .catch(err => console.warn(`[omtm]: fail to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(err)}`))
    }

    function deleteAllItems() {
        DataStore.delete(Item, Predicates.ALL)
            .then(res => console.debug("[omtm]: success to delete all items, ", res))
            .catch(err => console.debug("[omtm]: fail to delete all items, ", err));
    }

    return {fridge, createItem, deleteItem, deleteAllItems};
};

export default useContainerAppSync;
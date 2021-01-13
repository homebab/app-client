import {useContainerContext} from "../contexts/Container";
import {Analytics, DataStore, Predicates} from "aws-amplify";
import {Item} from "../src/models";
import {useEffect} from "react";
import {Storage} from "../types/Storage";
import {Category} from "../types/Category";
import {v4 as uuidv4} from 'uuid';

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
        console.debug("[omtm] success to fetch items, ", items)
        containerDispatch({
            type: 'SET_FRIDGE',
            fridge: items.map(item =>
                ({
                    ...item,
                    storage: item.storage as Storage,
                    category: item.category as Category,
                    createdAt: new Date(item.createdAt),
                    updatedAt: new Date(item.updatedAt),
                    expiredAt: new Date(item.expiredAt)
                })
            ) // ? convertContainer(new Map(JSON.parse(items))) : new Map()
        });
    }

    async function createItem() {
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
                storage: Storage.FREEZER,
                category: item.category,
                memo: ''
            }
        })
        console.log(items)
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
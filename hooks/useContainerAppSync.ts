import {useContainerContext, Item, BasketItem} from "../contexts/Container";
import {Analytics, DataStore, Hub, Predicates} from "aws-amplify";
import {Item as ItemModel} from "../models";
import {useEffect, useState} from "react";
import {Storage} from "../types/Storage";
import {Category} from "../types/Category";
import {v4 as uuidv4} from 'uuid';
import {useNetInfo} from "@react-native-community/netinfo";
import useThenable from "@react-navigation/native/lib/typescript/src/useThenable";
import {HubCallback} from "@aws-amplify/core/src/Hub";

/*
    This is bridge between Container Context and AppSync (Amplify DataStore)
    Appsync takes precedence over Context
 */
const useContainerAppSync = () => {

    const {containerState, containerDispatch} = useContainerContext();
    const {fridge} = containerState;

    const netInfo = useNetInfo();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (isLoading && fridge.length > 0) setIsLoading(false)
    }, [fridge]);

    /*
        - https://docs.amplify.aws/lib/datastore/data-access/q/platform/js#query-data
        Queries are performed against the local store.
        When cloud synchronization is enabled,
        the local store is updated in the background by the DataStore Sync Engine.
    */
    const hubListener: HubCallback = ({channel: channel, payload: {event, data}}) => {
        console.debug(`[AMPLIFY_HUB]: on channel '${channel}' listen event - ${event} with data - ${JSON.stringify(data)}`);
        switch (event) {
            case "storageSubscribed":
                if (isLoading && !netInfo) setIsLoading(false);
                break;
            case "syncQueriesReady":
                if (isLoading && netInfo) setIsLoading(false);
                break;
        }
    }

    useEffect(() => {

        // Git Issue : https://github.com/aws-amplify/amplify-js/issues/4808
        // Document  : https://docs.amplify.aws/lib/datastore/datastore-events/q/platform/js
        Hub.listen("datastore", hubListener)

        fetchItems()

        const subscription = DataStore.observe(ItemModel).subscribe(() => fetchItems());
        console.debug("[HOMEBAB]: subscribe appsync");

        return () => {
            Hub.remove('datastore', hubListener);
            subscription.unsubscribe();
  
            console.debug("[HOMEBAB]: unsubscribe appsync");
        }
    }, [])

    async function fetchItems() {
        const items = await DataStore.query(ItemModel)
        console.debug("[HOMEBAB] success to fetch items, ", items.map(i => i.name).join(', '));
        
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

        // return items
    }

    return {isLoading, fridge};
};

export default useContainerAppSync;



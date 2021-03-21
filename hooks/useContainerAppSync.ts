import {useContainerContext} from "../contexts/Container";
import {DataStore, Hub} from "aws-amplify";
import {Item as ItemModel} from "../models";
import {useEffect} from "react";
import {Storage} from "../types/Storage";
import {Category} from "../types/Category";
import {useNetInfo} from "@react-native-community/netinfo";
import {HubCallback} from "@aws-amplify/core/src/Hub";
import {useLoadingContext} from "../contexts/Loading";

/*
    This is bridge between Container Context and AppSync (Amplify DataStore)
    Appsync takes precedence over Context
 */
const useContainerAppSync = () => {

    const {containerState, containerDispatch} = useContainerContext();
    const {isLoading, showLoading, hideLoading} = useLoadingContext();

    const {fridge} = containerState;

    const netInfo = useNetInfo();

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
                if (isLoading && !netInfo) hideLoading();
                break;
            case "syncQueriesReady":
                if (isLoading && netInfo) hideLoading();
                break;
        }
    }

    useEffect(() => {

        // Git Issue : https://github.com/aws-amplify/amplify-js/issues/4808
        // Document  : https://docs.amplify.aws/lib/datastore/datastore-events/q/platform/js
        Hub.listen("datastore", hubListener)

        showLoading();
        fetchItems();

        const subscription = DataStore.observe(ItemModel).subscribe(() => fetchItems());
        console.debug("[HOMEBAB]: subscribe appsync");

        return () => {
            Hub.remove('datastore', hubListener);
            subscription.unsubscribe();

            console.debug("[HOMEBAB]: unsubscribe appsync");
        }
    }, [])

    useEffect(() => {
        if (isLoading && fridge.length > 0) hideLoading();
    }, [fridge]);

    async function fetchItems() {
        const items = await DataStore.query(ItemModel)
        console.debug("[HOMEBAB] success to fetch items, ", items.map(i => i.id.substring(0, 4)).join(', '));

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



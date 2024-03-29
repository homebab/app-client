import {useContainerContext} from "../contexts/Container";
import {DataStore, Hub, API} from "aws-amplify";
import {Item} from "../models";
import {useEffect} from "react";
import {Storage} from "../types/Storage";
import {Category} from "../types/Category";
import {useNetInfo} from "@react-native-community/netinfo";
import {HubCallback} from "@aws-amplify/core/src/Hub";
import {useLoadingContext} from "../contexts/Loading";
import {fetchItems} from "../services/aws/appsync";

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
        fetch();

        const subscription = DataStore.observe(Item).subscribe(() => fetch());
        console.debug("[HOMEBAB]: subscribe appsync");

        return () => {
            Hub.remove('datastore', hubListener);
            DataStore.clear().then(_ => console.debug('[HOMEBAB]: success to clear datastore'));
            subscription.unsubscribe();

            console.debug("[HOMEBAB]: unsubscribe appsync");
        }
    }, [])

    useEffect(() => {
        if (isLoading && fridge.length > 0) hideLoading();
    }, [fridge]);

    async function fetch() {
        fetchItems()
            .then(items => {
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
                    )
                });
            })
    }

    return {isLoading, fridge};
};

export default useContainerAppSync;



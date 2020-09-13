import * as React from 'react';
import {getUserItems} from "../services/api";
import {Item, useAccountContext} from "../contexts/Account";

export default function useUserItems() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // const navigation = useNavigation();

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {id} = profile;

    const loadUserItems = () => {
        getUserItems(id)
            .then(res => {
                const container = res as Array<Item>;
                const converted = container.map(item => {
                    return {
                        ...item,
                        expiredAt: new Date(item.expiredAt)
                    }
                })
                accountDispatch({type: 'setContainer', value: {container: converted}})
                setLoadingComplete(true);
            })
            .catch(
                err => alert(err)
            )
    }

    React.useEffect(() => {
        loadUserItems();
    }, []);

    return isLoadingComplete;
}

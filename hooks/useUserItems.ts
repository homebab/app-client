import * as React from 'react';
import {getUserItems} from "../services/api";
import {useAccountContext} from "../contexts/Account";

export default function useUserItems() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // const navigation = useNavigation();

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {id} = profile;

    const loadUserItems = () => {

        getUserItems(id)
            .then(res => {
                console.log(JSON.stringify(res));
                accountDispatch({type: 'setContainer', value: {container: res}})
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

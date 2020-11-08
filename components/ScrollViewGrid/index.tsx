
import {ScrollView, View} from "react-native";
import {styles} from "../../screens/ListItems/styles";
import React, {useState} from "react";
import DeleteModal from "../DeleteItem";
import ItemCard from "../ItemCard";
import Grid from "../Grid";
import { Item } from "../../contexts/Container";

type Props = {
    container: Array<any>
}
const ScrollViewGrid = (props: Props) => {
    const {container} = props;

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
                // contentContainerStyle={{alignItems: "center"}}
                //         refreshControl={
                //             <RefreshControl
                //                 refreshing={refreshing}
                //                 onRefresh={() => refreshUserItems()}
                //             />
                //         }
            >

                <Grid container={container}/>
            </ScrollView>
        </View>
    )
}

export default ScrollViewGrid


// const [refreshing, setRefreshing] = useState<boolean>(false);

// useEffect(() => {
//     AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(container))
//         .then(_ => {
//             console.log(`[omtm]: success to sync Account Context with AsyncStorage`);
//             // setVisibleDeleteModal(false);
//         })
//         .catch(err => console.error('[omtm]: fail to sync Account Context with AsyncStorage', err));
// }, [container])


// const refreshUserItems = () => {
//     setRefreshing(true);
//
//     console.log(accountState.cachedUser.username)
//     Analytics.record({
//         name: 'refreshUserItems',
//         attributes: {message: `hello im ${accountState.cachedUser.username}`}
//     })
//         .then(res => console.debug("[omtm]: success to record an event through AWS pinpoint with " + res))
//         .catch(err => console.warn("[omtm]: fail to record with " + err))
//
//     AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)
//         .then(userItems => {
//             accountDispatch({
//                 type: 'setContainer',
//                 value: {container: userItems ? convertContainer(JSON.parse(userItems)) : []}
//             });
//             setRefreshing(false);
//         })
//         .catch(err => {
//             alert(`식자재 정보를 불러오지 못했습니다. ${err}`);
//             setRefreshing(false);
//         })
// }
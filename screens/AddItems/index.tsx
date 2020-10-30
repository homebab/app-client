import React from "react";
import {styles} from "./styles";
import {ScrollView, View} from "react-native";
import {useAccountContext} from "../../contexts/Account";
import {useNavigation} from "@react-navigation/native";
import ingredients from "../../assets/ingredients.json"
import ItemsGrid from "./ItemsGrid";

const AddItems = () => {

    const navigation = useNavigation();

    const {accountState, accountDispatch} = useAccountContext();
    const container = ingredients.과일

    // useEffect(() => {
    //     AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(container))
    //         .then(_ => {
    //             console.log(`[omtm]: success to sync Account Context with AsyncStorage`);
    //             // setVisibleDeleteModal(false);
    //         })
    //         .catch(err => console.error('[omtm]: fail to sync Account Context with AsyncStorage', err));
    // }, [container])

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
                <ItemsGrid container={container}/>
            </ScrollView>
        </View>
    )
}

export default AddItems;

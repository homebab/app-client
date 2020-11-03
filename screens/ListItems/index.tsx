import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ItemNavigator from "../../navigators/ItemNavigator";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import {Item, useAccountContext} from "../../contexts/Account";
import DeleteModal from "../../components/DeleteItemModal";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import Grid from "../../components/Grid";

const ItemsGrid = () => {

    const {accountState} = useAccountContext();
    const {container} = accountState;

    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const itemCards = container.sort((l: Item, r: Item) => l.expiredAt.getTime() - r.expiredAt.getTime())
        .map((item: Item, key: number) => (
            <View key={key}>
                <DeleteModal item={item} visible={visibleDeleteModal}
                             hideModal={() => setVisibleDeleteModal(false)}/>
                <ItemCard label={item.name}
                    // showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}
                />
            </View>
        ))

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

                <Grid container={itemCards}/>
            </ScrollView>
        </View>
    )
}
const ListItems = () => {

    const navigation = useNavigation()

    return (
        <>
            <ItemNavigator Component={ItemsGrid}/>

            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ListItems;


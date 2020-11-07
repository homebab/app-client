import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ItemNavigator from "../../navigators/ItemNavigator";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import DeleteModal from "../../components/DeleteItemModal";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";


const ListItems = () => {

    const navigation = useNavigation()

    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const ListItemsGrid = (container: Array<Item>) => {
        const itemCards = container // .sort((l: Item, r: Item) => l.expiredAt!.getTime() - r.expiredAt!.getTime())
            .map((item: Item, key: number) => (
                <View key={key}>
                    {/*<DeleteModal item={item} visible={visibleDeleteModal}*/}
                    {/*             hideModal={() => setVisibleDeleteModal(false)}/>*/}
                    <ItemCard label={item.name}
                        // showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}
                    />
                </View>
            ))

        return (
            <ScrollViewGrid container={itemCards}/>
        )
    }

    return (
        <>
            <ItemNavigator Component={ListItemsGrid} container={fridge}/>

            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ListItems;


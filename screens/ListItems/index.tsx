import React, {useState} from "react";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import StorageNavigator, {HOCStorageNavigator} from "../../navigators/StorageNavigator";

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

const ListItems: React.FC = () => {

    const navigation = useNavigation()

    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);


    return (
        <>
            {/*<StorageNavigator component={ListItemsGrid} container={fridge}/>*/}
            <CategoryNavigator component={HOCStorageNavigator(ListItemsGrid)} container={fridge}/>

            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ListItems;


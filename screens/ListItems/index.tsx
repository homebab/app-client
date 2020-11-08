import React, {useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {AntDesign} from "@expo/vector-icons";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import {HOCStorageNavigator} from "../../navigators/StorageNavigator";
import LocalStorage from "../../constants/LocalStorage";
import AsyncStorage from "@react-native-community/async-storage";
import DetailItem from "../DetailItem";
import BottomModal from "../../components/BottomModal";

const ListItemCard = ({item}: { item: Item }) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View>
            <BottomModal
                style={{flex: 0.6, backgroundColor: 'white', width: '100%', borderRadius: 24, padding: 16}}
                visible={isVisible} handlePress={() => setIsVisible(false)}>
                <DetailItem item={item} navigatePop={() => setIsVisible(false)}/>
            </BottomModal>

            <TouchableOpacity onPress={() => setIsVisible(true)}>
                {/*<DeleteModal item={item} visible={visibleDeleteModal}*/}
                {/*             hideModal={() => setVisibleDeleteModal(false)}/>*/}
                <ItemCard item={item}
                    // showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}
                />
            </TouchableOpacity>
        </View>
    )
}

const ItemsGrid = (container: Array<Item>) => {

    return (
        <ScrollViewGrid container={container.map((item: Item, key: number) => <ListItemCard key={key} item={item}/>)}/>
    )
}

const ListItems: React.FC = () => {

    const navigation = useNavigation()

    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(fridge))
            .then(_ => {
                console.log(`[omtm]: success to sync Account Context with AsyncStorage`);
                // setVisibleDeleteModal(false);
            })
            .catch(err => console.error('[omtm]: fail to sync Account Context with AsyncStorage', err));
    }, [fridge])

    return (
        <>
            {/*<StorageNavigator component={ListItemsGrid} container={fridge}/>*/}
            <CategoryNavigator component={HOCStorageNavigator(ItemsGrid)} container={fridge}/>

            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ListItems;


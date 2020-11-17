import React, {useEffect, useMemo, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import LocalStorage from "../../constants/LocalStorage";
import AsyncStorage from "@react-native-community/async-storage";
import DetailItem from "../DetailItem";
import BottomModal from "../../components/BottomModal";
import {Storage} from "../../types/Storage";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import {Category} from "../../types/Category";

const ListItemCard = ({item}: { item: Item }) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View>
            <BottomModal
                containerStyle={{flex: 0.5, backgroundColor: 'white', alignItems: 'center',  width: '100%', borderTopEndRadius: 32, borderTopLeftRadius: 32}}
                visible={isVisible} handlePress={() => setIsVisible(false)}>
                <DetailItem item={item} navigatePop={() => setIsVisible(false)}/>
            </BottomModal>

            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <ItemCard item={item}/>
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

    useEffect(() => {
        AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(Array.from(fridge.entries())))
            .then(_ => {
                console.log(`[omtm]: success to sync Account Context with AsyncStorage`);
                // setVisibleDeleteModal(false);
            })
            .catch(err => console.error('[omtm]: fail to sync Account Context with AsyncStorage', err));
    }, [fridge])

    const storages = Object.values(Storage);
    const [storage, setStorage] = useState<Storage>(storages[0]);

    const categories = Object.values(Category);
    const [category, setCategory] = useState<Category>(categories[0]);

    const filteredItems = useMemo(() => {
        const filteredByStorage = storage === Storage.TOTAL? Array.from(fridge.values()): Array.from(fridge.values()).filter(item => item.storage === storage);
        return filteredByStorage.filter(ingredient => ingredient.category == category);
    }, [category, storage]);

    return (
        <>
            <HorizontalTypesView types={categories} pressedType={category} onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}/>
            <HorizontalTypesView types={storages} pressedType={storage} onPressHandler={(s: Storage) => setStorage(s)} scrollEnabled={false} containerStyle={{padding: '8%'}}/>
            {ItemsGrid(filteredItems)}
            {/*<CategoryNavigator component={HOCStorageNavigator(ItemsGrid)} container={Array.from(fridge.values())}/>*/}

            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ListItems;


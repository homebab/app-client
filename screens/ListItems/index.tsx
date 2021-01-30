import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomModal from "../../components/BottomModal";
import CrossIconButton from "../../components/CrossIconButton";
import Grid from "../../components/Grid";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import ItemCard from "../../components/ItemCard";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import SearchBar from "../../components/SearchBar";
import Assets from "../../constants/Assets";
import Layout from "../../constants/Layout";
import { Item } from "../../contexts/Container";
import useContainerAppSync from "../../hooks/useContainerAppSync";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import { styles as navigatorStyles } from "../../navigators/styles";
import { Category } from "../../types/Category";
import { Storage } from "../../types/Storage";
import { isTablet } from "../../utils/responsive";
import DetailItem from "../DetailItem";
import { styles, tabletStyles } from "./styles";

const ListItemCard = ({ item }: { item: Item }) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View>
            <BottomModal
                containerStyle={{
                    flex: 0.7,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    width: '100%',
                    borderTopEndRadius: 32,
                    borderTopLeftRadius: 32
                }}
                visible={isVisible} handlePress={() => setIsVisible(false)}>
                <DetailItem item={item} navigatePop={() => setIsVisible(false)} />
            </BottomModal>

            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <ItemCard item={item} avatarStyle={styles.avatarStyle} containerStyle={styles.itemContainer}
                    iconSize={hp(5)} textStyle={styles.itemLabel} />
            </TouchableOpacity>
        </View>
    )
}

const ItemsGrid = (container: Array<Item>) => {


    return (
        <View style={styles.itemGridContainer}>
            {
                container.length == 0 ?
                    <RelativeCenterLayout containerStyle={{ marginBottom: hp(8) }}>
                        <Image source={Assets.Image.emptyFridge} resizeMethod={'resize'}
                            style={{ height: Layout.window.width * 2 / 3, aspectRatio: 1 }} />
                        <Text style={{ fontFamily: 'nanum-square-round', fontSize: hp(2) }}>{'냉장고가 텅 비었습니다'}</Text>
                    </RelativeCenterLayout> :
                    <Grid container={container ?
                        container.map((item: Item, key: number) => <ListItemCard key={key} item={item} />)
                        : []} chunkSize={isTablet ? 5 : 4} />
            }
        </View>
    )
}

const ListItems: React.FC = () => {

    const navigation = useNavigation()

    const { isLoading, fridge } = useContainerAppSync();

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isSearching ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CrossIconButton containerStyle={[navigatorStyles.headerIcon, { marginRight: 16 }]} size={28}
                            onPress={() => setIsSearching(false)} />
                    </View> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Search containerStyle={[navigatorStyles.headerIcon, { marginRight: 16 }]} size={28}
                            onPress={() => setIsSearching(true)} />
                    </View>
        });
    }, [isSearching, navigation]);

    // useEffect(() => {
    //     // AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(Array.from(fridge.entries())))
    //     //     .then(_ => console.log(`[HOMEBAB]: success to sync Account Context with AsyncStorage`))
    //     //     .catch(err => console.error('[HOMEBAB]: fail to sync Account Context with AsyncStorage', err));
    //
    //     return () => console.log('UNMOUNTED on ListItems');
    // }, [fridge])

    const storages = ["전체"].concat(Object.values(Storage));
    const [storage, setStorage] = useState<Storage | string>(storages[0]);

    const categories = ["전체"].concat(Object.values(Category));
    const [category, setCategory] = useState<Category | string>(categories[0]);

    const filteredItems = useMemo(() => {
        const filteredByStorage = storage === '전체' ? fridge : fridge.filter(item => item.storage == storage);
        return category === '전체' ? filteredByStorage : filteredByStorage.filter(ingredient => ingredient.category == category);
    }, [category, storage, fridge]);


    if (isLoading) return <Loading />
    else
        return (
            <>
                {
                    isSearching ?
                        <>
                            <SearchBar
                                placeholder={"식품을 입력해주세요."} value={searchWord}
                                onChangeText={text => setSearchWord(text)}
                                onStartEditing={() => setIsSearching(true)}
                                onEndEditing={() => {
                                    setIsSearching(false)
                                    setSearchWord('')
                                }} />
                            {ItemsGrid(filteredItems.filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false))}
                        </> :
                        <>
                            <HorizontalTypesView types={categories} pressedType={category}
                                onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}
                                containerStyle={styles.categoryBar} textStyle={styles.text} />
                            <HorizontalTypesView types={storages} pressedType={storage}
                                onPressHandler={(s: Storage) => setStorage(s)} scrollEnabled={false}
                                containerStyle={isTablet ? tabletStyles.storageBar : styles.storageBar}
                                textStyle={styles.text} />
                            {ItemsGrid(filteredItems)}

                            <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('AddItems')}>
                                <AntDesign name="plus" color='white' style={styles.plusIcon} />
                            </TouchableOpacity>
                        </>
                }
            </>
        )
}

export default ListItems;


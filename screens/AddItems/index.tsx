import React, {useEffect, useMemo, useState} from "react";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {v4 as uuidv4} from 'uuid';
import Layout from "../../constants/Layout";
import {useNavigation} from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import {Category} from "../../types/Category";
import HorizontalTypesScrollView from "../../components/HorizontalTypesScrollView";

const AddItemCard = ({item}: { item: Item }) => {
    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const isContained = basket.filter(i => i.name == item.name).length > 0;

    const handlePress = (_: GestureResponderEvent) => {
        // isContain ? deleteItem : addItem
        const updatedBasket = isContained ?
            basket.filter(i => i.name != item.name) :
            [...basket, {id: uuidv4(), name: item.name, category: item.category}];
        containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard style={[isContained ? {opacity: 0.3} : {opacity: 1}, {width: Layout.window.width * 0.9 / 4}]}
                      item={item}/>
        </TouchableOpacity>);
}

const ItemsGrid: React.FC<Array<Item>> = (container: Array<Item>) => {

    return (
        <ScrollViewGrid container={container ?
            container.map((item: Item, key: number) => <AddItemCard key={key} item={item}/>)
            : []
        } chunkSize={4}/>
    )
}

const AddItems = () => {

    const {containerDispatch} = useContainerContext();
    const navigation = useNavigation();

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({type: 'flushBasket', value: null})
    }, [])

    const ingredients = useMemo(() => {
            console.log('다시 계산1')
            return Object.keys(Ingredients)
                .map(key => Ingredients[key as keyof Ingredients].map(name => {

                        // Dummy id
                        return {id: '', name: name, category: key}
                    })
                )
                .reduce((acc, val) => acc.concat(val))
        }, [Ingredients]
    );

    const a = useMemo(() => <CategoryNavigator component={ItemsGrid} container={ingredients}/>, [ingredients])
    const categories = Object.values(Category)
    const [category, setCategory] = useState<string>(categories[0]);

    return (
        <>
            {/*<Modal visible={search}>*/}
            {/*    <View style={{position: "absolute", flex: 1, backgroundColor: "pink"}}>*/}
            {/*        <SearchItems/>*/}
            {/*    </View>*/}
            {/*</Modal>*/}
            <SearchBar
                placeholder={"식품을 직접 입력해주세요."} value={searchWord}
                onChangeText={text => setSearchWord(text)}
                onStartEditing={() => setIsSearching(true)}
                onEndEditing={() => setIsSearching(false)}
            />
            {isSearching ?
                ItemsGrid(ingredients) :
                <>
                    <HorizontalTypesScrollView types={categories} pressedType={category} onPressHandler={(c: string) => setCategory(c)}/>
                    {ItemsGrid(ingredients)}
                </>
            }

        </>
    )
}

export default AddItems;


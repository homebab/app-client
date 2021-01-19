import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {imageKeys, Ingredients} from "../../constants/Ingredients";
import {BasketItem, useContainerContext} from "../../contexts/Container";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, ScrollView, TouchableOpacity, View, Text, PointPropType} from "react-native";
import Layout from "../../constants/Layout";
import SearchBar from "../../components/SearchBar";
import {Category} from "../../types/Category";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import Grid from "../../components/Grid";
import useOffsetMap, {OffsetAction} from "../../hooks/useOffsetMap";

const AddItemCard = ({item}: { item: BasketItem }) => {
    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const pressed = useMemo(() =>
        basket.filter(i => i.name == item.name).length > 0,
        [basket, item]);
    // const [pressed, setPressed] = useState(false);

    const handlePress = (_: GestureResponderEvent) => {
        const dispatchType = pressed ? "DELETE_BASKET_ITEM" : "ADD_BASKET_ITEM"
        containerDispatch({type: dispatchType, item: item})
        // setPressed(!pressed);

        console.debug(`[HOMEBAB]: success to ${dispatchType}, ${item.name}`)
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard containerStyle={[pressed ? {opacity: 0.3} : {opacity: 1}, {width: Layout.window.width * 0.9 / 4}]}
                      item={item}/>
        </TouchableOpacity>);
}

const CategoryGrid = ({category, ingredients, offsetDispatch}: {category: string, ingredients: Array<BasketItem>, offsetDispatch: Dispatch<OffsetAction>}) => {
    const ref = useRef<View>(null);
    const [a, setA] = useState(0);

    useEffect(() => {
        console.log(a)}, [a])
    // console.log(ref.current.props.onLayout())
    return (
        <View ref={ref} style={{padding: '4%'}}
              onLayout={(event => {
                  const {x, y} = event.nativeEvent.layout
                  offsetDispatch({type: "SET_OFFSET", payload: {category: category as Category, point: {x, y}}});
              })}>
            <Text style={{fontSize: 20, fontFamily: 'nanum-square-round-bold', padding: '8%'}}>{category}</Text>
            <Grid container={ingredients
                .map((item: BasketItem, key: number) => <AddItemCard key={key}
                                                                     item={item}/>)
            } chunkSize={4}/>
        </View>
    )
}

const AddItems = () => {

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({type: 'FLUSH_BASKET'})
        console.debug("[HOMEBAB]: success to FLUSH_BASKET")
    }, [])

    const ingredients = useMemo(() => Object.keys(Ingredients)
            .map(key => ({
                [key]: Ingredients[key as keyof Ingredients].map(name => ({
                    name: name,
                    category: key as Category
                }))
            }))
            .reduce((val, acc) => ({...val, ...acc}))
        , [Ingredients])

    const categories = ["전체"].concat(Object.values(Category));
    const [category, setCategory] = useState<Category | string>(categories[0]);

    const {offsetState, offsetDispatch} = useOffsetMap(new Map());

    useEffect(() => console.log(offsetState), [offsetState])

    return (
        <>
            <SearchBar
                placeholder={"식품을 입력해주세요."} value={searchWord}
                onChangeText={text => setSearchWord(text)}
                onStartEditing={() => setIsSearching(true)}
                onEndEditing={() => {
                    setIsSearching(false)
                    setSearchWord('')
                }}
                containerStyle={{paddingBottom: 8}}
            />
            {isSearching ?
                <ScrollView style={{backgroundColor: "#f2f2f2"}}>
                    <Grid container={Object.values(ingredients)
                        .reduce((acc, val) => acc.concat(val))
                        .filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)
                        .map((item: BasketItem, key: number) => <AddItemCard key={key} item={item}/>)
                    } chunkSize={4}/>
                </ScrollView> :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                                         onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}/>
                    <ScrollView
                        style={{backgroundColor: "#f2f2f2"}}
                        contentOffset={category == "전체" ? {x: 0, y: 0}: offsetState.get(category as Category)}>
                        {
                            Object.keys(ingredients)
                                .map((category, k) =>
                                    <CategoryGrid key={k} category={category} ingredients={ingredients[category]} offsetDispatch={offsetDispatch}/>)
                        }
                    </ScrollView>
                </>
            }
        </>
    )
}

export default AddItems;


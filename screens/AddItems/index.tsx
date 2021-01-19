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

const CategoryGrid = ({
                          category,
                          ingredients,
                          offsetDispatch
                      }: { category: string, ingredients: Array<BasketItem>, offsetDispatch: Dispatch<OffsetAction> }) => {


    return (
        <View style={{padding: '4%'}}
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

    const ingredientObj = useMemo(() => Object.keys(Ingredients)
            .map(key => ({
                [key]: Ingredients[key as keyof Ingredients].map(name => ({
                    name: name,
                    category: key as Category
                }))
            }))
            .reduce((val, acc) => ({...val, ...acc}))
        , [Ingredients])

    const ingredients = useMemo(() => Object.values(ingredientObj)
        .reduce((acc, val) => acc.concat(val)), [ingredientObj])

    const categories = ["전체"].concat(Object.values(Category));
    const [category, setCategory] = useState<Category | string>(categories[0]);

    const {offsetState, offsetDispatch} = useOffsetMap(new Map());
    const scroller = useRef<ScrollView>(null);

    useEffect(() => {
        if (scroller && scroller.current) {
            const offset = offsetState.get(category as Category) ?? {x: 0, y: 0}

            scroller.current.scrollTo({
                ...offset,
                animated: true
            })
        }
    }, [category])

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
                    <Grid container={ingredients
                        .filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)
                        .map((item: BasketItem, key: number) => <AddItemCard key={key} item={item}/>)
                    } chunkSize={4}/>
                </ScrollView> :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                                         onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}/>
                    <ScrollView
                        ref={scroller}
                        style={{backgroundColor: "#f2f2f2"}}
                    >
                        <View style={{padding: '4%'}}>
                            <Text style={{
                                fontSize: 20, fontFamily: 'nanum-square-round-bold', padding: '8%'
                            }}>{"바구니"}</Text>
                            <Grid container={basket.map((item: BasketItem, key: number) =>
                                <AddItemCard key={key} item={item}/>)} chunkSize={4}/>
                        </View>
                        <View style={{padding: '4%'}}>
                            <Text style={{
                                fontSize: 20, fontFamily: 'nanum-square-round-bold', padding: '8%'
                            }}>{"인기"}</Text>
                            <Grid container={ingredients
                                .filter(item => imageKeys.includes(item.name))
                                .map((item: BasketItem, key: number) => <AddItemCard key={key}
                                                                                     item={item}/>)
                            } chunkSize={4}/>
                        </View>
                        {
                            Object.keys(ingredientObj)
                                .map((category, k) =>
                                    <CategoryGrid key={k} category={category} ingredients={ingredientObj[category]}
                                                  offsetDispatch={offsetDispatch}/>)
                        }
                    </ScrollView>
                </>
            }
        </>
    )
}

export default AddItems;


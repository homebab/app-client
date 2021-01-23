import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {imageKeys, ingredientObj, ingredients} from "../../constants/Ingredients";
import {BasketItem, useContainerContext} from "../../contexts/Container";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, ScrollView, TouchableOpacity, View, Text, PointPropType} from "react-native";
import Layout from "../../constants/Layout";
import SearchBar from "../../components/SearchBar";
import {Category} from "../../types/Category";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import Grid from "../../components/Grid";
import useOffsetMap, {OffsetAction} from "../../hooks/useOffsetMap";
import {styles} from "./styles";
import {isTablet} from "../../utils/responsive";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

const AddItemCard = ({item}: { item: BasketItem }) => {
    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const pressed = useMemo(() =>
        basket.filter(i => i.name == item.name).length > 0,
        [basket, item]);
    // const [pressed, setPressed] = useState(false);

    const handlePress = (_: GestureResponderEvent) => {
        const dispatchType = pressed ? "DELETE_BASKET_ITEM" : "ADD_BASKET_ITEM";
        containerDispatch({type: dispatchType, item: item});

        console.debug(`[HOMEBAB]: success to ${dispatchType}, ${item.name}`);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard item={item} avatarStyle={styles.avatarStyle} containerStyle={[pressed ? {opacity: 0.3} : {opacity: 1},styles.itemContainer]}
                      iconSize={hp(5)} textStyle={styles.itemLabel} />
        </TouchableOpacity>);
}

const CategoryGrid = ({category, ingredients, chunkSize, offsetDispatch}:
                          { category: string, ingredients: Array<BasketItem>, chunkSize: number, offsetDispatch?: Dispatch<OffsetAction> }) => {

    return (
        <View style={styles.itemGridContainer}
              onLayout={(event => {
                  if (offsetDispatch) {
                      const {x, y} = event.nativeEvent.layout
                      offsetDispatch({type: "SET_OFFSET", payload: {category: category as Category, point: {x, y}}});
                  }
              })}>
            <Text style={styles.itemGridLabel}>{category}</Text>
            <Grid container={ingredients
                .map((item: BasketItem, key: number) => <AddItemCard key={key}
                                                                     item={item}/>)
            } chunkSize={chunkSize}/>
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

    const chunkSize = isTablet ? 5 : 4

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
            />
            {isSearching ?
                <ScrollView style={{backgroundColor: "#f2f2f2"}}>
                    <Grid container={ingredients
                        .filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)
                        .map((item: BasketItem, key: number) => <AddItemCard key={key} item={item}/>)
                    } chunkSize={chunkSize} containerStyle={styles.itemGridContainer}/>
                </ScrollView> :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                                         onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}
                                         containerStyle={styles.categoryBar} textStyle={styles.text}/>
                    <ScrollView
                        ref={scroller}
                        style={{backgroundColor: "#f2f2f2"}}
                    >
                        {/*<View style={{padding: '4%'}}>*/}
                        {/*    <Text style={{*/}
                        {/*        fontSize: 20, fontFamily: 'nanum-square-round-bold', padding: '8%'*/}
                        {/*    }}>{"바구니"}</Text>*/}
                        {/*    <Grid container={basket.map((item: BasketItem, key: number) =>*/}
                        {/*        <AddItemCard key={key} item={item}/>)} chunkSize={4}/>*/}
                        {/*</View>*/}
                        <CategoryGrid category={'인기'} ingredients={ingredients
                            .filter(item => imageKeys.includes(item.name))} chunkSize={chunkSize}/>
                        {
                            Object.keys(ingredientObj)
                                .map((category, k) =>
                                    <CategoryGrid key={k} category={category} ingredients={ingredientObj[category]}
                                                  chunkSize={chunkSize} offsetDispatch={offsetDispatch}/>)
                        }
                    </ScrollView>
                </>
            }
        </>
    )
}

export default AddItems;


import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, GestureResponderEvent, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Grid from "../../components/Grid";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import ItemCard from "../../components/ItemCard";
import SearchBar from "../../components/SearchBar";
import { imageKeys, ingredientObj, ingredients } from "../../constants/Ingredients";
import { BasketItem, useContainerContext } from "../../contexts/Container";
import { Category } from "../../types/Category";
import { delay } from "../../utils/functions";
import { isTablet } from "../../utils/responsive";
import { styles } from "./styles";

const AddItemCard = ({ item }: { item: BasketItem }) => {
    const { containerState, containerDispatch } = useContainerContext();
    const { basket } = containerState;

    const pressed = useMemo(() =>
        basket.filter(i => i.name == item.name).length > 0,
        [basket, item]);
    // const [pressed, setPressed] = useState(false);

    const handlePress = (_: GestureResponderEvent) => {
        const dispatchType = pressed ? "DELETE_BASKET_ITEM" : "ADD_BASKET_ITEM";
        containerDispatch({ type: dispatchType, item: item });

        console.debug(`[HOMEBAB]: success to ${dispatchType}, ${item.name}`);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard item={item} avatarStyle={styles.avatarStyle} containerStyle={[pressed ? { opacity: 0.3 } : { opacity: 1 }, styles.itemContainer]}
                iconSize={hp(5)} textStyle={styles.itemLabel} />
        </TouchableOpacity>);
}

type CategoryGridProps = { category: string, ingredients: Array<BasketItem>, chunkSize: number };

const CategoryGrid = ({ item }: { item: CategoryGridProps }) => {
    const { category, ingredients, chunkSize } = item;

    return (
        <View style={styles.itemGridContainer}>
            <Text style={styles.itemGridLabel}>{category}</Text>
            <Grid container={ingredients
                .map((item: BasketItem, key: number) => <AddItemCard key={key}
                    item={item} />)
            } chunkSize={chunkSize} />
        </View>
    )
}

const AddItems = () => {

    const { containerState, containerDispatch } = useContainerContext();
    const { basket } = containerState;

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({ type: 'FLUSH_BASKET' })
        console.debug("[HOMEBAB]: success to FLUSH_BASKET")
    }, [])

    const categories = ["인기"].concat(Object.values(Category));
    const [category, setCategory] = useState<Category | string>(categories[0]);

    const scroller = useRef<FlatList>(null);

    useEffect(() => {
        scroller.current?.scrollToIndex({
            index: categories.indexOf(category),
            animated: true
        })
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
                <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
                    <Grid container={ingredients
                        .filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)
                        .map((item: BasketItem, key: number) => <AddItemCard key={key} item={item} />)
                    } chunkSize={chunkSize} containerStyle={styles.itemGridContainer} />
                </ScrollView> :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                        onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}
                        containerStyle={styles.categoryBar} textStyle={styles.text} />
                    {/* <ScrollView
                        ref={scroller}
                        style={{ backgroundColor: "#f2f2f2" }}
                    > */}
                    {/*<View style={{padding: '4%'}}>*/}
                    {/*    <Text style={{*/}
                    {/*        fontSize: 20, fontFamily: 'nanum-square-round-bold', padding: '8%'*/}
                    {/*    }}>{"바구니"}</Text>*/}
                    {/*    <Grid container={basket.map((item: BasketItem, key: number) =>*/}
                    {/*        <AddItemCard key={key} item={item}/>)} chunkSize={4}/>*/}
                    {/*</View>*/}
                    {/* <CategoryGrid item={{
                            category: '인기',
                            ingredients: ingredients
                                .filter(item => imageKeys.includes(item.name)),
                            chunkSize
                        }}/> */}
                    {
                        <FlatList
                            ref={scroller}
                            keyExtractor={item => item.category}
                            data={categories.map(category => ({
                                category,
                                ingredients: category == "인기"
                                    ? ingredients
                                        .filter(item => imageKeys.includes(item.name))
                                    : ingredientObj[category] ?? [],
                                chunkSize
                            }))}
                            renderItem={CategoryGrid}
                            initialNumToRender={2}
                            maxToRenderPerBatch={20}
                            onScrollToIndexFailed={info => {
                                const offset = info.averageItemLength * info.index;
                                scroller.current?.scrollToEnd({ animated: true });

                                // It is not ideal but needed
                                setTimeout(() => {
                                    scroller.current?.scrollToIndex({ animated: true, index: info.index });
                                }, 100);
                            }}
                        />
                        //     Object.keys(ingredientObj)
                        //     .map((category, k) =>
                        //         <CategoryGrid key={k} category={category} ingredients={ingredientObj[category]}
                        // chunkSize={chunkSize} offsetDispatch={offsetDispatch} />)
                    }
                    {/* </ScrollView> */}
                </>
            }
        </>
    )
}

export default AddItems;


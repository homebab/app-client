import React, { useEffect, useMemo, useState } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Grid from "../../components/Grid";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import ItemCard from "../../components/ItemCard";
import SearchBar from "../../components/SearchBar";
import { imageKeys, ingredientObj, ingredients } from "../../constants/Ingredients";
import { BasketItem, useContainerContext } from "../../contexts/Container";
import { Category } from "../../types/Category";
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

const CategoryGrid = (props: CategoryGridProps) => {
    const { ingredients, chunkSize } = props;

    return (
        <View style={styles.itemGridContainer}>
            <Grid
                data={ingredients}
                renderItem={({ item }) => <AddItemCard item={item} />}
                chunkSize={chunkSize}
            />
        </View>
    )
}

const AddItems = () => {

    const { containerDispatch } = useContainerContext();

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({ type: 'FLUSH_BASKET' })
        console.debug("[HOMEBAB]: success to FLUSH_BASKET")
    }, [])

    const categories = ["인기"].concat(Object.values(Category));
    const [category, setCategory] = useState<Category | string>(categories[0]);

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
                <Grid data={ingredients.filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)}
                    renderItem={({ item }) => <AddItemCard item={item} />} chunkSize={chunkSize} containerStyle={styles.itemGridContainer} /> :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                        onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}
                        containerStyle={styles.categoryBar} textStyle={styles.text} />
                    <CategoryGrid
                        category={category}
                        ingredients={category == "인기"
                            ? ingredients
                                .filter(item => imageKeys.includes(item.name))
                            : ingredientObj[category] ?? []}
                        chunkSize={chunkSize} />
                </>
            }
        </>
    )
}

export default AddItems;


import React, {useEffect, useMemo, useState} from "react";
import {Ingredients} from "../../constants/Ingredients";
import {BasketItem, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, TouchableOpacity} from "react-native";
import Layout from "../../constants/Layout";
import SearchBar from "../../components/SearchBar";
import {Category} from "../../types/Category";
import HorizontalTypesView from "../../components/HorizontalTypesView";

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

        console.debug(`[omtm]: success to ${dispatchType}, ${item.name}`)
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard containerStyle={[pressed ? {opacity: 0.3} : {opacity: 1}, {width: Layout.window.width * 0.9 / 4}]}
                      item={item}/>
        </TouchableOpacity>);
}

const ItemsGrid = React.memo(({container}: {container: Array<BasketItem>}) => {

    return (
        <ScrollViewGrid container={container ?
            container.map((item: BasketItem, key: number) => <AddItemCard key={key} item={item}/>)
            : []
        } chunkSize={4}/>
    )
})

const AddItems = () => {

    const {containerDispatch} = useContainerContext();

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({type: 'FLUSH_BASKET'})
        console.debug("[omtm]: success to FLUSH_BASKET")
    }, [])

    const ingredients = useMemo(() => {
            return new Map(Object.keys(Ingredients)
                .map(key => [
                    key as Category, <ItemsGrid container={Ingredients[key as keyof Ingredients].map(name => ({
                        name: name,
                        category: key as Category
                    }))}/>
                ]))
        }
        , [Ingredients]
    );

    const categories = Object.values(Category);
    const [category, setCategory] = useState<Category>(categories[0]);

    return (
        <>
            <SearchBar
                placeholder={"식품 이름을 입력해주세요."} value={searchWord}
                onChangeText={text => setSearchWord(text)}
                onStartEditing={() => setIsSearching(true)}
                onEndEditing={() => {
                    setIsSearching(false)
                    setSearchWord('')
                }}
                containerStyle={{paddingBottom: 8}}
            />
            {isSearching ?
                ItemsGrid([]) :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                                         onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}/>
                    {ingredients.get(category)}
                </>
            }
        </>
    )
}

export default AddItems;


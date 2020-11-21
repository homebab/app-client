import React, {useEffect, useMemo, useState} from "react";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, TouchableOpacity} from "react-native";
import Layout from "../../constants/Layout";
import SearchBar from "../../components/SearchBar";
import {Category} from "../../types/Category";
import HorizontalTypesView from "../../components/HorizontalTypesView";
import {v4 as uuidv4} from 'uuid';

const AddItemCard = ({item}: { item: Item }) => {
    const {containerDispatch} = useContainerContext();

    const [pressed, setPressed] = useState(false);

    const handlePress = (_: GestureResponderEvent) => {
        if (pressed) {
            containerDispatch({type: "DELETE_BASKET_ITEM", name: item.name})
            setPressed(false);
        } else {
            containerDispatch({type: "ADD_BASKET_ITEM", item: {...item, id: uuidv4()}});
            setPressed(true);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard containerStyle={[pressed ? {opacity: 0.3} : {opacity: 1}, {width: Layout.window.width * 0.9 / 4}]} item={item}/>
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

    const [isSearching, setIsSearching] = useState(false)
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        containerDispatch({type: 'FLUSH_BASKET'})
    }, [])

    const ingredients = useMemo(() => {
            return Object.keys(Ingredients)
                .map(key => Ingredients[key as keyof Ingredients].map(name => {
                        // Dummy id
                        return {id: '', name: name, category: key}
                    })
                )
                .reduce((acc, val) => acc.concat(val))
        }, [Ingredients]
    );

    const categories = Object.values(Category).filter(c => c != Category.TOTAL);
    const [category, setCategory] = useState<Category>(categories[0]);

    return (
        <>
            <SearchBar
                placeholder={"식품을 직접 입력해주세요."} value={searchWord}
                onChangeText={text => setSearchWord(text)}
                onStartEditing={() => setIsSearching(true)}
                onEndEditing={() => setIsSearching(false)}
                containerStyle={{paddingBottom: 8}}
            />
            {isSearching ?
                ItemsGrid(ingredients.filter(ingredient => searchWord ? ingredient.name.includes(searchWord) : false)) :
                <>
                    <HorizontalTypesView types={categories} pressedType={category}
                                         onPressHandler={(c: Category) => setCategory(c)} scrollEnabled={true}/>
                    {ItemsGrid(category === Category.TOTAL ? ingredients : ingredients.filter(ingredient => ingredient.category == category))}
                </>
            }
        </>
    )
}

export default AddItems;


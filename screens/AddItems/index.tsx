import React, {useEffect} from "react";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, TextInput, TouchableOpacity, View} from "react-native";
import {v4 as uuidv4} from 'uuid';
import Layout from "../../constants/Layout";
import Search from "../../components/Search";
import {Ionicons} from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";

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
            <ItemCard style={[isContained ? {opacity: 0.3} : {opacity: 1}, {width: Layout.window.width * 0.8 / 4}]}
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

    const {containerDispatch} = useContainerContext()

    useEffect(() => {
        containerDispatch({type: 'flushBasket', value: null})
    }, [])

    const ingredients = Object.keys(Ingredients)
        .map(key => Ingredients[key as keyof Ingredients].map(name => {
                // Dummy id
                return {id: '', name: name, category: key}
            })
        )
        .reduce((acc, val) => acc.concat(val));

    return (
        <>
            <SearchBar/>
            <CategoryNavigator component={ItemsGrid} container={ingredients}/>
        </>
    )
}

export default AddItems;


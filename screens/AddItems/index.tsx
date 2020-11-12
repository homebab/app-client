import React, {FC, useEffect} from "react";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import ItemCard from "../../components/ItemCard";
import {GestureResponderEvent, TouchableOpacity} from "react-native";

const AddItemCard = ({item}: {item: Item}) => {
    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const isContained = basket.filter(i => i.name == item.name).length > 0;

    const handlePress = (_: GestureResponderEvent) => {
        // isContain ? deleteItem : addItem
        const updatedBasket = isContained ?
            basket.filter(i => i.name != item.name) :
            [...basket, {name: item.name, category: item.category}];
        containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ItemCard style={isContained? {opacity: 0.3}: {opacity: 1}} item={item}/>
        </TouchableOpacity>);
}

const ItemsGrid: React.FC<Array<Item>> = (container: Array<Item>) => {

    return (
        <ScrollViewGrid container={container ?
            container.map((item: Item, key: number) => <AddItemCard key={key} item={item}/>)
            : []
        }/>
    )
}

const AddItems = () => {

    const {containerDispatch} = useContainerContext()
    const route = useRoute();

    useEffect(() => {
        containerDispatch({type: 'flushBasket', value: null})
    }, [])

    const ingredients = Object.keys(Ingredients)
        .map(key => Ingredients[key as keyof Ingredients].map(name => {
                return {name: name, category: key}
            })
        )
        .reduce((acc, val) => acc.concat(val));

    return (
        <>
            <CategoryNavigator component={ItemsGrid} container={ingredients}/>
        </>
    )
}

export default AddItems;


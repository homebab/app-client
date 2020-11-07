import React, {useEffect} from "react";
import ItemNavigator from "../../navigators/ItemNavigator";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import AddItemCard from "../../components/ItemCard/AddItemCard";


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

    const AddItemsGrid = (container: Array<Item>) => {
        return (
            <ScrollViewGrid container={container ?
                container.map((item: Item, key: number) => <AddItemCard key={key} item={item}/>)
                : []
            }/>
        )
    }

    return (
        <>
            <ItemNavigator Component={AddItemsGrid} container={ingredients}/>
        </>
    )
}

export default AddItems;


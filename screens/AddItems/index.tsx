import React, {useEffect} from "react";
import CategoryNavigator from "../../navigators/CategoryNavigator";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";
import AddItemCard from "../../components/ItemCard/AddItemCard";

const AddItemsGrid = (container: Array<Item>) => {
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
            <CategoryNavigator component={AddItemsGrid} container={ingredients}/>
        </>
    )
}

export default AddItems;


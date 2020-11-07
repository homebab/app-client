import React, {useEffect} from "react";
import ItemNavigator from "../../navigators/ItemNavigator";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import AddItemCard from "../../components/AddItemCard";
import {Item, useContainerContext} from "../../contexts/Container";
import ScrollViewGrid from "../../components/ScrollViewGrid";


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

        const items: Array<string> | null = Ingredients[route.name as keyof Ingredients]
        return (
            <ScrollViewGrid container={container ?
                container.map((item: Item, key: number) => <AddItemCard key={key} label={item.name}/>)
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


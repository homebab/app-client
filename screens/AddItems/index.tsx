import React, {useEffect} from "react";
import {ScrollView, View} from "react-native";
import ItemNavigator from "../../navigators/ItemNavigator";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import AddItemCard from "../../components/AddItemCard";
import {useContainerContext} from "../../contexts/Container";


const ItemsGrid = () => {
    const route = useRoute();

    const items: Array<string> | null = Ingredients[route.name as keyof Ingredients]

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}>
                <Grid container={
                    items ?
                        items.map((name: string, key: number) => <AddItemCard key={key} label={name}/>)
                        : []
                }/>
            </ScrollView>
        </View>
    )
}


const AddItems = () => {

    const {containerDispatch} = useContainerContext()

    useEffect(() => {
        containerDispatch({type: 'flushBasket', value: null})
    }, [])

    return (
        <>
            <ItemNavigator Component={ItemsGrid}/>
        </>
    )
}

export default AddItems;


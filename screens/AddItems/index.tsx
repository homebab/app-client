import React from "react";
import {ScrollView, View} from "react-native";
import ItemNavigator from "../../navigators/ItemNavigator";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import { useRoute } from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";

type props = {}

const ItemsGrid = () => {
    const route = useRoute();

    const items = Ingredients[route.name as keyof Ingredients]
    const itemCards = items? items.map((item: string, key: number) => <ItemCard key={key} label={item}/>) : []

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
            >
                <Grid container={itemCards}/>
            </ScrollView>
        </View>
    )
}


const AddItems = () => {

    return (
        <>
            <ItemNavigator Component={ItemsGrid}/>
        </>
    )
}

export default AddItems;


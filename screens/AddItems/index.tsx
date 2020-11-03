import React from "react";
import {ScrollView, View} from "react-native";
import ItemNavigator from "../../navigators/ItemNavigator";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import ingredients from "../../assets/ingredients.json"
import { useRoute } from "@react-navigation/native";

const AddItems = () => {

    const route = useRoute();

    console.log(typeof ingredients)
    const ItemsGrid = () => {

        const itemCards = ingredients.과일
            .map((item: string, key: number) => <ItemCard key={key} label={item}/>)

        return (
            <View style={styles.container}>
                <ScrollView style={{backgroundColor: "#f2f2f2"}}
                >
                    <Grid container={itemCards}/>
                </ScrollView>
            </View>
        )
    }

    return (
        <>
            <ItemNavigator Component={ItemsGrid}/>
        </>
    )
}

export default AddItems;


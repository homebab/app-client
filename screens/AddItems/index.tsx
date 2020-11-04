import React from "react";
import {ScrollView, View} from "react-native";
import ItemNavigator from "../../navigators/ItemNavigator";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import AddItemCard from "../../components/AddItemCard";

type props = {}

// const itemCards = (name: string, key: number) => {
//
//     const {containerState, containerDispatch} = useContainerContext();
//     const {basket} = containerState;
//
//     useEffect(() => {
//         console.log(basket)
//     }, [basket])
//
//
//     const isContained = basket.filter(item => item.name == name).length > 0;
//
//     const handlePress = (_: GestureResponderEvent) => {
//         console.log(isContained)
//         const updatedBasket = isContained ? basket.filter(item => item.name != name) : [...basket, {name: name}];
//         containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
//     }
//
//     return (
//         <View key={key} style={isContained ? {opacity: 0.2} : {opacity: 1}}>
//             <ItemCard label={name} handlePress={handlePress}/>
//         </View>
//     )
// }

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

    return (
        <>
            <ItemNavigator Component={ItemsGrid}/>
        </>
    )
}

export default AddItems;


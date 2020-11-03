import React, {useEffect} from "react";
import {GestureResponderEvent, ScrollView, View} from "react-native";
import ItemNavigator from "../../navigators/ItemNavigator";
import ItemCard from "../../components/ItemCard";
import {styles} from "./styles";
import Grid from "../../components/Grid";
import {useRoute} from "@react-navigation/native";
import {Ingredients} from "../../constants/Ingredients";
import {useContainerContext, Item} from "../../contexts/Container";

type props = {}

const ItemsGrid = () => {
    const route = useRoute();

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    useEffect(() => {
        if (route.name == "채소")
            console.log(basket)
    }, [basket])

    // const [isPressed, setIsPressed] = useState<boolean>(!basket.filter(item => item.name == label));

    const items = Ingredients[route.name as keyof Ingredients]
    const itemCards = (basket: Array<Item>) => items ? items.map((name: string, key: number) => {

        const isContained = basket.filter(item => item.name == name).length > 0;

        const handlePress = (_: GestureResponderEvent) => {
            // isPressed ? setIsPressed(false) : setIsPressed(true);
            // console.log("re")
            // console.log(name)
            // console.log(basket)
            console.log(isContained)
            const updatedBasket = isContained ? basket.filter(item => item.name != name) : [...basket, {name: name}];
            // console.log(updatedBasket)
            containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
        }

        return (
            <View key={key} style={isContained ? {opacity: 0.2} : {opacity: 1}}>
                <ItemCard label={name} handlePress={handlePress}/>
            </View>
        )
    }) : []

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
            >
                <Grid container={itemCards(basket)}/>
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


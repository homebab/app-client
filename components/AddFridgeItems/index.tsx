import {Item, useContainerContext} from "../../contexts/Container";
import {v4 as uuidv4} from "uuid";
import {Storage} from "../../types/Storage";
import {AntDesign} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";


const AddFridgeItems = () => {

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();

    const handlePress = () => {
        const userItems: Array<Item> = basket.map(item => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            
            return {
                id: uuidv4(),
                name: item.name,
                createdAt: new Date(),
                updatedAt: new Date(),
                expiredAt: date, // | Date;
                storage: Storage.FRIDGE,
                category: item.category,
            }
        })
        containerDispatch({type: 'addFridgeItems', value: userItems})
        navigation.pop()
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <AntDesign name={"arrowright"} size={28} color="black"
                       style={{marginRight: 16}}/>
        </TouchableOpacity>
    )
}

export default AddFridgeItems;
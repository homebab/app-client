import {Item, useContainerContext} from "../../contexts/Container";
import {v4 as uuidv4} from "uuid";
import {Storage} from "../../types/Storage";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, ViewStyle} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";

type Props = {
    containerStyle?: ViewStyle,
    size?: number,
}

const AddFridgeItems = (props: Props) => {

    const {containerStyle, size} = props;
    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();

    const handlePress = () => {
        const userItems: Array<Item> = basket.map(item => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            
            return {
                id: item.id,
                name: item.name,
                createdAt: new Date(),
                updatedAt: new Date(),
                expiredAt: date, // | Date;
                storage: Storage.FRIDGE,
                category: item.category,
            }
        })
        containerDispatch({type: 'addFridgeItems', value: {items: userItems}})
        navigation.pop()
    }

    return (
        <TouchableOpacity onPress={handlePress} style={containerStyle}>
            <Ionicons name={"ios-arrow-forward"} size={size? size: 28} color="black"/>
        </TouchableOpacity>
    )
}

export default AddFridgeItems;
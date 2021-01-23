import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import {styles} from "./styles";
import {BasketItem, Item} from "../../contexts/Container";
import Avatar from "../Avatar";
import Assets from "../../constants/Assets";
import {getImageKey} from "../../constants/Ingredients";

type Props = {
    item: Item | BasketItem,
    containerStyle?: StyleProp<ViewStyle>,
    avatarStyle?: StyleProp<ViewStyle>,
    textStyle?: TextStyle,
    iconSize?: number,
    // handlePress?: (e: GestureResponderEvent) => void
}

const ItemCard = (props: Props) => {
    const {item, containerStyle, avatarStyle, textStyle, iconSize} = props;
    const key = getImageKey(item.name);
    // const [image, setImage] = useState({uri: `https://omtm-production.s3.ap-northeast-2.amazonaws.com/app-service/client/images/ingredients/${encodeURIComponent(item.name)}.png`});

    // TODO: It is just used in order to check rerender. It will be removed
    // item.name == "대파" && console.log("rendered", item.name)

    return (
        <View style={[styles.container, containerStyle]}>
            <Avatar containerStyle={[{padding: 8, bottom: 12}, avatarStyle]}
                // @ts-ignore
                    source={Assets.FoodImages[key ? key : 'default']}
                // onError={() => setImage(require('../../../app-client/assets/images/ingredients.png'))}
                    size={iconSize ? iconSize : 44}/>
            <Text style={[{fontFamily: 'nanum-square-round'}, textStyle]}>{item.name}</Text>
        </View>
    );
}

export default ItemCard;

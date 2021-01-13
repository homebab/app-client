import React from 'react';
import {StyleProp, Text, View, ViewStyle} from "react-native";
import {styles} from "./styles";
import {BasketItem, Item} from "../../contexts/Container";
import Avatar from "../Avatar";
import Assets from "../../constants/Assets";
import {imageKeys} from "../../constants/Ingredients";

type Props = {
    item: Item | BasketItem,
    containerStyle?: StyleProp<ViewStyle>,
    avatarStyle?: StyleProp<ViewStyle>,
    iconSize?: number,
    // handlePress?: (e: GestureResponderEvent) => void
}

const ItemCard = (props: Props) => {
    const {item, containerStyle, avatarStyle, iconSize} = props;
    const key = imageKeys.filter(key => key.includes(item.name) || item.name.includes(key))[0];
    // const [image, setImage] = useState({uri: `https://omtm-production.s3.ap-northeast-2.amazonaws.com/app-service/client/images/ingredients/${encodeURIComponent(item.name)}.png`});

    // TODO: It is just used in order to check rerender. It will be removed
    // item.name == "대파" && console.log("rendered", item.name)

    return (
        <View style={[styles.container, containerStyle]}>
            <Avatar containerStyle={[{padding: 8, bottom: 12}, avatarStyle]}
                    // @ts-ignore
                    source={Assets.Image[key? key: '토마토']}
                // onError={() => setImage(require('../../../app-client/assets/images/ingredients.png'))}
                    size={iconSize ? iconSize : 44}/>
            <Text style={{fontFamily: 'nanum-square-round'}}>{item.name}</Text>
        </View>
    );
}

export default React.memo(ItemCard);

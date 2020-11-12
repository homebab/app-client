import {Image, StyleProp, View, ViewStyle} from "react-native";
import React from "react";

type Props = {
    source: any,
    size?: number,
    style?: StyleProp<ViewStyle>
}

const Avatar = (props: Props) => {
    const {source, size, style} = props;

    return (
        <View style={[{
            padding: 8, borderRadius: 50, aspectRatio: 1, backgroundColor: "white"
        }, style ? style : null]}>
            <Image
                source={source}
                fadeDuration={0}
                style={{width: size! - 16, height: size! - 16}}
            />
        </View>
    )
}

export default Avatar;
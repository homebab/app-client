import {Image, ImageSourcePropType, StyleProp, View, ViewStyle} from "react-native";
import React, {useState} from "react";

type Props = {
    source: ImageSourcePropType,
    onError?: () => void,
    size?: number,
    containerStyle?: StyleProp<ViewStyle>
}

const Avatar = (props: Props) => {
    const {source, onError, size, containerStyle} = props;

    return (
        <View style={[{
            alignItems: 'center', justifyContent: 'center', width: size! + 18,
            padding: 9, borderRadius: 50, aspectRatio: 1, backgroundColor: 'white'
        }, containerStyle ? containerStyle : null]}>
            <Image
                source={source}
                onError={onError}
                fadeDuration={0}
                style={{width: size, height: size}}
            />
        </View>
    )
}

export default Avatar;
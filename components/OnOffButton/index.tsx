import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Switch } from "react-native-paper";

type Props = { 
    label?: string, 
    value: boolean, 
    onPress: () => void 
    containerStyle?: StyleProp<ViewStyle>
}

const OnOffButton = (props: Props) => {
    const { label, value, onPress, containerStyle } = props;

    return (
        <View style={[{
            flexDirection: 'row',
            flex: 1,
            padding: '4%',
            alignItems: 'center',
            justifyContent: 'space-between'
        }, containerStyle]}>
            <Text style={{ fontFamily: 'nanum-square-round' }}>{label}</Text>
            <Switch
                onValueChange={onPress}
                value={value}
                color={"#2196f3"}
                style={{ position: 'absolute', right: '3%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
            />
        </View>
    )
}

export default OnOffButton
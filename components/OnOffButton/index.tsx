import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Switch } from "react-native-paper";
import {styles} from "./styles";

type Props = { 
    label?: string, 
    value: boolean, 
    onPress: () => void,
    containerStyle?: StyleProp<ViewStyle>,
    disabled?: boolean
}

const OnOffButton = (props: Props) => {
    const { label, value, onPress, containerStyle, disabled } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.text}>{label}</Text>
            <Switch
                disabled={disabled ?? true}
                onValueChange={onPress}
                value={value}
                color={"#2196f3"}
                style={styles.switch}
            />
        </View>
    )
}

export default OnOffButton
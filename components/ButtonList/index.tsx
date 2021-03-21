import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import React from "react";
import {EvilIcons} from "@expo/vector-icons";
import styles from "./styles";

export type Dataset = Array<{
    label: string,
    icon?: JSX.Element,
    onPress?: () => void,
    disabled?: boolean,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
}>

type Props = {
    dataset: Dataset,
    textStyle?: TextStyle,
    containerStyle?: ViewStyle,
    buttonContainerStyle?: ViewStyle,
}

const ButtonList = (props: Props) => {

    const {dataset, textStyle, containerStyle, buttonContainerStyle} = props;

    return (
        <View style={containerStyle}>
            {
                dataset.map((data, key) => {
                        const {label, icon, onPress, disabled} = data;

                        return (
                            <TouchableOpacity
                                disabled={disabled ?? false}
                                key={key} onPress={onPress ? onPress : () => alert('[HOMEBAB]: coming soon')}
                                style={[styles.buttonContainer, buttonContainerStyle, data.containerStyle]}
                            >
                                {icon ? icon :
                                    <EvilIcons name="chevron-right" style={[styles.icon, disabled && styles.disabled]}/>}
                                <Text style={[styles.text, textStyle, data.textStyle, disabled && styles.disabled]}>{label}</Text>
                            </TouchableOpacity>
                        )
                    }
                )
            }
        </View>
    )
}

export default ButtonList;
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import React from "react";
import {EvilIcons} from "@expo/vector-icons";
import styles from "./styles";

type Dataset = Array<{
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
}

const ButtonList = (props: Props) => {

    const {dataset, textStyle, containerStyle} = props;

    return (
        <>
            {
                dataset.map((data, key) => {
                        const {label, icon, onPress, disabled} = data;

                        return (
                            <TouchableOpacity
                                disabled={disabled ?? false}
                                key={key} onPress={onPress ? onPress : () => alert('[HOMEBAB]: coming soon')}
                                style={[styles.buttonContainer, containerStyle, data.containerStyle]}
                            >
                                {icon ? icon :
                                    <EvilIcons name="chevron-right" size={36} style={[{position: 'absolute', right: '4%'}, disabled && styles.disabled]}/>}
                                <Text style={[{
                                    padding: 8, paddingTop: 16, paddingBottom: 16, fontSize: 16, fontFamily: 'nanum-square-round-bold'
                                }, textStyle, data.textStyle, disabled && styles.disabled]}>{label}</Text>
                            </TouchableOpacity>
                        )
                    }
                )
            }
        </>
    )
}

export default ButtonList;
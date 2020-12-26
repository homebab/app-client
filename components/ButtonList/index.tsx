import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import React from "react";
import {EvilIcons} from "@expo/vector-icons";

type Dataset = Array<{
    label: string,
    icon?: JSX.Element,
    onPress?: () => void,
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
                        const {label, icon, onPress} = data;

                        return (
                            <TouchableOpacity
                                disabled={!onPress}
                                key={key} onPress={onPress}
                                style={[{
                                    alignSelf: "center", alignItems: 'center', justifyContent: 'center',
                                    margin: 4, flexDirection: "row", width: '100%', borderWidth: 1, borderColor: 'rgba(208,200,192,0.5)'
                                }, containerStyle, data.containerStyle]}
                            >
                                {icon ? icon :
                                    <EvilIcons name="chevron-right" size={36} style={{position: 'absolute', right: '4%'}}/>}
                                <Text style={[{
                                    padding: 8, paddingTop: 16, paddingBottom: 16, fontSize: 16, fontFamily: 'nanum-square-round-bold'
                                }, textStyle, data.textStyle]}>{label}</Text>
                            </TouchableOpacity>
                        )
                    }
                )
            }
        </>
    )
}

export default ButtonList;
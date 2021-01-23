import {ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import React from "react";
import Layout from "../../constants/Layout";

type Props = {
    types: Array<string>,
    pressedType: string,
    onPressHandler: (c: any) => void,
    scrollEnabled: boolean,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
}

const HorizontalTypesView = (props: Props) => {

    const {types, pressedType, onPressHandler, scrollEnabled, containerStyle, textStyle} = props;

    return (
        <View style={[{flexDirection: "row"}, containerStyle]}>
            <ScrollView
                style={{backgroundColor: "white"}}
                contentContainerStyle={!scrollEnabled && {flexDirection: "row", flex: 1}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                scrollEnabled={scrollEnabled}>
                <View style={{flexDirection: "row", flex: 1}}>
                    {types.map((type, key) => {
                        const isPressed = type === pressedType;

                        return (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    {justifyContent: "center", alignItems: "center"},
                                    isPressed && {borderBottomColor: '#949494', borderBottomWidth: 2},
                                    !scrollEnabled && {flex: 1}]}
                                onPress={() => onPressHandler(type)}
                            >
                                <Text style={[
                                    {color: '#949494'},
                                    isPressed && {color: '#0e0e0e'}, textStyle]}>{type}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}


export default HorizontalTypesView;
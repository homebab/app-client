import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";

type Props = {
    types: Array<string>,
    pressedType: string,
    onPressHandler: (c: string) => void
}

const HorizontalTypesScrollView = (props: Props) => {

    const {types, pressedType, onPressHandler} = props;

    return (
        <View style={{flexDirection: "row"}}>
            <ScrollView horizontal={true} style={{backgroundColor: "white"}} showsHorizontalScrollIndicator={false}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    {types.map((type, key) => {
                        const isPressed = type === pressedType;

                        return (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    {flex: 1, justifyContent: "center", alignItems: "center"},
                                    isPressed && {borderBottomColor: '#949494', borderBottomWidth: 2}]}
                                onPress={() => onPressHandler(type)}
                            >
                                <Text style={[
                                    {padding: 13, color: '#949494'},
                                    isPressed && {color: '#0e0e0e'}]}>{type}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}


export default HorizontalTypesScrollView;
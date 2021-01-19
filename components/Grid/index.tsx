import {View, ViewStyle} from "react-native";
import {chunkArray} from "../../utils/functions";
import React from "react";

type Props = {
    container: Array<any>,
    chunkSize?: number,
    containerStyle?: ViewStyle,
}

const Grid = (props: Props) => {
    const {container, chunkSize, containerStyle} = props;

    const chunked = chunkArray(container, chunkSize? chunkSize: 4);

    return (
        <View style={[{backgroundColor: "#f2f2f2"}, containerStyle]}>
            {
                chunked.map((components, key: number) => (
                    <View key={key} style={{flexDirection: "row", justifyContent: "space-around"}}>
                        {components.map(component => component)}
                    </View>
                ))
            }
        </View>
    );
}

export default Grid;

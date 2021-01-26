import {View, ViewStyle} from "react-native";
import {chunkArray} from "../../utils/functions";
import React, {useMemo} from "react";

type Props = {
    container: Array<any>,
    chunkSize?: number,
    containerStyle?: ViewStyle,
    rowStyle?: ViewStyle,
    itemStyle?: ViewStyle
}

const Grid = (props: Props) => {
    const {container, chunkSize, containerStyle, rowStyle, itemStyle} = props;

    const chunked = useMemo(() => chunkArray(container, chunkSize ?? 4)
            .map((components, key: number) =>
                <View key={key} style={[{flexDirection: "row", justifyContent: "space-around"}, rowStyle]}>
                    {components.map((v, k) =>
                        <View key={k} style={itemStyle}>
                            {v}
                        </View>)}
                </View>
            ), [container, chunkSize]);

    return (
        <View style={[{backgroundColor: "#f2f2f2"}, containerStyle]}>
            {chunked}
        </View>
    );
}

export default Grid;

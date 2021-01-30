import React, { useMemo } from "react";
import { FlatList, View, ViewStyle } from "react-native";
import { chunkArray } from "../../utils/functions";

type Props = {
    container: Array<any>,
    chunkSize?: number,
    containerStyle?: ViewStyle,
    rowStyle?: ViewStyle,
    itemStyle?: ViewStyle
}

type renderItemProps = {
    components: JSX.Element[]
}

const Grid = (props: Props) => {
    const { container, chunkSize, containerStyle, rowStyle, itemStyle } = props;

    const chunked = useMemo(() => chunkArray<JSX.Element>(container, chunkSize ?? 4), [container, chunkSize]);

    const renderItem = ({ item }: { item: renderItemProps }) => {
        const { components } = item;

        return (
            <View style={[{ flexDirection: "row", justifyContent: "space-around" }, rowStyle]}>
                {components?.map((v, k) =>
                    <View key={k} style={itemStyle}>
                        {v}
                    </View>)}
            </View>
        )
    }

    return (
        <View style={[{ backgroundColor: "#f2f2f2" }, containerStyle]}>
            <FlatList
                data={chunked.map((c, k) => ({ components: c }))}
                keyExtractor={(item, key) => key.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default Grid;

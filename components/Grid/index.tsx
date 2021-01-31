import React, { ReactElement, useEffect, useMemo } from "react";
import { FlatList, RefreshControlProps, View, ViewStyle } from "react-native";
import { TapGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { chunkArray } from "../../utils/functions";

type Props<T> = {
    data: T[],
    renderItem: ({ item }: { item: T }) => ReactElement,
    chunkSize?: number,
    containerStyle?: ViewStyle,
    rowStyle?: ViewStyle,
    itemStyle?: ViewStyle,
    refreshControl?: ReactElement<RefreshControlProps>,
}

type renderItemProps<T> = {
    items: T[]
}

const Grid = <T,>(props: Props<T>) => {
    const { data, renderItem, chunkSize, containerStyle, rowStyle, itemStyle, refreshControl } = props;

    const chunked: T[][] = useMemo(() => chunkArray<T>(data, chunkSize ?? 4), [data, chunkSize]);

    const renderItemRow = ({ item }: { item: renderItemProps<T> }) => {
        const { items } = item;

        return (
            <View style={[{ flexDirection: "row", justifyContent: "space-around" }, rowStyle]}>
                {items?.map((item, k) =>
                    <View key={k} style={itemStyle}>
                        {renderItem({ item: item })}
                    </View>)}
            </View>
        )
    }

    return (
        <View style={[{ backgroundColor: "#f2f2f2" }, containerStyle]}>
            <FlatList
                data={chunked.map(v => ({ items: v }))}
                keyExtractor={(_, key) => key.toString()}
                renderItem={renderItemRow}
                refreshControl={refreshControl}
                // initialNumToRender={10}
            />
        </View>
    );
}

export default Grid;

import {View, ViewStyle} from "react-native";
import React from "react";
import {styles} from "./styles";

type Props = {
    index: number,
    containerStyle: ViewStyle
}
export default function Pagination(props: Props) {
    const {index, containerStyle} = props;

    return (
        <View style={[styles.pagination, containerStyle]} pointerEvents="none">
            {[1, 2, 3].map((_, i) => {
                return (
                    <View key={i}
                          style={[
                              styles.paginationDot,
                              index === i
                                  ? styles.paginationDotActive
                                  : styles.paginationDotInactive,
                          ]}/>
                );
            })}
        </View>
    );
}

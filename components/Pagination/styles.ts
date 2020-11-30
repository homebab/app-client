import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    pagination: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    paginationDotActive: {backgroundColor: "gray"},
    paginationDotInactive: {backgroundColor: "#d7d7d7"}
});
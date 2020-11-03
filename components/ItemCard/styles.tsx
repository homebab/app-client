import {StyleSheet} from "react-native";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
    container: {
        // backgroundColor: "blue",
        margin: 10,
        flexDirection: "column",
        alignItems: 'center'
    },
    deleteButton: {
        position: "absolute",
        padding: 2,
        borderRadius: 16,
        right: 18,
        aspectRatio: 1,
        backgroundColor: "#b3b3b3"
    },
    Avatar: {
        padding: 8,
        borderRadius: 50,
        aspectRatio: 1,
        backgroundColor: "white"
    }
});




import {StyleSheet} from "react-native";

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
    avatar: {
        padding: 8,
        borderRadius: 50,
        aspectRatio: 1,
        backgroundColor: "white"
    },
    pressed: {
        opacity: 0.2
    },
    unPressed: {
        opacity: 1
    }
});




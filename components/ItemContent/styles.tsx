import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 18,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "white",
        borderBottomWidth: 1.5,
        borderColor: "#e6e6e6"
    },
    imageWrapper: {
        flex: 3,
        height: "100%",
        aspectRatio: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        height: "100%",
        resizeMode: "cover",
        aspectRatio: 1
    },
    content: {
        flex: 10,
        height: "100%" /* , backgroundColor:"pink" */,
        alignItems: "flex-start",
        marginLeft: 18
    }
});
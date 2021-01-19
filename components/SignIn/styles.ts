import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    wrapper: {
        flex: 0.6,
        width: "80%",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    button: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        // paddingLeft: "10%",
        // paddingRight: 24,
        // paddingBottom: 16,
        // paddingTop: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    cognito: {
        backgroundColor: "rgb(53,53,53)"
    },
    google: {
        backgroundColor: "rgb(222,82,70)",
    },
    facebook: {
        backgroundColor: "#4267b2"
    },
    apple: {
        backgroundColor: "#303030"
    },
    text: {
        padding: 16,
        justifyContent: "center",
        fontFamily: 'nanum-square-round',
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    icon: {
        position: "absolute",
        left: 28
    },
    link: {
        fontWeight: 'bold',
    },
})
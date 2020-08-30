import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
    },
    wrapper: {
        flex: 0.6,
        width: "85%",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    title: {
        marginBottom: 0,
        fontSize: 34,
        fontFamily: 'nanum-square-round',
    },
    subTitle: {
        alignSelf: "flex-end",
        marginBottom: 24,
        fontSize: 16,
        fontFamily: 'nanum-square-round'
    },
    button: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: 12,
        marginBottom: 12,
        // paddingLeft: "10%",
        // paddingRight: 24,
        // paddingBottom: 16,
        // paddingTop: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    google: {
        backgroundColor: "rgba(222, 82, 70, 1)",
    },
    facebook: {
        backgroundColor: "#4267B2"
    },
    text: {
        padding: 16,
        justifyContent: "center",
        fontFamily: 'nanum-square-round',
        color: "white",
        fontSize: 16,
    },
    icon: {
        position: "absolute",
        left: 28
    },
    link: {
        fontWeight: 'bold',
    },

});

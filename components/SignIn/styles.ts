import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    wrapper: {
        flex: 0.6,
        // width: "80%",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    button: {
        display: "flex",
        flexDirection: "row",
        width: wp(80),
        margin: hp(1),
        height: hp(6),
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
        justifyContent: "center",
        fontFamily: 'nanum-square-round-bold',
        color: "white",
        fontSize: hp(1.8),
    },
    icon: {
        position: "absolute",
        left: wp(8),
        fontSize: hp(2.8),
    },
    link: {
        fontWeight: 'bold',
    },
})
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {backgroundColor: 'white', padding: hp(2.2)},
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#f2f2f2',
        padding: hp(1.6),
        paddingLeft: wp(4),
        paddingRight: wp(4),
    },
    text: {fontSize: hp(1.8)}
});
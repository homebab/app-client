import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row", alignSelf: "center", alignItems: 'center', justifyContent: 'center',
        margin: hp(0.5), width: "100%",
        borderWidth: 1, borderColor: 'rgba(208,200,192,0.5)'
    },
    icon: {position: 'absolute', right: wp(4), fontSize: hp(4)},
    text: {
        padding: hp(1), paddingTop: hp(2), paddingBottom: hp(2),
        fontSize: hp(2), fontFamily: 'nanum-square-round-bold'
    },
    disabled: {
        color: 'gray'
    }
})


export default styles;
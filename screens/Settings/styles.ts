import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'},
    containerContent: {padding: wp(4)},

    profileContainer: {alignItems: "center", padding: wp(5.2)},
    profileImage: {height:  wp(32), aspectRatio: 1, borderRadius: wp(8)},

    alarmContainer: {
        padding: wp(3.2),
        marginBottom: hp(1),
        borderBottomWidth: 1,
        borderColor: 'rgba(208,200,192,0.5)'
    },
    alarmText: {marginBottom: hp(2), fontFamily: 'nanum-square-round-bold', fontSize: hp(2)},
    alarmOnOffContainer: {flexDirection: 'row'},


    buttonListContainer: {flex: 1, width: '100%', justifyContent: 'flex-start', marginTop: '4%'},
    buttonContainer: {borderLeftColor: 'white', borderTopColor: 'white'}

});

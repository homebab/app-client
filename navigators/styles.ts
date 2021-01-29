import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    tarBarStyle: {height: hp(10)},
    tarBarContainer: {flex: 1, flexDirection: "column", justifyContent: 'center', alignContent: 'center'},
    tarBarIcon: {aspectRatio: 1, fontSize: hp(3.2), textAlign: 'center', margin: hp(0.4)},
    tarBarLabel: {fontFamily: 'nanum-square-round', textAlign: 'center', fontSize: hp(1.2)},


    headerStyle: {height: hp(10)},
    headerIcon: {aspectRatio: 1, fontSize: hp(3.2)},
    headerTitle: {
        fontFamily: 'nanum-square-round-bold',
        fontSize: hp(2)
    }
})
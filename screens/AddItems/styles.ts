import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const tabletStyles = StyleSheet.create({
    storageBar: {aspectRatio: 4.2, padding: wp(8)},
});

export const styles = StyleSheet.create({
    categoryBar: {
        height: hp(6),
    },
    storageBar: {aspectRatio: 3.6, padding: wp(8)},

    text: {
        padding: hp(1.6),
        fontSize: hp(1.56)
    },

    itemGridContainer: {flex: 1, padding: wp(4), paddingTop: hp(4)},
    itemGridLabel: {fontSize: hp(2.2), fontFamily: 'nanum-square-round-bold', padding: wp(6)},
    itemContainer: {padding: hp(0.8)},
    avatarStyle: {padding: hp(3.6), borderRadius: hp(50)},
    itemLabel: {fontSize: hp(1.56)},

    plusButton: {
        position: "absolute",
        padding: hp(2),
        borderRadius: hp(10),
        bottom: hp(8),
        right: wp(10),
        backgroundColor: 'black'
    },
    plusIcon: {
        fontSize: hp(2),
        backgroundColor: 'black'
    }
});

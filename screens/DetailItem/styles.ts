import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const avatarSize = hp(6.8);
const padding = hp(1.6);

// export const rowButtonItemIcon1Size =
export const styles = StyleSheet.create({
    container: {flex: 1, width: wp(92)},

    itemAvatarContainer: {alignItems: 'center', marginBottom: hp(2.8)},
    itemAvatar: {
        position: "absolute", top: -hp(5),
        padding: padding, width: avatarSize + padding * 2,
        borderRadius: hp(12)
    },
    itemText: {marginTop: hp(6), fontSize: hp(2.2)},

    dateContainer: {
        position: "absolute", alignItems: 'center',
        marginTop: hp(2.4), right: wp(4)
    },
    dateText: {margin: wp(0.24), fontSize: hp(1.5)},

    columnItemInfoContainer: {flexDirection: "row", marginBottom: hp(2.8)},
    columnItemInfo: {flex: 1, alignItems: 'center'},
    columnItemCenter: {
        flex: 1, alignItems: 'center',
        borderColor: 'rgba(110,115,121,0.8)',
        borderRightWidth: 0.4, borderLeftWidth: 0.4
    },
    columnItemInfoTextKey: {fontSize: hp(1.64), marginBottom: hp(1), color: 'rgb(100,102,110)'},
    columnItemInfoTextValue: {fontSize: hp(1.64), fontWeight: "bold"},

    textInputBoxContainer: {height: hp(18), marginBottom: hp(2.4)},
    textInputContainer: {
        flex: 1, backgroundColor: 'rgba(208,200,192,0.2)',
        padding: hp(2.4), paddingTop: hp(2), paddingBottom: hp(2)
    },
    textInputBox: {borderRadius: 8, fontSize: hp(1.8)},
    textEditing: {position: "absolute", right: "5%", bottom: "10%"},
    textEditingText: {fontSize: hp(1.8)},

    rowItemButtonIcon1: {position: "absolute", left: wp(8)},
    rowITemButtonIcon2: {position: "absolute", left: wp(7.6)}


});
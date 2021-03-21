import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {isTablet} from "../../utils/responsive";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        padding: wp(2),
        alignItems: 'center',
        justifyContent: isTablet? "space-around": "space-between"
    },
    text: { fontFamily: 'nanum-square-round', fontSize: hp(1.68)},
    switch: { transform: [{ scaleX: hp(0.094) }, { scaleY: hp(0.094) }] }
});

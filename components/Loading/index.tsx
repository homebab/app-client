import {ActivityIndicator} from "react-native-paper";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import * as React from "react";
import Colors from "../../constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleProp, ViewStyle} from "react-native";

type Props = {
    indicatorSize?: number,
    containerStyle?: StyleProp<ViewStyle>
}

const Loading = (props: Props) =>
    <RelativeCenterLayout containerStyle={[{
        width: wp(100),
        height: hp(100),
        opacity: 0.52,
        position: "absolute",
        backgroundColor: 'black',
        zIndex: 2
    }, props.containerStyle]}>
        <ActivityIndicator size={props.indicatorSize ?? hp(4)} color={Colors.light.tint}/>
    </RelativeCenterLayout>

export default Loading;
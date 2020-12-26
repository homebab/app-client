import React, {PropsWithChildren} from "react";
import {Text, View, ViewStyle} from "react-native";
import Layout from "../../constants/Layout";

type Props = {
    title: string,
    containerStyle?: ViewStyle
}

const VerticalAnalyticsLayout = (props: PropsWithChildren<Props>) => {
    const {children, title, containerStyle} = props;

    return (
        <View style={[{width: '100%'}, containerStyle]}>
            <View style={{height: 52}}>
                <Text style={{fontSize: 18, fontFamily: 'nanum-square-round-bold'}}>{title}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                {children}
            </View>
        </View>
    )
}

export default VerticalAnalyticsLayout;
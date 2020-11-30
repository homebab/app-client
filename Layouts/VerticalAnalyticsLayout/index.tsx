import React, {PropsWithChildren} from "react";
import {Text, View} from "react-native";
import Layout from "../../constants/Layout";

type Props = {
    title: string
}

const VerticalAnalyticsLayout = (props: PropsWithChildren<Props>) => {
    const {children, title} = props;

    return (
        <View style={{height: Layout.window.width * 0.9,  width: '100%'}}>
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
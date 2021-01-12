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
        <View style={[{width: '100%', paddingTop: 12, paddingBottom: 24, borderBottomWidth: 1, borderColor: 'rgba(208,200,192,0.5)'}, containerStyle]}>
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
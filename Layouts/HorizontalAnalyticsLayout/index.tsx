import React, {PropsWithChildren} from "react";
import {Text, View} from "react-native";

type Props = {
    title: string
}

const HorizontalAnalyticsLayout = (props: PropsWithChildren<Props>) => {
    const {children, title} = props;

    return (
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
            <View style={{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{
                    fontSize: 18, fontFamily: 'nanum-square-round-bold'}}
                >{title}</Text>
            </View>
            <View style={{flex: 5, width: '100%'}}>
                {children}
            </View>
        </View>
    )
}

export default HorizontalAnalyticsLayout;
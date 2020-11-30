import React, {PropsWithChildren} from "react";
import {View} from "react-native";

type Props = {}

const AbsoluteCenterLayout = (props: PropsWithChildren<Props>) => {
    const {children} = props;

    return (
        <View style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            justifyContent: 'center', alignItems: 'center'
        }}>
            {children}
        </View>
    )
}

export default AbsoluteCenterLayout;
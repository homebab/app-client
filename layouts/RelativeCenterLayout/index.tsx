import React, {PropsWithChildren} from "react";
import {StyleProp, View, ViewStyle} from "react-native";

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
}

const RelativeCenterLayout = (props: PropsWithChildren<Props>) => {
    const {children, containerStyle} = props;

    return (
        <View style={[{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }, containerStyle]}>
            {children}
        </View>
    )
}

export default RelativeCenterLayout;
import {Modal, StyleProp, View, ViewStyle} from "react-native";
import React, {PropsWithChildren} from "react";

type Props = {
    visible: boolean,
    // handlePress: () => void,
    style: StyleProp<ViewStyle>
}

const BottomModal = (props: PropsWithChildren<Props>) => {
    const {children, visible, style} = props;

    return (
        <Modal visible={visible} animationType={"slide"} transparent={true}>
            <View style={style}>
                {children}
            </View>
        </Modal>
    )
}

export default BottomModal;
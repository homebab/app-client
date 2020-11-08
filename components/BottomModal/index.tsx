import {Modal, StyleProp, TouchableOpacity, View, ViewStyle} from "react-native";
import React, {PropsWithChildren} from "react";

type Props = {
    visible: boolean,
    handlePress: () => void,
    style: StyleProp<ViewStyle>
}

const BottomModal = (props: PropsWithChildren<Props>) => {
    const {children, visible, handlePress, style} = props;

    return (
        <Modal visible={visible} animationType={"slide"} transparent={true}>
            <TouchableOpacity style={{
                flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.4)'
            }} onPressOut={handlePress}>
                <View style={style}>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default BottomModal;
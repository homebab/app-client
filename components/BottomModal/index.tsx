import {Modal, StyleProp, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import React, {PropsWithChildren} from "react";

type Props = {
    visible: boolean,
    handlePress: () => void,
    containerStyle: StyleProp<ViewStyle>
}

const BottomModal = (props: PropsWithChildren<Props>) => {
    const {children, visible, handlePress, containerStyle} = props;

    return (
        <Modal visible={visible} animationType={"slide"} transparent={true} onRequestClose={handlePress}>
            <TouchableOpacity style={{
                flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end'
            }} onPress={handlePress}>
                <TouchableWithoutFeedback>
                    <View style={containerStyle}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>

        </Modal>
    )
}

export default BottomModal;
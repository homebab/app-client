import {Modal, StyleProp, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
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
                flex: 1,  backgroundColor: 'rgba(0,0,0,0.4)'
            }} onPress={handlePress}>
                <TouchableWithoutFeedback style={{flex: 1}}>
                    <View style={[{position: "absolute", bottom: 0}, style]}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>

        </Modal>
    )
}

export default BottomModal;
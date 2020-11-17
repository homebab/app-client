// import {Modal, Text} from 'react-native-paper';
import * as React from 'react';
import {useState} from 'react';
import {Modal, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
// TODO: use react-native-elements
import {RadioButton} from 'react-native-paper';
import {Feather} from '@expo/vector-icons';
import {styles} from "./style"
import {Item, useContainerContext} from '../../contexts/Container';

type Props = {
    visible: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

const DeleteItemModal = (props: Props) => {
    const {visible, onCancel, onConfirm} = props

    const [value, setValue] = React.useState<'empty' | 'remain'>("empty");

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={onCancel}>
            <TouchableOpacity style={styles.centeredView} onPress={onCancel}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Feather name="trash-2" size={24} color="black" style={{marginRight: 12}}/><Text
                        style={styles.modalText}>얼만큼 버리셨나요?</Text>
                    </View>

                    <RadioButton.Group onValueChange={value => setValue(value as 'empty' | 'remain')} value={value}>
                        <RadioButton.Item label="조금 버렸습니다" value="empty" labelStyle={{fontSize: 18}}/>
                        <RadioButton.Item label="많이 버렸습니다" value="remain" labelStyle={{fontSize: 18}}/>
                    </RadioButton.Group>

                    <View style={styles.modalFooter}>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.3)'}
                            style={{...styles.openButton, backgroundColor: "transparent"}}
                            onPress={onCancel}
                        >
                            <Text style={{...styles.textStyle, color: '#f50057'}}>취소</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.3)'}
                            style={{...styles.openButton, backgroundColor: "transparent"}}
                            onPress={onConfirm}
                        >
                            <Text style={{...styles.textStyle, color: '#2196f3'}}>제출</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableOpacity>

        </Modal>
    );
};

export default DeleteItemModal;
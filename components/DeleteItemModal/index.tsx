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

    const [amount, setAmount] = React.useState<string>('0');

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={onCancel}>
            <TouchableOpacity style={styles.centeredView} onPress={onCancel}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Feather name="trash-2" size={24} color="black" style={{marginRight: 12}}/><Text
                        style={styles.modalText}>얼만큼 버리셨나요?</Text>
                    </View>

                    <RadioButton.Group onValueChange={value => setAmount(value)} value={amount}>
                        <View style={{flexDirection: "row"}}>
                        <RadioButton.Item label="전부 먹음" value="0" labelStyle={{fontSize: 18}}/>
                        <RadioButton.Item label="조금 버림" value="1" labelStyle={{fontSize: 18}}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <RadioButton.Item label="많이 버림" value="2" labelStyle={{fontSize: 18}}/>
                        <RadioButton.Item label="전부 버림" value="3" labelStyle={{fontSize: 18}}/>
                        </View>
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
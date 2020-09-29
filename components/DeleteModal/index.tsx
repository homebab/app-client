// import {Modal, Text} from 'react-native-paper';
import * as React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Feather} from '@expo/vector-icons';
import {deleteUserItem} from "../../api/omtm";
import {deleteImageOnS3} from "../../api/aws";
import {Item, useAccountContext} from "../../contexts/Account";
import {styles} from "./style"
import AsyncStorage from "@react-native-community/async-storage";
import LocalStorage from '../../constants/LocalStorage';
import {useEffect} from "react";

type Props = {
    item: Item,
    visible: boolean,
    hideModal: () => void
}

const DeleteModal = (props: Props) => {
    const {item, visible, hideModal} = props
    const {id} = item;
    const {accountDispatch} = useAccountContext();

    const [value, setValue] = React.useState<'empty' | 'remain'>("empty");

    const handleSubmit = () => accountDispatch({type: 'deleteItem', value: {id: id}})

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true}>
            <View style={styles.centeredView}>
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
                            onPress={hideModal}
                        >
                            <Text style={{...styles.textStyle, color: '#f50057'}}>취소</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.3)'}
                            style={{...styles.openButton, backgroundColor: "transparent"}}
                            onPress={handleSubmit}
                        >
                            <Text style={{...styles.textStyle, color: '#2196f3'}}>제출</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        </Modal>
    );
};


export default DeleteModal;
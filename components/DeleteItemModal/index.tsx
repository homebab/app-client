// import {Modal, Text} from 'react-native-paper';
import * as React from 'react';
import {Modal, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
// TODO: use react-native-elements
import {RadioButton} from 'react-native-paper';
import {Feather} from '@expo/vector-icons';
import {styles} from "./style"
import useWasteAmount from "../../hooks/useWasteAmount";
import {Item, useContainerContext} from "../../contexts/Container";

type Props = {
    item: Item
    visible: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

const DeleteItemModal = (props: Props) => {
    const {item, visible, onCancel, onConfirm} = props

    const {containerDispatch} = useContainerContext();
    const [amount, setAmount] = React.useState<number>(0);


    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={onCancel}>
            <TouchableOpacity style={styles.centeredView} onPress={onCancel}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Feather name="trash-2" size={24} color="black" style={{marginRight: 12}}/><Text
                        style={styles.modalText}>음식물을 얼만큼 버리셨나요?</Text>
                    </View>

                    <RadioButton.Group onValueChange={value => setAmount(parseInt(value))} value={amount.toString()}>
                        <View style={{
                            width: '100%', flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}>
                            {
                                Array.from(Array(4).keys()).map((i, k) =>
                                    <RadioButton.Item
                                        key={k} style={{flexDirection: "column"}}
                                        label={i.toString()} value={i.toString()} labelStyle={{fontSize: 18}}/>)
                            }
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
                            onPress={() => {
                                containerDispatch({type: "DELETE_FRIDGE_ITEM", id: item.id, amount: amount})
                                onConfirm();
                            }}
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
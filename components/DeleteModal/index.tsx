// import {Modal, Text} from 'react-native-paper';
import * as React from 'react';
import {useEffect} from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity, GestureResponderEvent} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import {deleteUserItem} from "../../api/omtm";
import {deleteImageOnS3} from "../../api/aws";
import {useAccountContext, Item} from "../../contexts/Account";

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

    const handleSubmit = () => {
        console.log(`[omtm]: delete itemId ${id} with ${value}`)

        // fetch DELETE API to delete item on RDB and delete the item on Account context
        deleteUserItem(id)
            .then(res => {
                // fetch DELETE API to delete item image on s3
                if(item.imageUrl !== 'default url')
                    deleteImageOnS3(item.imageUrl)
                        .then(_ => accountDispatch({type: 'deleteItem', value: {id: res as number}}))
                        .catch()
            })
            .catch(err => console.warn("[omtm]: fail to delete user's item with " + err))

        // TODO: fetch POST API for event logging

        hideModal();
    }


    return (
        <Modal visible={visible} animationType={"fade"} transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                        <Feather name="trash-2" size={24} color="black" style={{marginRight: 12}}/><Text style={styles.modalText}>얼만큼 버리셨나요?</Text>
                    </View>


                        <RadioButton.Group onValueChange={value => setValue(value as 'empty' | 'remain')} value={value}>
                            <RadioButton.Item label="조금 버렸습니다" value="empty" labelStyle={{fontSize:18}} />
                            <RadioButton.Item label="많이 버렸습니다" value="remain" labelStyle={{fontSize:18}} />
                        </RadioButton.Group>

                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: 4}}>
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: "center"
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        paddingTop: 30,
        paddingBottom: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        // alignSelf: 'center',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 18,
        paddingRight: 18
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '100',
        textAlign: "center"
    }
});



export default DeleteModal;
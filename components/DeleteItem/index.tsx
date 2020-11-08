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
    handleConfirm: () => void,
    handleCancel: () => void
}

const DeleteModal = (props: Props) => {
    const {visible, handleCancel, handleConfirm} = props

    const [value, setValue] = React.useState<'empty' | 'remain'>("empty");

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
                            onPress={handleCancel}
                        >
                            <Text style={{...styles.textStyle, color: '#f50057'}}>취소</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.3)'}
                            style={{...styles.openButton, backgroundColor: "transparent"}}
                            onPress={handleConfirm}
                        >
                            <Text style={{...styles.textStyle, color: '#2196f3'}}>제출</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

const DeleteItem = ({item}: { item: Item }) => {

    const [isVisible, setIsVisible] = useState(false);

    const {containerDispatch} = useContainerContext();

    return (
        <View>
            <DeleteModal
                visible={isVisible}
                handleCancel={() => setIsVisible(false)}
                handleConfirm={() => {
                    containerDispatch({type: 'deleteFridgeItem', value: {id: item.id}});
                    setIsVisible(false);
                }}/>
            <TouchableOpacity style={{width: '100%', padding: 16, backgroundColor: '#f44336'}}
            onPress={() => setIsVisible(true)}>
                <Text style={{color: 'white', fontSize: 18}}>버리기</Text>
            </TouchableOpacity>
        </View>
    )
}


export default DeleteItem;
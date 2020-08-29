import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Foundation} from "@expo/vector-icons";


import {styles} from "./styles";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {TabOneParamList} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";

const AddItems = () => {

    const navigation = useNavigation<StackNavigationProp<TabOneParamList, 'AddItems'>>();
    const route = useRoute<RouteProp<TabOneParamList, 'AddItems'>>();


    const [name, setName] = useState<string>('');
    const [expiredAt, setExpiredAt] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const [url, setUrl] = useState<string>('');


    const onChangeDate = (text: string) => {
        /* console.log(text) */

        var date = text.split('-')
        console.log(date)

        switch (date.length) {
            case 1:
                if (date[0].length == 4) {
                    if (2019 <= parseInt(date[0]) && parseInt(date[0]) < 5000) text = date[0] + '-'
                    else alert("적절하지 않는 입력값입니다.")
                }

                break;
            case 2:
                if (0 < parseInt(date[1]) && parseInt(date[1]) < 13) {
                    // text = date[0] + '-' + date[1] + '-'    //error 있음
                } else alert("적절하지 않는 입력값입니다.")

                break;
            case 3:
                if (0 < parseInt(date[2]) && parseInt(date[2]) < 32 || date[2] == '') {

                } else alert("적절하지 않는 입력값입니다.")

                break;
        }

        setExpiredAt(text)

        // this.setState({
        //     newItem: {
        //         ...this.state.newItem,
        //         expDate: text
        //     }
        // })
        //this.props.newItem.expDate = text

    }

    const onChangeTag = (text: string) => {
        if (text.length > 10) {
            alert("10자리 이상 입력할 수 없습니다.")
            text = text.substr(0, 9)
        }

        //this.props.newItem.category = text
        setCategory(text)
    }

    const handleSubmit = () => {
        if ((name).length == 0 || (expiredAt).split('-').length < 3) alert("옳바르지 않은 형식입니다.")
        else {

            // alert(itemPhoto)
            //
            // this.props.addItem(this.state.newItem, this.props.id, photoItem)

            // console.log(this.props.newContainer)
            // this.props.navigation.navigate('ShowItems')
            // setTimeout(() => this.props.navigation.navigate('ShowItems'), 3000);
        }
        navigation.navigate('ListItems');
    }


    const cameraButton = () => {
        navigation.navigate("CaptureItems")
    }

    return (
        <View style={styles.container}>

            <View style={{
                padding: 18,
                flexDirection: "row",
                backgroundColor: "white",
                marginTop: 10,
                marginBottom: 10,
                borderBottomWidth: 1.5,
                borderColor: "#e6e6e6"
            }}>
                <View style={{
                    flex: 3,
                    aspectRatio: 1,
                    backgroundColor: "black",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    {!(route.params == null) &&
                    <Image source={{uri: route.params.itemPhoto.uri}}
                           style={{zIndex: -1, width: "100%", resizeMode: "cover", aspectRatio: 1}}/>}

                    <View style={{
                        zIndex: -1,
                        position: "absolute",
                        right: -13,
                        bottom: -13,
                        aspectRatio: 1,
                        borderRadius: 32,
                        backgroundColor: "white",
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            borderRadius: 32,
                            padding: 6,
                            aspectRatio: 1,
                            backgroundColor: "black",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <TouchableOpacity style={{}} onPress={cameraButton}>
                                <Foundation name="camera" size={22} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{
                    flex: 10/* , backgroundColor:"#f4f4f4" */,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 18
                }}>
                    <View style={{
                        borderColor: "#d9d9d9",
                        paddingBottom: 4,
                        paddingTop: 4,
                        borderBottomWidth: 1,
                        alignItems: "center"
                    }}>
                        <TextInput
                            keyboardType='default'
                            onChangeText={setName}
                            placeholder='식자재 이름을 입력하시오.'
                            style={{fontSize: 26}}>
                        </TextInput>
                    </View>
                </View>
            </View>


            <View style={{alignItems: "center", backgroundColor: "white",}}>
                <View style={{
                    flexDirection: 'row',
                    width: "85%",
                    borderColor: "#d9d9d9",
                    paddingBottom: 16,
                    paddingTop: 16,
                    borderBottomWidth: 1,
                    alignItems: "center"
                }}>
                    <AntDesign name="calendar" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
                    <TextInput
                        keyboardType='numeric'
                        onChangeText={onChangeDate}
                        placeholder='2020-2-3'
                        value={expiredAt}
                        style={{flex: 1, fontSize: 26}}>
                    </TextInput>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: "85%",
                    borderColor: "#d9d9d9",
                    paddingBottom: 16,
                    paddingTop: 16,
                    borderBottomWidth: 1,
                    alignItems: "center"
                }}>
                    <AntDesign name="tago" size={28} color="#8c8c8c" style={{marginRight: 32}}></AntDesign>
                    <TextInput
                        keyboardType='default'
                        onChangeText={setCategory}
                        placeholder='미분류'
                        style={{flex: 1, fontSize: 26}}>
                    </TextInput>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: "85%",
                    borderColor: "#d9d9d9",
                    paddingBottom: 16,
                    paddingTop: 16,
                    borderBottomWidth: 1,
                    alignItems: "center"
                }}>
                    <Foundation name="clipboard-pencil" size={28} color="#8c8c8c"
                                style={{marginRight: 32}}/>
                    <TextInput
                        keyboardType='default'
                        onChangeText={setMemo}
                        placeholder='메모를 입력하시오.'
                        style={{flex: 1, fontSize: 26}}>
                    </TextInput>
                </View>

                <View style={{width: "85%", marginTop: 16, paddingBottom: 16, paddingTop: 16,}}>
                    <TouchableOpacity style={{backgroundColor: "#333333"}} onPress={handleSubmit}>
                        <Text style={{color: "white", fontSize: 20, padding: 16, alignSelf: "center"}}>
                            식자재 추가
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

export default AddItems;
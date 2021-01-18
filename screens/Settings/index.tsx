import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useContainerContext} from "../../contexts/Container";
import {useAccountContext} from "../../contexts/Account";
import Assets from "../../constants/Assets";
import ButtonList from "../../components/ButtonList";
import {Auth, DataStore} from "aws-amplify";
import {Switch} from "react-native-paper";
import {deleteAllItems} from "../../services/aws/appsync";
import {getUserAttributes, updateUser} from "../../services/aws/cognito";
import {MaterialIcons} from "@expo/vector-icons";
import {formatUserName} from "../../validators/format";
import {logInAsync} from "expo-google-app-auth";


const RowButtonList = () => {
    const {accountState, accountDispatch} = useAccountContext();
    const {cognitoUser} = accountState;

    const dataset = [

        {label: '공지사항'},
        {label: '서비스 문의'},
        // {label: '버전정보'},
        {
            label: '냉장고 초기화',
            // icon: <MaterialCommunityIcons name="autorenew" size={28} style={{position: "absolute", left: 32}}/>,
            onPress: () => deleteAllItems(),
        },
        {
            label: '로그아웃',
            // icon: <MaterialCommunityIcons name="logout" size={28} style={{position: "absolute", left: 32}}/>,
            onPress: () => Auth.signOut()
                // refer to https://docs.amplify.aws/lib/datastore/other-methods/q/platform/js#clear
                // `DataStore.clear() is often important to use for shared device scenarios
                // or where you need to purge the local on-device storage of records for security/privacy concerns.
                .then(_ => DataStore.clear().then(_ => console.debug('[HOMEBAB]: success to clear datastore')))
                .catch(err => console.warn("[HOMEBAB]: fail to delete cachedUser with", err))
        },
        {
            label: '영구 탈퇴', textStyle: {color: '#ff1744'},
            onPress: () => cognitoUser?.deleteUser((err) => {
                if (err) console.debug('[HOMEBAB]: fail to delete cognitoUser with ', JSON.stringify(err))
                else accountDispatch({type: "DEAUTHENTICATE"})
            })
        }
    ]

    return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', paddingTop: '4%'}}>
            <ButtonList dataset={dataset} containerStyle={{borderLeftColor: 'white', borderTopColor: 'white'}}/>
        </View>
    )
}

const OnOffButton = ({label, value, onPress}: { label: string, value: boolean, onPress: () => void }) => {
    return (
        <View style={{
            flexDirection: 'row',
            flex: 1,
            padding: '4%',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Text style={{fontFamily: 'nanum-square-round'}}>{label}</Text>
            <Switch
                onValueChange={onPress}
                value={value}
                color={"#2196f3"}
                style={{position: 'absolute', right: '3%', transform: [{scaleX: .8}, {scaleY: .8}]}}
            />
        </View>
    )
}

const SetAlarm = () => {
    const {accountState, accountDispatch} = useAccountContext();
    const {alarm} = accountState;
    const {recommendRecipes, manageIngredients} = alarm;

    const dataset = [
        {
            label: '유통기한 임박', value: manageIngredients, onPress: () =>
                alert('[HOMEBAB] coming soon')
            // accountDispatch({
            //     type: "SET_ALARM",
            //     alarm: {manageIngredients: !manageIngredients, recommendRecipes: recommendRecipes}
            // })
        },
        {
            label: '레시피 추천', value: recommendRecipes, onPress: () =>
                alert('[HOMEBAB] coming soon')
            // accountDispatch({
            //     type: "SET_ALARM",
            //     alarm: {manageIngredients: manageIngredients, recommendRecipes: !recommendRecipes}
            // })
        }
    ]

    return (
        <View style={{width: '100%', padding: '4%', borderBottomWidth: 1, borderColor: 'rgba(208,200,192,0.5)'}}>
            <Text style={{marginBottom: 16, fontFamily: 'nanum-square-round-bold', fontSize: 16}}>알림설정</Text>

            <View style={{width: '100%', flexDirection: 'row'}}>
                {dataset.map((data, key) =>
                    <OnOffButton key={key} label={data.label} value={data.value} onPress={data.onPress}/>)}
            </View>
        </View>
    )
}

const Profile = () => {
    const {accountState} = useAccountContext();
    const {cognitoUser} = accountState;

    const ref = useRef(null);
    const [editableName, setEditableName] = useState(false);
    const [name, setName] = useState('undefined')

    useEffect(() => {
        getUserAttributes()
            .then(res => res["custom:name"] ?
                setName(res["custom:name"]) :
                updateUser(cognitoUser!.getUsername().slice(0, 12), '')
                    .then(attr => setName(attr["custom:name"]))
            )
    }, [cognitoUser?.attributes])

    const avatarSize = 140
    return (
        <View style={{alignItems: "center", paddingTop: '4%', width: '100%'}}>
            <Image source={Assets.Image.emptyUser} style={{height: avatarSize, aspectRatio: 1, borderRadius: 100}}
                   resizeMethod={"resize"}/>
            <View style={{
                width: '100%', marginTop: 8,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}>
                <TextInput ref={ref} value={name} onChangeText={text => setName(formatUserName(text))}
                           editable={editableName}
                           autoFocus={true}
                           style={[{fontSize: 24, padding: 12}, editableName && {backgroundColor: '#f2f2f2'}]}/>
                <TouchableOpacity style={{position: "absolute", right: '4%'}}
                                  onPress={() => {
                                      if (editableName) updateUser(name, '')
                                      setEditableName(!editableName)
                                  }}>
                    <MaterialIcons name={editableName ? "save" : 'edit'} size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Settings = () => {

    return (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}} contentContainerStyle={{padding: '4%'}}>
            <Profile/>
            <SetAlarm/>
            <RowButtonList/>
        </ScrollView>
    )
}

export default Settings;
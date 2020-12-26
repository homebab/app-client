import {Image, ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import {useContainerContext} from "../../contexts/Container";
import {useAccountContext} from "../../contexts/Account";
import Assets from "../../constants/Assets";
import ButtonList from "../../components/ButtonList";
import AsyncStorage from "@react-native-community/async-storage";
import {Auth} from "aws-amplify";
import {Switch} from "react-native-paper";


const RowButtonList = () => {
    const {containerDispatch} = useContainerContext();
    const {accountDispatch} = useAccountContext();

    const dataset = [

        {label: '공지사항'},
        {label: '서비스 문의'},
        {label: '버전정보'},
        {
            label: '냉장고 초기화',
            // icon: <MaterialCommunityIcons name="autorenew" size={28} style={{position: "absolute", left: 32}}/>,
            onPress: () => containerDispatch({type: "FLUSH"}),
        },
        {
            label: '로그아웃',
            // icon: <MaterialCommunityIcons name="logout" size={28} style={{position: "absolute", left: 32}}/>,
            onPress: () => AsyncStorage.removeItem('user').then(_ => {
                Auth.signOut()
                    .then(res => {
                        accountDispatch({type: 'DEAUTHENTICATE'});
                        console.debug("[omtm]: success to sign out")
                    })
                    .catch(err => console.warn("[omtm]: fail to delete cachedUser with", err))
            })
        },
        {label: '영구 탈퇴', textStyle: {color: '#ff1744'}}
    ]

    return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', paddingTop: '4%'}}>
            <ButtonList dataset={dataset} containerStyle={{borderTopColor: 'white', borderLeftColor: 'white'}}/>
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
            label: '유통기한 임박', value: manageIngredients, onPress: () => accountDispatch({
                type: "SET_ALARM",
                alarm: {manageIngredients: !manageIngredients, recommendRecipes: recommendRecipes}
            })
        },
        {
            label: '레시피 추천', value: recommendRecipes, onPress: () => accountDispatch({
                type: "SET_ALARM",
                alarm: {manageIngredients: manageIngredients, recommendRecipes: !recommendRecipes}
            })
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
    const {cachedUser} = accountState;

    const avatarSize = 140
    return (
        <View style={{alignItems: "center", padding: '4%', width: '100%'}}>
            <Image source={Assets.Image.emptyUser} style={{height: avatarSize, aspectRatio: 1, borderRadius: 100}}
                   resizeMethod={"resize"}/>
            <Text style={{marginTop: 12, fontSize: 24}}>{cachedUser!.getUsername().slice(0, 10)}</Text>
        </View>
    )
}

const Settings = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}} contentContainerStyle={{padding: '4%'}}>
            <Profile/>
            <SetAlarm/>
            <RowButtonList/>
        </ScrollView>
    )
}

export default Settings;
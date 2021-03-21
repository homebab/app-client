import {useNetInfo} from "@react-native-community/netinfo";
import {Auth, DataStore} from "aws-amplify";
import Constants from "expo-constants";
import React, {useRef, useState} from "react";
import {Alert, Image, Linking, ScrollView, Text, View} from "react-native";
import ButtonList, {Dataset as ButtonListDataset} from "../../components/ButtonList";
import OnOffButton from "../../components/OnOffButton";
import Assets from "../../constants/Assets";
import {useAccountContext} from "../../contexts/Account";
import usePushNotification from "../../hooks/usePushNotification";
import {deleteAllItems} from "../../services/aws/appsync";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styles} from "./styles";


const RowButtonList = () => {
    const netInfo = useNetInfo();
    const {isConnected} = netInfo;

    const {accountState, accountDispatch} = useAccountContext();
    const {cognitoUser} = accountState;
    const {recommendRecipes, imminentShelfLife} = accountState.customAttributes.alarm;

    const dataset: ButtonListDataset = [

        // {label: '공지사항'},
        // { label: '알림설정', icon: <OnOffButton value={imminentShelfLife} containerStyle={{position: 'absolute', right: '4%'}} onPress={() => {}} />},
        {
            label: '버전정보',
            onPress: () => {
                Alert.alert('HOMEBAB', `현재 버전은 v${Constants.nativeBuildVersion} 입니다`)
            }
        },
        {
            label: '서비스 문의',
            onPress: () => {
                if (Constants.isDevice) Linking.openURL("mailto:homebab.developer@gmail.com");
                else Alert.alert('HOMEBAB', `You must use physical device`)
            },
            disabled: !isConnected,
        },

        {
            label: '냉장고 초기화',
            onPress: () => deleteAllItems(),
        },
        {
            label: '로그아웃',
            onPress: () => Auth.signOut()
                // refer to https://docs.amplify.aws/lib/datastore/other-methods/q/platform/js#clear
                // `DataStore.clear() is often important to use for shared device scenarios
                // or where you need to purge the local on-device storage of records for security/privacy concerns.
                .then(_ => DataStore.clear().then(_ => console.debug('[HOMEBAB]: success to clear datastore')))
                .catch(err => console.warn("[HOMEBAB]: fail to delete cachedUser with", err)),
            disabled: !isConnected
        },
        {
            label: '영구 탈퇴', textStyle: {color: '#ff1744'},
            onPress: () => cognitoUser?.deleteUser((err) => {
                if (err) console.debug('[HOMEBAB]: fail to delete cognitoUser with ', JSON.stringify(err))
                else accountDispatch({type: "DEAUTHENTICATE"})
            }),
            disabled: !isConnected
        }
    ]

    return (
        // <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', marginTop: '4%'}}>
            <ButtonList
                dataset={dataset}
                containerStyle={styles.buttonListContainer}
                buttonContainerStyle={styles.buttonContainer}
            />
        // </View>
    )
}

const Alarm = () => {
    const netInfo = useNetInfo();
    const {isConnected} = netInfo;

    const {alarm, alarmDispatch} = usePushNotification();
    const {imminentShelfLife, recommendRecipes} = alarm;

    const dataset = [
        {
            label: '유통기한 임박',
            value: imminentShelfLife,
            onPress: () => alarmDispatch({type: "SWITCH_IMMINENT_SHELF_LIFE"})
        },
        {label: '레시피 추천', value: recommendRecipes, onPress: () => alarmDispatch({type: "SWITCH_RECOMMEND_RECIPES"})}
    ]

    return (
        <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>알림설정</Text>

            <View style={styles.alarmOnOffContainer}>
                {dataset.map((data, key) =>
                    <OnOffButton key={key} disabled={!isConnected} label={data.label} value={data.value}
                                 onPress={data.onPress}/>)}
            </View>
        </View>
    )
}

const Profile = () => {
    const netInfo = useNetInfo();
    const {isConnected} = netInfo;

    const {accountState, accountDispatch} = useAccountContext();
    const {customAttributes} = accountState;

    const ref = useRef(null);
    const [editableName, setEditableName] = useState(false);
    const [name, setName] = useState(customAttributes.name ?? 'undefined')
    const [image, setImage] = useState(customAttributes.image ?? 'undefined')

    return (
        <View style={styles.profileContainer}>
            <Image source={Assets.Image.emptyUser} style={styles.profileImage}
                   resizeMethod={"resize"}/>
            {/*<View style={{*/}
            {/*    width: '100%', marginTop: 8,*/}
            {/*    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'*/}
            {/*}}>*/}
            {/*    <TextInput ref={ref} value={name} onChangeText={text => setName(formatUserName(text))}*/}
            {/*        editable={editableName}*/}
            {/*        autoFocus={true}*/}
            {/*        style={[{ fontSize: 24, padding: 12 }, editableName && { backgroundColor: '#f2f2f2' }]} />*/}
            {/*    <TouchableOpacity style={{ position: "absolute", right: '4%' }}*/}
            {/*        disabled={!isConnected}*/}
            {/*        onPress={() => {*/}
            {/*            if (!isConnected) {*/}
            {/*                Alert.alert('HOMEBAB', '네트워크 연결이 필요합니다.');*/}
            {/*                return;*/}
            {/*            }*/}

            {/*            if (editableName) updateCustomAttributes({ "custom:name": name })*/}
            {/*                .then(_ => accountDispatch({ type: 'SET_CUSTOM_ATTRIBUTES', customAttributes: { name } }))*/}
            {/*            setEditableName(!editableName)*/}
            {/*        }}>*/}
            {/*        <MaterialIcons name={editableName ? "save" : 'edit'} size={24} color={isConnected ? "black" : "gray"} />*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    )
}

const Settings = () => {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
            <Profile/>
            <Alarm/>
            <RowButtonList/>
        </ScrollView>
    )
}

export default Settings;
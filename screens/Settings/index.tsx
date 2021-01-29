import { MaterialIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { Auth, DataStore } from "aws-amplify";
import Constants from "expo-constants";
import React, { useRef, useState } from "react";
import { Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-paper";
import ButtonList, { Dataset as ButtonListDataset } from "../../components/ButtonList";
import OnOffButton from "../../components/OnOffButton";
import Assets from "../../constants/Assets";
import { useAccountContext } from "../../contexts/Account";
import { deleteAllItems } from "../../services/aws/appsync";
import { updateCustomAttributes } from "../../services/aws/cognito";
import { formatUserName } from "../../validators/format";


const RowButtonList = () => {
    const netInfo = useNetInfo();
    const { isConnected } = netInfo;

    const { accountState, accountDispatch } = useAccountContext();
    const { cognitoUser } = accountState;
    const { recommendRecipes, imminentShelfLife } = accountState.customAttributes.alarm;

    const dataset: ButtonListDataset = [

        // {label: '공지사항'},
        // { label: '알림설정', icon: <OnOffButton value={imminentShelfLife} containerStyle={{position: 'absolute', right: '4%'}} onPress={() => {}} />},
        {
            label: '버전정보',
            onPress: () => {
                alert(`현재 버전은 vdr${Constants.nativeBuildVersion} 입니다`)
            }
        },
        {
            label: '서비스 문의',
            onPress: () => {
                Linking.openURL("mailto:homebab.developer@gmail.com")
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
            label: '영구 탈퇴', textStyle: { color: '#ff1744' },
            onPress: () => cognitoUser?.deleteUser((err) => {
                if (err) console.debug('[HOMEBAB]: fail to delete cognitoUser with ', JSON.stringify(err))
                else accountDispatch({ type: "DEAUTHENTICATE" })
            }),
            disabled: !isConnected
        }
    ]

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', marginTop: '4%' }}>
            <ButtonList dataset={dataset} containerStyle={{ borderLeftColor: 'white', borderTopColor: 'white' }} />
        </View>
    )
}

const SetAlarm = () => {
    const netInfo = useNetInfo();
    const { isConnected } = netInfo;

    const { accountState, accountDispatch } = useAccountContext();
    const { alarm } = accountState.customAttributes;
    const { recommendRecipes, imminentShelfLife, expoPushToken } = alarm;

    const dataset = [
        {
            label: '유통기한 임박', value: imminentShelfLife, onPress: () => {
                // alert('[HOMEBAB] coming soon')
                const newAlarm = { ...alarm, imminentShelfLife: !imminentShelfLife };
                updateCustomAttributes(
                    { "custom:alarm": JSON.stringify(newAlarm) }
                ).then(_ => accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: newAlarm } }));
            }
        },
        {
            label: '레시피 추천', value: recommendRecipes, onPress: () => {
                // alert('[HOMEBAB] coming soon')
                const newAlarm = { ...alarm, recommendRecipes: !recommendRecipes };
                updateCustomAttributes(
                    { "custom:alarm": JSON.stringify(newAlarm) }
                ).then(_ => accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: newAlarm } }));
            }
        }
    ]

    return (
        <View style={{ width: '100%', padding: '4%', borderBottomWidth: 1, borderColor: 'rgba(208,200,192,0.5)' }}>
            <Text style={{ marginBottom: 16, fontFamily: 'nanum-square-round-bold', fontSize: 16 }}>알림설정</Text>

            <View style={{ width: '100%', flexDirection: 'row' }}>
                {dataset.map((data, key) =>
                    <OnOffButton key={key} disabled={!isConnected} label={data.label} value={data.value} onPress={data.onPress}/>)}
            </View>
        </View>
    )
}

const Profile = () => {
    const netInfo = useNetInfo();
    const { isConnected } = netInfo;

    const { accountState, accountDispatch } = useAccountContext();
    const { customAttributes } = accountState;

    const ref = useRef(null);
    const [editableName, setEditableName] = useState(false);
    const [name, setName] = useState(customAttributes.name ?? 'undefined')
    const [image, setImage] = useState(customAttributes.image ?? 'undefined')

    const avatarSize = 140
    return (
        <View style={{ alignItems: "center", paddingTop: '4%', width: '100%' }}>
            <Image source={Assets.Image.emptyUser} style={{ height: avatarSize, aspectRatio: 1, borderRadius: 100 }}
                resizeMethod={"resize"} />
            <View style={{
                width: '100%', marginTop: 8,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}>
                <TextInput ref={ref} value={name} onChangeText={text => setName(formatUserName(text))}
                    editable={editableName}
                    autoFocus={true}
                    style={[{ fontSize: 24, padding: 12 }, editableName && { backgroundColor: '#f2f2f2' }]} />
                <TouchableOpacity style={{ position: "absolute", right: '4%' }}
                    disabled={!isConnected}
                    onPress={() => {
                        if (!isConnected) {
                            alert('[Homebab]: 네트워크 연결이 필요합니다.');
                            return;
                        }

                        if (editableName) updateCustomAttributes({ "custom:name": name })
                            .then(_ => accountDispatch({ type: 'SET_CUSTOM_ATTRIBUTES', customAttributes: { name } }))
                        setEditableName(!editableName)
                    }}>
                    <MaterialIcons name={editableName ? "save" : 'edit'} size={24} color={isConnected ? "black" : "gray"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Settings = () => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ padding: '4%' }}>
            <Profile />
            <SetAlarm />
            <RowButtonList />
        </ScrollView>
    )
}

export default Settings;
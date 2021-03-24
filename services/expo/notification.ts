import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';
import {Alarm} from "../../contexts/Account";
import {updateCustomAttributes} from "../aws/cognito";

export const registerForPushNotificationsAsync = async (alarm: Alarm) => {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            console.log(status)
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            throw Error('[HOMEBAB]: 푸쉬알림을 허가해주세요.');
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;

        // TODO: separate push notification logic from cognito. and handle multi devices(tokens) for same user.
        updateCustomAttributes({ "custom:alarm": JSON.stringify({ ...alarm, expoPushToken: token }) })
            .catch(_ => { throw Error("fail to update custom attributes") });
    } else throw Error('You must use physical device.');

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token
};
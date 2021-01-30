import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            console.log(status)
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.debug('[HOMEBAB]: Failed to get push token for push notification!');
            throw Error;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.debug('[HOMEBAB]: Must use physical device for Push Notifications');
        throw Error;
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token
};
import { useNetInfo } from "@react-native-community/netinfo";
import {Alarm, initialAlarm, useAccountContext} from "../contexts/Account";
import { updateCustomAttributes } from "../services/aws/cognito";
import { registerForPushNotificationsAsync } from "../services/expo/notification";
import {Alert} from "react-native";
import {useEffect} from "react";


type Action =
    | { type: "SWITCH_IMMINENT_SHELF_LIFE" }
    | { type: "SWITCH_RECOMMEND_RECIPES" }

type State = Alarm

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SWITCH_IMMINENT_SHELF_LIFE":
            return { ...state, imminentShelfLife: !state.imminentShelfLife };
        case "SWITCH_RECOMMEND_RECIPES":
            return { ...state, recommendRecipes: !state.recommendRecipes };
        default:
            return state;
    }
}

const usePushNotification = () => {
    const netInfo = useNetInfo();
    const { isConnected } = netInfo;

    const { accountState, accountDispatch } = useAccountContext();
    const { alarm } = accountState.customAttributes;

    useEffect(() => {
      registerForPushNotificationsAsync(alarm)
          .then(token => console.debug("[HOMEBAB]: success to get token, ", token))
          .catch(error => {
              Alert.alert('홈밥', error.message);
              // 롤백
              accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: alarm } });
          });
    }, [])

    const alarmDispatch = async (action: Action) => {
        if (!isConnected) {
            throw Error('[Homebab]: 네트워크 연결이 필요합니다.');
        }

        const newAlarm = reducer(alarm, action);
        accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: newAlarm } });

        registerForPushNotificationsAsync(newAlarm)
            .then(token => console.debug("[HOMEBAB]: success to get token, ", token))
            .catch(error => {
                Alert.alert('홈밥', error.message);
                // 롤백
                accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: alarm } });
            });
    }

    return { alarm, alarmDispatch }
}

export default usePushNotification;
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useReducer } from "react";
import { Alarm, useAccountContext } from "../contexts/Account";
import { updateCustomAttributes } from "../services/aws/cognito";
import { registerForPushNotificationsAsync } from "../services/expo/notification";


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

    const alarmDispatch = async (action: Action) => {
        if (!isConnected) {
            throw Error('[Homebab]: 네트워크 연결이 필요합니다.');
        }

        try {
            const newAlarm = reducer(alarm, action);
            accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: newAlarm } });

            const token = await registerForPushNotificationsAsync();
            console.debug("[HOMEBAB]: success to get token, ", token)

            updateCustomAttributes({ "custom:alarm": JSON.stringify({ ...newAlarm, expoPushToken: token }) })
                .catch(_ => { throw Error("[HOMEBAB]: 업데이트에 실패했습니다.") });

        } catch (err) {
            alert(err.message);
            accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: alarm } });
        }
    }

    return { alarm, alarmDispatch }
}

export default usePushNotification;
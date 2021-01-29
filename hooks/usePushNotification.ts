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
        case "SWITCH_IMMINENT_SHELF_LIFE":
            return { ...state, recommendRecipes: !state.recommendRecipes };
        default:
            return state;
    }
}

const usePushNotification = () => {
    const { accountState, accountDispatch } = useAccountContext();
    const { alarm } = accountState.customAttributes;

    const alarmDispatch = async (action: Action) => {
        try {
            const token = await registerForPushNotificationsAsync();

            const newAlarm = reducer(
                { ...alarm, expoPushToken: token }, action
            );

            updateCustomAttributes({ "custom:alarm": JSON.stringify(newAlarm) })
                .then(_ => accountDispatch({ type: "SET_CUSTOM_ATTRIBUTES", customAttributes: { alarm: newAlarm } }))
                .catch(_ => alert("[HOMEBAB]: 업데이트에 실패했습니다."))
        } catch {
            alert("[HOMEBAB]: 푸쉬알림을 허가해주세요.")
        }
    }

    return { alarm, alarmDispatch }
}

export default usePushNotification;
import React, { createContext, Dispatch, Reducer, useContext, useReducer } from "react";
import { MyCognitoUser } from "../../services/aws/cognito";

export type Alarm = {
    imminentShelfLife: boolean,
    recommendRecipes: boolean
}

export type CustomAttributes = {
    name?: string,
    image?: string,
    alarm: Alarm,
}

export type Account = {
    cognitoUser: MyCognitoUser,
    customAttributes: CustomAttributes,
    isAuthenticated: boolean
}

export type Action =
    | { type: "FLUSH" }
    | { type: "SET_ACCOUNT", account: Account }
    | {
        type: "SET_CUSTOM_ATTRIBUTES", customAttributes: {
            name?: string,
            image?: string,
            alarm?: Alarm,
        }
    }
    | { type: "DEAUTHENTICATE" }

type Props = {
    reducer: Reducer<Account, Action>;
    initState: Account;
}

type ContextProps = {
    accountState: Account;
    accountDispatch: Dispatch<Action>;
}

export const initialAlarm: Alarm = { imminentShelfLife: false, recommendRecipes: false }

export const initialAccount: Account = {
    cognitoUser: {} as MyCognitoUser,
    customAttributes: { alarm: initialAlarm },
    isAuthenticated: false,
}

export const AccountContext: React.Context<ContextProps> = createContext({} as ContextProps);

export const AccountProvider: React.FC<Props> =
    ({ reducer, initState, children }) => {
        const [accountState, accountDispatch] = useReducer(reducer, initState);
        const value = { accountState, accountDispatch };
        return (
            <AccountContext.Provider value={value}>
                {children}
            </AccountContext.Provider>
        );
    };

export const useAccountContext = () => useContext(AccountContext);

const AccountController: React.FC = ({ children }) => {
    const reducer: Reducer<Account, Action> = (state, action) => {
        switch (action.type) {
            case 'FLUSH':
                return initialAccount;
            case 'SET_ACCOUNT':
                return {
                    ...state,
                    ...action.account
                };
            case 'SET_CUSTOM_ATTRIBUTES':
                return {
                    ...state,
                    customAttributes: {
                        ...state.customAttributes,
                        ...action.customAttributes
                    }
                };
            case 'DEAUTHENTICATE':
                return {
                    ...state,
                    isAuthenticated: false
                };
            default:
                return state;
        }
    }
    return (
        <AccountProvider reducer={reducer} initState={initialAccount}>
            {children}
        </AccountProvider>
    );
}

export default AccountController;
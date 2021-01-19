import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {MyCognitoAttributes, MyCognitoUser} from "../../services/aws/cognito";

export type Alarm = {
    manageIngredients: boolean,
    recommendRecipes: boolean
}

export type CustomAttributes = {
    name?: string,
    image?: string
}

export type Account = {
    cognitoUser: MyCognitoUser,
    customAttributes: CustomAttributes,
    alarm: Alarm,
    isAuthenticated: boolean
}

export type Action =
    | { type: "FLUSH" }
    | { type: "SET_ACCOUNT", account: Account }
    | { type: "DEAUTHENTICATE" }
    | { type: "SET_ALARM", alarm: Alarm }

type Props = {
    reducer: Reducer<Account, Action>;
    initState: Account;
}

type ContextProps = {
    accountState: Account;
    accountDispatch: Dispatch<Action>;
}

export const initialAccount: Account = {
    cognitoUser: {} as MyCognitoUser,
    customAttributes: {},
    alarm: {
        manageIngredients: false,
        recommendRecipes: false
    },
    isAuthenticated: false,
}

export const AccountContext: React.Context<ContextProps> = createContext({} as ContextProps);

export const AccountProvider: React.FC<Props> =
    ({reducer, initState, children}) => {
        const [accountState, accountDispatch] = useReducer(reducer, initState);
        const value = {accountState, accountDispatch};
        return (
            <AccountContext.Provider value={value}>
                {children}
            </AccountContext.Provider>
        );
    };

export const useAccountContext = () => useContext(AccountContext);

const AccountController: React.FC = ({children}) => {
    const reducer: Reducer<Account, Action> = (state, action) => {
        switch (action.type) {
            case 'FLUSH':
                return initialAccount;
            case 'SET_ACCOUNT':
                return {
                    ...state,
                    ...action.account
                };
            case 'DEAUTHENTICATE':
                return {
                    ...state,
                    isAuthenticated: false
                };
            case 'SET_ALARM':
                return {
                    ...state,
                    alarm: action.alarm,
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
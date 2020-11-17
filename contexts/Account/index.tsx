import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {CognitoUser} from "amazon-cognito-identity-js";

export type Profile = {
    // TODO: strengthen security
    id: number; // omtm RDB id
    // socialId?: string;
    email: string;
    name: string;
    age?: number;
    gender?: string;
    imageUrl?: string;
};

export type CachedUser = CognitoUser;

export type Account = {
    profile?: Profile,
    cachedUser: CachedUser | undefined,
    isAuthenticated?: boolean
}

export type Action =
    | {type: "FLUSH"}
    | {type: "SET_ACCOUNT", account: Account}
    | {type: "DEAUTHENTICATE"}

type Props = {
    reducer: Reducer<Account, Action>;
    initState: Account;
}

type ContextProps = {
    accountState: Account;
    accountDispatch: Dispatch<Action>;
}

export const initialAccount: Account = {
    cachedUser: undefined,
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
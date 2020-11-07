import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Actions} from "..";
import {CognitoUser} from "amazon-cognito-identity-js";

export enum Storage {
    FRIDGE = "냉장", FREEZER = "냉동", ROOM = "실온"
}

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
    profile: Profile,
    cachedUser?: CachedUser,
    isAuthenticated?: boolean
}

export const initialAccount: Account = {
    profile: {
        id: -1,
        email: 'meow@gmail.com',
        name: 'meow',
    },

    isAuthenticated: false,
}

type Props = {
    reducer: Reducer<Account, Actions>;
    initState: Account;
}

type ContextProps = {
    accountState: Account;
    accountDispatch: Dispatch<Actions>;
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
    const reducer: Reducer<Account, Actions> = (state, action) => {
        switch (action.type) {
            case 'flush':
                return initialAccount;
            case 'setAccount':
                return {
                    ...state,
                    ...action.value
                };
            case 'deauthenticate':
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
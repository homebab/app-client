import React, { Reducer, Dispatch, createContext, useReducer, useContext } from "react";
import { Actions } from "..";


export type Profile = {
    id: number; // omtm RDB id
    // socialId?: string;
    email: string;
    name: string;
    age?: number;
    gender?: string;
    image_url?: string;
};

export type Item = {
    name: string;
    expiredAt: string // | Date;
    category: string;
    memo: string;
    url: string; // image url
}

export type Account = {
    profile: Profile,
    container: Array<Item>,
    isAuthenticated?: boolean
}

export const initialAccount: Account = {
    profile: {
        id: 0,
        email: 'meow@gmail.com',
        name: 'meow',
    },

    container:  [
        {
            name: '돼지고기',
            expiredAt: '2022-1-23',
            category: '육류',
            memo: '냉동',
            url: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/pork.jpg',
        },
        {
            name: '양파',
            expiredAt: '2025-1-21',
            category: '야채',
            memo: '뉴비',
            url: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/onion.jpg',
        },
        {
            name: '닭',
            expiredAt: '2019-11-17',
            category: '육류',
            memo: '12호',
            url: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/chicken.jpg',
        },
        {
            name: '감자',
            expiredAt: '2019-11-22',
            category: '야채',
            memo: '',
            url: '', // https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/potato.jpg
        },
    ],

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
                    profile: action.value.profile,
                    container: action.value.container,
                    isAuthenticated: action.value.isAuthenticated
                };
            case 'addItem':
                return {
                    ...state,
                    container: [
                        state.container,
                        action.value.item
                    ]
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


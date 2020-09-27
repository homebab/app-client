import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Actions} from "..";

export enum Storage {
    FRIDGE = "FRIDGE", FREEZER = "FREEZER", ROOM = "ROOM"
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

export type CachedUser = any;

export type Item = {
    id: string;
    name: string;
    expiredAt: Date; // | Date;
    storage: Storage;
    tag: string;
    memo: string;
    imageUrl?: string; // image url
}

export type Account = {
    profile: Profile,
    cachedUser?: CachedUser,
    container: Array<Item>,
    isAuthenticated?: boolean
}

export const initialAccount: Account = {
    profile: {
        id: -1,
        email: 'meow@gmail.com',
        name: 'meow',
    },

    container: [
        {
            id: '',
            name: '돼지고기',
            expiredAt: new Date('2022-1-23'),
            storage: Storage.FRIDGE,
            tag: '육류',
            memo: '냉동',
            imageUrl: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/pork.jpg',
        },
        {
            id: '',
            name: '양파',
            expiredAt: new Date('2025-1-21'),
            storage: Storage.FRIDGE,
            tag: '야채',
            memo: '뉴비',
            imageUrl: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/onion.jpg',
        },
        {
            id: '',
            name: '닭',
            expiredAt: new Date('2019-11-17'),
            storage: Storage.FREEZER,
            tag: '육류',
            memo: '12호',
            imageUrl: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/chicken.jpg',
        },
        {
            id: '',
            name: '감자',
            expiredAt: new Date('2019-11-22'),
            storage: Storage.ROOM,
            tag: '야채',
            memo: '',
            imageUrl: '', // https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/potato.jpg
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
                    ...action.value
                };
            case 'setContainer':
                return {
                    ...state,
                    container: action.value.container
                }
            case 'addItem':
                return {
                    ...state,
                    container: state.container.concat([action.value.item])
                };
            case 'deleteItem':
                return {
                    ...state,
                    container: state.container.filter(item => item.id !== action.value.id)
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


/*
    Omtm Server -> Omtm Client
    expiredAt: string -> Date
 */

export const convertContainer = (container: Array<Item>) =>
    container.map(item => {
        return {
            ...item,
            expiredAt: new Date(item.expiredAt)
        }
    });

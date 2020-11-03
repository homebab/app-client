import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Storage} from "../../types/Storage"
import {Actions} from "..";

export type Item = {
    id?: string;
    name: string;
    expiredAt?: Date; // | Date;
    storage?: Storage;
    category?: string;
    tag?: string;
    memo?: string;
    imageUrl?: string; // image url
}

export type Container = {
    fridge: Array<Item>,
    // temporary container: basket
    basket: Array<Item>,
}

export const initialContainer: Container = {
    fridge: [
        // {
        //     id: '',
        //     name: '돼지고기',
        //     expiredAt: new Date('2022-1-23'),
        //     storage: Storage.FRIDGE,
        //     tag: '육류',
        //     memo: '냉동',
        //     imageUrl: 'https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/foods/pork.jpg',
        // }
    ],
    basket: []
}

type Props = {
    reducer: Reducer<Container, Actions>;
    initState: Container;
}

type ContextProps = {
    containerState: Container;
    containerDispatch: Dispatch<Actions>;
}

export const ContainerContext: React.Context<ContextProps> = createContext({} as ContextProps);

export const ContainerProvider: React.FC<Props> =
    ({reducer, initState, children}) => {
        const [containerState, containerDispatch] = useReducer(reducer, initState);
        const value = {containerState, containerDispatch};
        return (
            <ContainerContext.Provider value={value}>
                {children}
            </ContainerContext.Provider>
        );
    };

export const useContainerContext = () => useContext(ContainerContext);

const ContainerController: React.FC = ({children}) => {
    const reducer: Reducer<Container, Actions> = (state, action) => {
        switch (action.type) {
            case 'flush':
                return initialContainer;
            case 'updateBasket':
                return {
                    ...state,
                    basket: action.value.basket
                }
            case 'putInBasket':
                return {
                    ...state,
                    basket: state.basket.concat([action.value.item])
                }
            default:
                return state;
        }
    }
    return (
        <ContainerProvider reducer={reducer} initState={initialContainer}>
            {children}
        </ContainerProvider>
    );
}

export default ContainerController;


/*
    Omtm Server -> Omtm Client
    expiredAt: string -> Date
 */

export const convertContainer = (container: Array<Item>) =>
    container.map(item => {
        return {
            ...item,
            expiredAt: new Date(item.expiredAt!)
        }
    });

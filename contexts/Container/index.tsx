import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Storage} from "../../types/Storage"
import {Actions} from "..";

export type UUID = string;

export type Item = {
    id: UUID;
    name: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
    expiredAt?: Date; // | Date;
    storage?: Storage;
    tag?: string;
    memo?: string;
    imageUrl?: string; // image url
}

export type Container = {
    fridge: Map<UUID, Item>,
    // temporary container: basket
    basket: Array<Item>,
}

export const initialContainer: Container = {
    fridge: new Map(),
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
            case 'flushBasket':
                return {
                    ...state,
                    basket: []
                }
            case 'flushFridge':
                return {
                    ...state,
                    fridge: new Map()
                }
            case 'setFridge':
                return {
                    ...state,
                    fridge: action.value.fridge
                }
            case 'addFridgeItems':
                console.log(action.value)
                const items: Array<Item> = action.value.items;

                return {
                    ...state,
                    fridge: new Map(
                        Array.from(state.fridge.entries())
                            .concat(items.map(item => [item.id, item]))
                            .sort())
                };
            case 'deleteFridgeItem':
                state.fridge.delete(action.value.id);

                return {
                    ...state,
                    fridge: new Map(state.fridge)
                };
            case 'updateFridgeItem':
                const updatedItem: Item = action.value.item;
                state.fridge.set(updatedItem.id, updatedItem);

                return {
                    ...state,
                    fridge: new Map(state.fridge)
                }
            case 'updateBasket':
                return {
                    ...state,
                    basket: action.value.basket
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

export const convertContainer = (container: Map<UUID, Item>) =>
    new Map(Array.from(container.values())
        .map(item => {
            return [item.id, {
                ...item,
                expiredAt: new Date(item.expiredAt!),
                createdAt: new Date(item.createdAt!),
                updatedAt: new Date(item.updatedAt!)
            }]
        }));

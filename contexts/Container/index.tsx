import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Storage} from "../../types/Storage"

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

export type Action =
    | {type: "FLUSH"}
    | {type: "FLUSH_BASKET"}
    | {type: "FLUSH_FRIDGE"}
    | {type: "SET_FRIDGE", fridge: Map<UUID, Item>}
    | {type: "SET_BASKET", basket: Array<Item>}
    | {type: "ADD_FRIDGE_ITEMS", items: Array<Item>}
    | {type: "DELETE_FRIDGE_ITEM", id: UUID}
    | {type: "UPDATE_FRIDGE_ITEM", item: Item}


type Props = {
    reducer: Reducer<Container, Action>;
    initState: Container;
}

type ContextProps = {
    containerState: Container;
    containerDispatch: Dispatch<Action>;
}

const initialContainer: Container = {
    fridge: new Map(),
    basket: []
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
    const reducer: Reducer<Container, Action> = (state, action) => {
        switch (action.type) {
            case 'FLUSH':
                return initialContainer;
            case 'FLUSH_BASKET':
                return {
                    ...state,
                    basket: []
                }
            case 'SET_BASKET':
                return {
                    ...state,
                    basket: action.basket
                }
            case 'FLUSH_FRIDGE':
                return {
                    ...state,
                    fridge: new Map()
                }
            case 'SET_FRIDGE':
                return {
                    ...state,
                    fridge: action.fridge
                }
            case 'ADD_FRIDGE_ITEMS':
                const items: Array<Item> = action.items;

                return {
                    ...state,
                    fridge: new Map(
                        Array.from(state.fridge.entries())
                            .concat(items.map(item => [item.id, item]))
                            .sort())
                };
            case 'DELETE_FRIDGE_ITEM':
                state.fridge.delete(action.id);

                return {
                    ...state,
                    fridge: new Map(state.fridge)
                };
            case 'UPDATE_FRIDGE_ITEM':
                const updatedItem: Item = {
                    ...action.item,
                    updatedAt: new Date()
                };
                state.fridge.set(updatedItem.id, updatedItem);

                return {
                    ...state,
                    fridge: new Map(state.fridge)
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

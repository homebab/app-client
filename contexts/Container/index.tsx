import React, {createContext, Dispatch, Reducer, useContext, useReducer} from "react";
import {Storage} from "../../types/Storage"
import {Analytics} from "aws-amplify";

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
    | { type: "FLUSH" }
    | { type: "FLUSH_BASKET" }
    | { type: "SET_BASKET", basket: Array<Item> }
    | { type: "ADD_BASKET_ITEM", item: Item }
    | { type: "DELETE_BASKET_ITEM", name: string}
    | { type: "FLUSH_FRIDGE" }
    | { type: "SET_FRIDGE", fridge: Map<UUID, Item> }
    | { type: "MOVE_BASKET_TO_FRIDGE" }
    | { type: "DELETE_FRIDGE_ITEM", id: UUID, amount: number }
    | { type: "UPDATE_FRIDGE_ITEM", item: Item }


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
            case 'ADD_BASKET_ITEM':
                return {
                    ...state,
                    basket: state.basket.concat(action.item)
                }
            case 'DELETE_BASKET_ITEM':
                return {
                    ...state,
                    basket: state.basket.filter(i => i.name !== action.name)
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
            case 'MOVE_BASKET_TO_FRIDGE':
                const items: Array<Item> = state.basket.map(item => {
                    const date = new Date();
                    date.setDate(date.getDate() + 10);

                    return {
                        id: item.id,
                        name: item.name,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        expiredAt: date, // | Date;
                        storage: Storage.FRIDGE,
                        category: item.category,
                    }
                })

                console.log()
                Analytics.record({
                    name: 'ADD_FRIDGE_ITEMS',
                    deleteItem: {},
                    addItemIds: items.map(i => i.id),
                    metrics: {}
                })
                    .then(res => console.debug(`[omtm]: success to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(res)}`))
                    .catch(err => console.warn(`[omtm]: fail to record 'ADD_FRIDGE_ITEMS' event, ${JSON.stringify(err)}`))

                return {
                    ...state,
                    fridge: new Map(
                        Array.from(state.fridge.entries())
                            .concat(items.map(item => [item.id, item]))
                            .sort())
                };
            case 'DELETE_FRIDGE_ITEM':
                const item: Item | undefined = state.fridge.get(action.id);

                Analytics.record({
                    name: 'DELETE_FRIDGE_ITEM',
                    // customize spreading Object
                    deleteItem: {...item},
                    addItemIds: [],
                    metrics: {'WASTE_AMOUNT': action.amount}
                })
                    .then(res => console.debug(`[omtm]: success to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(res)}`))
                    .catch(err => console.warn(`[omtm]: fail to record 'DELETE_FRIDGE_ITEM' event, ${JSON.stringify(err)}`))

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

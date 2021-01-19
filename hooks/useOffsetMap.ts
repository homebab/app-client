import {Reducer, useReducer, useState} from "react";
import {Container} from "../contexts/Container";
import {Category} from "../types/Category";
import {PointPropType} from "react-native";

export type OffsetAction =
    | { type: "SET_OFFSET", payload: { category: Category, point: PointPropType } }

const reducer: Reducer<Map<Category, PointPropType>, OffsetAction> = (state: Map<Category, PointPropType>, action: OffsetAction) => {
    switch (action.type) {
        case "SET_OFFSET":
            const {category, point} = action.payload
            state.set(category, point)
            return new Map(state)
    }
}

export default function useOffsetMap(initialState: Map<Category, PointPropType>) {
    const [offsetState, offsetDispatch] = useReducer(reducer, initialState);

    return {offsetState, offsetDispatch}
}
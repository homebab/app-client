import { DependencyList, DispatchWithoutAction, Reducer, useEffect, useReducer, useState } from "react";

type Action<T> =
    | { type: "FLUSH", payload: { initialState: State<T> } }
    | { type: "FETCH_INIT" }
    | { type: "FETCH_SUCCESS", payload: { data: T } }
    | { type: "FETCH_FAILURE" }

type State<T> = {
    isLoading: boolean,
    isError: boolean,
    data: T,
    page: number
}

const reducer = <T>(state: State<T>, action: Action<T>) => {
    switch (action.type) {
        case "FLUSH":
            return action.payload.initialState;
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data,
                page: state.page + 1
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const useFetchData = <T>(initialUrl: string, initialData: T, deps?: Array<any>) => {
    const initialState = { isLoading: true, isError: false, data: initialData, page: 0 };
    const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, initialState);

    const { data } = state;

    const fetchData = async (url: string, reduce?: (l: T, r: T) => T) => {
        dispatch({ type: 'FETCH_INIT' });

        try {
            const response = await fetch(url);
            const jsonData = await response.json();

            console.debug(`[HOMEBAB]: success to fetch data to '${url}' with ${JSON.stringify(jsonData).slice(0, 100)}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: { data: reduce ? reduce(data, jsonData) : jsonData as T } });
        } catch (error) {
            console.debug(`[HOMEBAB]: fail to fetch data to '${url}' with ${error}`);
            dispatch({ type: 'FETCH_FAILURE' });
        }
    };

    useEffect(() => {
        dispatch({ type: "FLUSH", payload: { initialState } })
        fetchData(initialUrl);
    }, deps ?? []);

    return { state, fetchData };
};

export default useFetchData;

import {useEffect, useReducer, useState} from "react";

type Action<T> =
    | { type: "FETCH_INIT" }
    | { type: "FETCH_SUCCESS", payload: T }
    | { type: "FETCH_FAILURE" }

type State<T> = {
    isLoading: boolean,
    isError: boolean,
    data: T
}

const dataFetchReducer = <T>(state: State<T>, action: Action<T>) => {
    switch (action.type) {
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
                data: action.payload,
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

const useFetchData = <T>(url: string, initialData: T) => {

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        console.log(url)
        let didCancel = false;

        const fetchData = async () => {
            dispatch({type: 'FETCH_INIT'});

            try {
                console.log(url)
                const response = await fetch(url);
                const jsonData = await response.json();

                if (!didCancel) {
                    console.debug(`[omtm]: fetch data to '${url}' with ${JSON.stringify(jsonData).slice(0, 32)}`)
                    dispatch({type: 'FETCH_SUCCESS', payload: jsonData});
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({type: 'FETCH_FAILURE'});
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return state;
};

export default useFetchData;
import {Reducer, useReducer, useState} from "react";
import {Container} from "../contexts/Container";

type Action =
    | {type: "EXAMPLE"}

const reducer: Reducer<number, Action> = (state: number, action: Action) => {
    switch(action.type) {
        case "EXAMPLE":
            return state
    }
}

export default function useWasteAmount(initialState: number) {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [amount, setAmount] = useState<boolean>(false);

    return [amount, setAmount]
}
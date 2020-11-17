import {Reducer, useReducer, useState} from "react";
import {Container} from "../contexts/Container";

type Action =
    | {type: "EXAMPLE"}

const reducer: Reducer<Date, Action> = (state: Date, action: Action) => {
    switch(action.type) {
        case "EXAMPLE":
            return state
    }
}

export default function useEditable(initialState: Date) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [editable, setEditable] = useState<boolean>(false);

    return
}
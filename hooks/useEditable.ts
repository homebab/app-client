import {useReducer, useState} from "react";

type Action =
    | {}

function reducer(state: Date, action: Action) {

}

export default function useEditable(initialState: Date) {

    const [editable, setEditable] = useState<boolean>(false);

    return
}
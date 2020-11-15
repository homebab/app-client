import {View} from "react-native";
import {chunkArray} from "../../utils/functions";
import React from "react";

type Props = {
    container: Array<any>,
    chunkSize?: number
}

const Grid = (props: Props) => {
    const {container, chunkSize} = props;

    const chunked = chunkArray(container, chunkSize? chunkSize: 4);

    return (
        <View style={{backgroundColor: "#f2f2f2", padding: "5%"}}>
            {
                chunked.map((components, key: number) => (
                    <View key={key} style={{flexDirection: "row", justifyContent: "space-around"}}>
                        {components.map(component => component)}
                    </View>
                ))
            }
        </View>
    );
}

export default Grid;

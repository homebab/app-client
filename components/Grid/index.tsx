import {View} from "react-native";
import {chunkArray} from "../../utils/functions";
import React from "react";

type Props = {
    container: Array<any>
}

const Grid = (props: Props) => {
    const {container} = props;

    const chunk_size = 4

    const chunked = chunkArray(container, chunk_size);

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

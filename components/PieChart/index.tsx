import React from 'react'
import {PieChart} from 'react-native-svg-charts'
import {ViewStyle} from "react-native";

type Props = {
    style: ViewStyle,
    dataset: Array<{
        label: string,
        value: number,
        color: string
    }>
}

const CustomPieChart = (props: Props) => {

    const {style, dataset} = props;

    const pieData = dataset
        // .filter((data) => data.value >= 0)
        .map((data, index) => ({
            value: data.value,
            svg: {
                fill: data.color,
                onPress: () => console.log('press', index),
            },
            key: `${index}`,
        }))

    return <PieChart style={style} data={pieData} outerRadius={'80%'} innerRadius={"70%"}/>
}

export default CustomPieChart;
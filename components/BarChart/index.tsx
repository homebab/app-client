import {BarChart, Grid, XAxis} from 'react-native-svg-charts'
import React from 'react';
import {ViewStyle} from "react-native";


type Props = {
    style: ViewStyle,
    dataset: Array<any>
}


const CustomBarChart = (props: Props) => {
    const {style, dataset} = props

    const data = [
        {
            value: 50,
        },
        {
            value: 10,
            svg: {
                fill: 'rgba(134, 65, 244, 0.5)',
            },
        },
        {
            value: 40,
            svg: {
                stroke: 'purple',
                strokeWidth: 2,
                fill: 'white',
                strokeDasharray: [4, 2],
            },
        },
        {
            value: 85,
            svg: {
                fill: 'green',
            },
        },
    ]

    // const Gradient = () => (
    //     <Defs key={'gradient'}>
    //         <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
    //             <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
    //             <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
    //         </LinearGradient>
    //     </Defs>
    // )


    return (
        <>
            <BarChart
                style={style}
                data={dataset}
                numberOfTicks={3}
                // gridMin={10}
                svg={{fill: 'rgba(0,0,0)'}}
                yAccessor={({item}) => item.value}
                contentInset={{top: 20, bottom: 20}}
                spacingInner={0.8}

            >
                <Grid/>
                {/*<Gradient/>*/}
            </BarChart>
            {/*<XAxis*/}
            {/*    style={{ marginHorizontal: -10 }}*/}
            {/*    data={dataset}*/}
            {/*    // scale={scale.scaleBand}*/}
            {/*    // @ts-ignore*/}
            {/*    xAccessor={(_, index) => index}*/}
            {/*    contentInset={{left: 10, right: 10}}*/}
            {/*    formatLabel={(_, index) => dataset[index].label}*/}
            {/*    svg={{ fontSize: 10, fill: 'black' }}*/}
            {/*/>*/}
        </>
    )
}

export default CustomBarChart;

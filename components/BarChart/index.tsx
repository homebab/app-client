import {BarChart, Grid, XAxis} from 'react-native-svg-charts'
import {Text} from 'react-native-svg';
import React, {useMemo} from 'react';
import {StyleProp, View, ViewStyle} from "react-native";
import {materialBlue} from "../../constants/Colors";

type Data = { label: string, value: number }

type Props = {
    containerStyle: StyleProp<ViewStyle>,
    dataset: Array<Data>
}

const CustomBarChart = (props: Props) => {
    const {containerStyle, dataset} = props


    const dataset2 = useMemo(() =>
        ['10월', '11월', '12월'].map(m => ({label: m, value: parseFloat((Math.random() * 3).toFixed(1))})), []);

    const gap = 12

    const CUT_OFF = 20
    const Labels = ({x, y, bandwidth, data}) => (
        data.map((d, index) => {
            const value = d.value;
            return (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {`${value}`}
                </Text>
            )
        }))

    return (
        <View style={containerStyle}>
            {/*<YAxis*/}
            {/*    style={{backgroundColor: 'pink', marginBottom: gap}}*/}
            {/*    data={dataset.map(d => d.value)}*/}
            {/*    contentInset={{top: 20, bottom: 32}}*/}
            {/*    svg={{*/}
            {/*        fill: 'black',*/}
            {/*        fontSize: 14,*/}
            {/*    }}*/}
            {/*    numberOfTicks={3}*/}
            {/*    formatLabel={(value, _) => `${value}`}*/}
            {/*/>*/}
            <BarChart
                style={{flex: 1}}
                data={dataset2}
                numberOfTicks={4}
                // gridMin={10}
                svg={{fill: materialBlue}}
                yAccessor={({item}) => item.value}
                contentInset={{top: 20, bottom: 20}}
                spacingInner={0.8}

            >
                <Grid svg={{fill: "#f2f2f2"}} direction={Grid.Direction.HORIZONTAL}/>
                <Labels/>
                {/*<Gradient/>*/}
            </BarChart>
            <XAxis
                style={{marginHorizontal: -10, marginTop: gap}}
                data={dataset2}
                // scale={scale.scaleBand}
                // @ts-ignore
                // xAccessor={(_, index) => index}
                contentInset={{left: 20, right: 20,}}
                formatLabel={(_, index) => dataset2[index].label}
                svg={{fontSize: 14, fill: 'black'}}
            />
        </View>
    )
}

export default CustomBarChart;

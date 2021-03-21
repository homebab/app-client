import React from "react";
import {FRIDGE} from "../../contexts/Container";
import VerticalAnalyticsLayout from "../../layouts/VerticalAnalyticsLayout";
import {getImageKey} from "../../constants/Ingredients";
import {Text, View} from "react-native";
import Avatar from "../Avatar";
import Assets from "../../constants/Assets";
import {BarChart, Grid, YAxis} from "react-native-svg-charts";
import {Text as SVGText} from "react-native-svg"

type Props = {
    fridge: FRIDGE
}

const UsageCycleAnalytics = (props: Props) => {

    const {fridge} = props;

    // const tempData = [7, 2, 9, 15, 18, 3, 8, 4, 14, 7, 2, 28, 15, 18, 3, 8, 4, 14]
    //
    // const dataset = useMemo(() => Array.from(fridge.values()).map((item: Item, index) => ({
    //     value: tempData[index], label: item.name
    // })), [fridge]);

    const CUT_OFF = 50
    const Labels = ({x, y, bandwidth, data}) => (
        data.map((value, index) => (
            <SVGText
                key={index}
                x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
                y={y(index) + (bandwidth / 2)}
                fontSize={14}
                fill={value > CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
            >
                {`${value}`}
            </SVGText>
        ))
    )

    return (
        <VerticalAnalyticsLayout title={'식품별 사용주기  ( 단위: 일 )'} containerStyle={{borderBottomWidth: 0}}>

            {Array.from(fridge.values()).map((item, key) => {
                const dataset = [...Array(2)].map(_ => Math.round(Math.random() * 36 + 1));
                const avatarKey = getImageKey(item.name);
                return (
                    <View key={key} style={{
                        flexDirection: 'row', height: 80, width: '100%', justifyContent: 'space-between',
                        borderBottomColor: '#919191', borderBottomWidth: 0.2, padding: 8
                    }}>
                        <View style={{alignItems: 'center', justifyContent: 'center', aspectRatio: 1}}>
                            <Avatar
                                // @ts-ignore
                                source={Assets.FoodImages[avatarKey ? avatarKey : 'default']}
                                size={52}/>
                        </View>
                        <View style={{marginLeft: 8, flex: 1}}>
                            {/* <Text style={{alignSelf: 'center', marginBottom: 4}}>{item.name}</Text> */}
                            <View style={{flexDirection: "row", flex: 1}}>
                                <YAxis
                                    style={{}}
                                    data={dataset}
                                    svg={{
                                        fill: 'black',
                                        fontSize: 14,
                                    }}
                                    yAccessor={({index}) => index}
                                    numberOfTicks={1}
                                    contentInset={{top: 10, bottom: 10}}
                                    spacing={0.2}
                                    formatLabel={(_, index) => index == 0 ? '총' : '12월'}
                                />
                                <BarChart
                                    style={{flex: 1, marginLeft: 8}}
                                    data={dataset}
                                    horizontal={true}
                                    svg={{fill: 'rgb(255,36,36)',}}
                                    contentInset={{top: 10, bottom: 10}}
                                    spacing={0.2}
                                    numberOfTicks={3}
                                    spacingInner={0.8}
                                    gridMin={0}
                                    gridMax={42}
                                >
                                    <Grid direction={Grid.Direction.VERTICAL}/>
                                    <Labels/>
                                </BarChart>
                            </View>
                        </View>
                    </View>
                )
            })}
        </VerticalAnalyticsLayout>
    )
}

export default UsageCycleAnalytics;

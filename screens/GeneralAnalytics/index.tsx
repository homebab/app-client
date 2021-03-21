import {ScrollView, View, Text} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Layout from "../../constants/Layout";
import Premium from "../../components/Premium";
import ShelfLifeAnalytics from "../../components/ShelfLifeAnalytics";
import Pagination from "../../components/Pagination";
import WasteAmountAnalytics from "../../components/WasteAmountAnalytics";
import HorizontalAnalyticsLayout from "../../layouts/HorizontalAnalyticsLayout";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import {useContainerContext} from "../../contexts/Container";
import UsageCycleAnalytics from "../../components/UsageCycleAnalytics";

const horizontalAnalyticsList = [
    {Component: () => <HorizontalAnalyticsLayout title={'남은 유통기한'}><ShelfLifeAnalytics/></HorizontalAnalyticsLayout>},
    {
        Component: () => <HorizontalAnalyticsLayout title={'영양 상태'}><RelativeCenterLayout
            containerStyle={{top: -8}}><Premium/></RelativeCenterLayout></HorizontalAnalyticsLayout>
    },
    {
        Component: () => <HorizontalAnalyticsLayout title={'지출 보고서'}><RelativeCenterLayout
            containerStyle={{top: -8}}><Premium/></RelativeCenterLayout></HorizontalAnalyticsLayout>
    },
]

const GeneralAnalytics = () => {
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    return (
        <View style={{flex: 1}}>
            {/*<MaterialCommunityIcons name="file-chart" size={100} color={"black"}/>*/}
            {/*<Text style={{marginTop: 8, fontSize: 28}}>Dashboard</Text>*/}
            <View style={{height: Layout.window.width * 0.68}}>
                <ScrollView horizontal pagingEnabled centerContent
                            showsHorizontalScrollIndicator={false}
                            onScroll={onScroll}
                            // control sensitivity
                            scrollEventThrottle={400}
                            contentContainerStyle={{
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#f2f2f2'
                            }}
                >
                    {
                        horizontalAnalyticsList.map((v, i) =>
                            <View key={i}
                                 // @ts-ignore
                                  style={{
                                      backgroundColor: 'white', borderRadius: 16,
                                      width: Layout.window.width * 0.84,
                                      alignItems: 'center', justifyContent: 'center',
                                      margin: Layout.window.width * 0.08,
                                      marginTop: Layout.window.width * 0.04,
                                      marginBottom: 0,
                                  }}
                            >
                                {v.Component()}
                            </View>
                        )
                    }
                </ScrollView>
                <Pagination index={index} containerStyle={{padding: '3.6%'}}/>
            </View>
            <View style={{
                flex: 1,
                borderTopLeftRadius: 52, borderTopRightRadius: 52,
                paddingTop: 30, backgroundColor: 'white'
            }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingLeft: '8%', paddingRight: '8%'
                    }}>
                    <WasteAmountAnalytics fridge={fridge}/>
                    {fridge.length != 0 && <UsageCycleAnalytics fridge={fridge}/>}
                </ScrollView>
            </View>
        </View>
    )
}

export default GeneralAnalytics;
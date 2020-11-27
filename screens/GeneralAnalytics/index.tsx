import {ScrollView, View} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import Layout from "../../constants/Layout";
import Premium from "../../components/Premium";
import ShelfLifeAnalytics from "../../components/ShelfLifeAnalytics";
import Pagination from "../../components/Pagination";
import UsagePatternAnalytics from "../../components/UsagePatternAnalytics";

const horizontalAnalyticsList = [
    {Component: () => <ShelfLifeAnalytics/>},
    {Component: () => <Premium/>},
    {Component: () => <Premium/>},
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

    return (
        <View style={{flex: 1}}>
            {/*<MaterialCommunityIcons name="file-chart" size={100} color={"black"}/>*/}
            {/*<Text style={{marginTop: 8, fontSize: 28}}>Dashboard</Text>*/}
            <View style={{height: Layout.window.height * 0.32}}>
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
                                      backgroundColor: 'white', borderRadius: '15%',
                                      height: '84%', width: Layout.window.width * 0.84,
                                      alignItems: 'center', justifyContent: 'center',
                                      margin: Layout.window.width * 0.08
                                  }}
                            >
                                {v.Component()}
                            </View>
                        )
                    }
                </ScrollView>
                <Pagination index={index} containerStyle={{bottom: '12%'}}/>
            </View>
            <View style={{}}>
                <ScrollView contentContainerStyle={{
                    alignItems: 'center', paddingLeft: '8%', paddingRight: '8%', paddingTop: 50,
                    backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50
                }}>
                    <UsagePatternAnalytics/>
                </ScrollView>
            </View>
        </View>
    )
}

export default GeneralAnalytics;
import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import Layout from "../../constants/Layout";
import CustomBarChart from "../../components/BarChart";
import Premium from "../../components/Premium";
import CustomPieChart from "../../components/PieChart";
import useShelfLifeAnalytics from "../../hooks/useShelfLifeAnalytics";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const styles = StyleSheet.create({

    pagination: {
        position: "absolute",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    paginationDotActive: {backgroundColor: "gray"},
    paginationDotInactive: {backgroundColor: "#d7d7d7"},

    carousel: {flex: 1},
});

function Pagination({index, containerStyle}) {
    return (
        <View style={[styles.pagination, containerStyle]} pointerEvents="none">
            {[1, 2, 3].map((_, i) => {
                return (
                    <View key={i}
                          style={[
                              styles.paginationDot,
                              index === i
                                  ? styles.paginationDotActive
                                  : styles.paginationDotInactive,
                          ]}/>
                );
            })}
        </View>
    );
}

const ShelfLifeAnalytics = () => {

    const {shelfLifeAnalytics} = useShelfLifeAnalytics();

    return (
        <View>
            <Text style={{marginLeft: 24, fontSize: 20, fontFamily: 'nanum-square-round'}}>{'남은 유통기한'}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <CustomPieChart
                    dataset={shelfLifeAnalytics.map(d => ({label: d.label, value: d.amount, color: d.color}))}
                    style={{margin: 12, width: Layout.window.width * 0.4, height: Layout.window.width * 0.4}}/>
                <View>
                    {
                        shelfLifeAnalytics.map((a, k) =>
                            <View key={k} style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
                                <MaterialCommunityIcons name="circle" color={a.color} size={12}/>
                                <Text style={{marginLeft: 4, fontFamily: 'nanum-square-round'}}>{`${a.label}: ${a.amount}`}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

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
            <View style={{flex: 4}}>
                <ScrollView horizontal pagingEnabled centerContent
                            showsHorizontalScrollIndicator={false}
                            onScroll={onScroll}
                            contentContainerStyle={{
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#f2f2f2'
                            }}
                >
                    {
                        horizontalAnalyticsList.map((v, i) =>
                            <View key={i}
                                  style={[{
                                      backgroundColor: 'white', borderRadius: '15%',
                                      height: '84%', width: Layout.window.width * 0.84,
                                      alignItems: 'center', justifyContent: 'center',
                                      margin: Layout.window.width * 0.08
                                  }]}
                            >
                                {v.Component()}
                            </View>
                        )
                    }
                </ScrollView>
                <Pagination index={index} containerStyle={{bottom: '12%'}}/>
            </View>
            <View style={{flex: 6}}>
                <ScrollView contentContainerStyle={{
                    flex: 1, alignItems: 'center', paddingLeft: '8%', paddingRight: '8%', paddingTop: 50,
                    backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50
                }}>
                    <View style={{
                        backgroundColor: 'white', width: '100%',
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                        <CustomBarChart style={{width: '100%', height: 300}}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default GeneralAnalytics;
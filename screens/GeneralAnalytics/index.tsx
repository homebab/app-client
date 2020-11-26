import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import Layout from "../../constants/Layout";
import CustomBarChart from "../../components/BarChart";


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
    paginationDotActive: {backgroundColor: "lightblue"},
    paginationDotInactive: {backgroundColor: "gray"},

    carousel: {flex: 1},
});

function Pagination({index, containerStyle}) {
    return (
        <View style={[styles.pagination, containerStyle]} pointerEvents="none">
            {[1, 2, 3].map((_, i) => {
                return (
                    <View
                        key={i}
                        style={[
                            styles.paginationDot,
                            index === i
                                ? styles.paginationDotActive
                                : styles.paginationDotInactive,
                        ]}
                    />
                );
            })}
        </View>
    );
}

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
            <View style={{flex: 3}}>
                <ScrollView horizontal pagingEnabled centerContent
                            showsHorizontalScrollIndicator={false}
                            onScroll={onScroll}
                            contentContainerStyle={{
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#f2f2f2'
                            }}
                >
                    {
                        [1, 2, 3].map(i => {
                            console.log(i)
                            return (
                                <View key={i}
                                      style={[{
                                          backgroundColor: 'white', borderRadius: '15%',
                                          height: '84%', width: Layout.window.width * 0.84,
                                          alignItems: 'center', justifyContent: 'center',
                                          margin: Layout.window.width * 0.08
                                      }]}
                                >
                                    <Text>his</Text>
                                </View>

                            )
                        })
                    }
                </ScrollView>
                <Pagination index={index} containerStyle={{bottom: '12%'}}/>
            </View>
            <View style={{flex: 7}}>
                <ScrollView contentContainerStyle={{
                    flex: 1, alignItems: 'center', paddingTop: 50,
                    backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View style={{
                        backgroundColor: 'white', width: '100%',
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                        <CustomBarChart/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default GeneralAnalytics;
import {FlatList, Text, View} from "react-native";
import CustomBarChart from "../BarChart";
import React, {useMemo} from "react";
import {Item, useContainerContext} from "../../contexts/Container";
import Layout from "../../constants/Layout";
import Premium from "../Premium";

// 현재 보유 식품의 사용 주기
const UsagePatternAnalytics = () => {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    const tempData = [7, 2, 9, 15, 18, 3, 8, 4, 14, 7, 2, 28, 15, 18, 3, 8, 4, 14]

    const dataset = useMemo(() => {
        return Array.from(fridge.values()).map((item: Item, index) => ({
            value: tempData[index], label: item.name
        }))
    }, [fridge]);

    // console.log(dataset)
    return (
        <View style={{width: '100%'}}>
            <View style={{marginBottom: 32}}>
                <Text style={{fontSize: 18, fontFamily: 'nanum-square-round-bold'}}>{'보유 식품의 사용주기'}</Text>
                <View style={{
                    width: '100%', alignItems: 'center',
                }}>
                    <CustomBarChart dataset={dataset.slice(0, 7)}
                                    style={{width: '80%', height: Layout.window.height * 0.3}}/>
                </View>
            </View>

            <Text style={{fontSize: 18, fontFamily: 'nanum-square-round-bold'}}>{'식품 별 사용패턴'}</Text>
            <View style={{
                alignItems: 'center', paddingTop: '20%',
                height: Layout.window.height * 0.5,
            }}>
                <Premium/>
                {/*<FlatList data={dataset} renderItem={*/}
                {/*    (data) => {*/}
                {/*        return <View>*/}
                {/*        </View>*/}
                {/*    }*/}
                {/*}/>*/}
            </View>
        </View>
    )
}

export default UsagePatternAnalytics;

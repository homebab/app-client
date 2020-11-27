import useShelfLifeAnalytics from "../../hooks/useShelfLifeAnalytics";
import {Text, View} from "react-native";
import CustomPieChart from "../PieChart";
import Layout from "../../constants/Layout";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

const ShelfLifeAnalytics = () => {

    const {shelfLifeAnalytics} = useShelfLifeAnalytics();

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'nanum-square-round-bold'}}>{'남은 유통기한'}</Text>
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

export default ShelfLifeAnalytics;
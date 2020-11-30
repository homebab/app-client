import useShelfLifeAnalytics from "../../hooks/useShelfLifeAnalytics";
import {Text, View} from "react-native";
import CustomPieChart from "../PieChart";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import Avatar from "../Avatar";
import {imageKeys} from "../../constants/Ingredients";
import Assets from "../../constants/Assets";
import {Item, useContainerContext} from "../../contexts/Container";
import AbsoluteCenterLayout from "../../Layouts/AbsoluteCenterLayout";
import HorizontalAnalyticsLayout from "../../Layouts/HorizontalAnalyticsLayout";

const ShelfLifeAnalytics = () => {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    const {shelfLifeStat, itemLeftDays} = useShelfLifeAnalytics();

    const topRiskItem: Item = fridge.get(itemLeftDays.sort((a, b) => a.leftDays - b.leftDays)[0].id) as Item
    const avatarKey = imageKeys.filter(key => key.includes(topRiskItem.name) || topRiskItem.name.includes(key))[0];

    return (
        <>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    <CustomPieChart
                        dataset={shelfLifeStat.map(d => ({label: d.label, value: d.amount, color: d.color}))}
                        style={{margin: 0, aspectRatio: 1}}/>
                    <AbsoluteCenterLayout>
                        <Avatar
                            // @ts-ignore
                            source={Assets.Image[avatarKey ? avatarKey : '토마토']}
                            size={58}/>
                    </AbsoluteCenterLayout>
                </View>
                <View style={{flex: 1}}>
                    {
                        shelfLifeStat.map((a, k) =>
                            <View key={k} style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
                                <MaterialCommunityIcons name="circle" color={a.color} size={12}/>
                                <Text style={{
                                    marginLeft: 4,
                                    fontFamily: 'nanum-square-round'
                                }}>{`${a.label}: ${a.amount}`}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </>
    )
}

export default ShelfLifeAnalytics;
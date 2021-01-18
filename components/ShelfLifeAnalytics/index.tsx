import useShelfLifeAnalytics from "../../hooks/useShelfLifeAnalytics";
import {Text, View, Image} from "react-native";
import CustomPieChart from "../PieChart";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import Avatar from "../Avatar";
import {getImageKey} from "../../constants/Ingredients";
import Assets from "../../constants/Assets";
import {Item, useContainerContext} from "../../contexts/Container";
import AbsoluteCenterLayout from "../../layouts/AbsoluteCenterLayout";
import HorizontalAnalyticsLayout from "../../layouts/HorizontalAnalyticsLayout";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";

const ShelfLifeAnalytics = () => {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    const {shelfLifeStat, itemLeftDays} = useShelfLifeAnalytics();

    if (fridge.length == 0) return <RelativeCenterLayout containerStyle={{top: -8}}>
        <Image source={Assets.Image.emptyFridge} resizeMethod={'resize'} style={{height: 120, aspectRatio: 1}}/>
        <Text>{'냉장고가 텅 비었습니다'}</Text>
    </RelativeCenterLayout>

    // TODO: will be optimized for data structure array
    const topRiskItem: Item = fridge.filter(i => i.id == itemLeftDays.sort((a, b) => a.leftDays - b.leftDays)[0].id)[0] as Item
    const avatarKey = getImageKey(topRiskItem.name);

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
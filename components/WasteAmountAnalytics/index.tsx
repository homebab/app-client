import CustomBarChart from "../BarChart";
import React, {useMemo} from "react";
import {FRIDGE, Item} from "../../contexts/Container";
import Layout from "../../constants/Layout";
import VerticalAnalyticsLayout from "../../layouts/VerticalAnalyticsLayout";

type Props = {
    fridge: FRIDGE
}

const WasteAmountAnalytics = (props: Props) => {
    const {fridge} = props;

    const tempData = [7, 2, 9, 15, 18, 3, 8, 4, 14, 7, 2, 28, 15, 18, 3, 8, 4, 14]

    const dataset = useMemo(() => Array.from(fridge.values()).map((item: Item, index) => ({
        value: tempData[index], label: item.name
    })), [fridge]);

    return (
        <VerticalAnalyticsLayout title={'월별 식품 낭비량  ( 범위: 0 ~ 3 )'}>
            <CustomBarChart dataset={dataset.slice(0, 6)}
                            containerStyle={{width: '80%', height: Layout.window.width * 0.68}}/>
        </VerticalAnalyticsLayout>
    )
}

export default WasteAmountAnalytics;

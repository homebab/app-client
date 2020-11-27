import {Item, useContainerContext} from "../contexts/Container";
import {CautionColor} from "../types/CautionColor";
import {useMemo} from "react";

// @ts-ignore
const leftDays = (date: Date) => Math.ceil(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));

enum CautionDegree {
    IMMINENT='일주일 미만', GENERAL='일주일 한달 사이', RELAXED='한달 이상'
}

type Data = {
    label: CautionDegree,
    color: CautionColor,
    amount: number
}

const cautionMap: Map<CautionDegree, CautionColor> = new Map([
    [CautionDegree.IMMINENT, CautionColor.RED],
    [CautionDegree.GENERAL, CautionColor.YELLOW],
    [CautionDegree.RELAXED, CautionColor.GREEN]
]);

export type ShelfLifeAnalytics = Array<Data>

export default function useShelfLifeAnalytics() {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    const shelfLifeAnalytics :ShelfLifeAnalytics = useMemo(() => {
        var amountObj = Object.values(CautionDegree)
            .map((degree: CautionDegree) => {return {[degree]: 0}})
            .reduce((acc, val) => {return {...acc, ...val}}, {})

        Array.from(fridge.values())
            .map((item: Item) => leftDays(item.expiredAt!))
            .forEach(days => {
                if (days < 7) amountObj[CautionDegree.IMMINENT] += 1
                else if (7 <= days && days < 30) amountObj[CautionDegree.GENERAL] += 1
                else if (30 < days) amountObj[CautionDegree.RELAXED] += 1
            })

        return Object.values(CautionDegree)
            .map((degree: CautionDegree) => {return {label: degree, color: cautionMap.get(degree) as CautionColor, amount: amountObj[degree]}})
    }, [fridge])

    return {shelfLifeAnalytics};
}
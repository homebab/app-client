import {Item, useContainerContext} from "../contexts/Container";
import {CautionColor} from "../types/CautionColor";
import {useMemo} from "react";

// @ts-ignore
export const leftDays = (date: Date) => Math.ceil(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));

enum CautionDegree {
    IMMINENT = '일주일 미만', GENERAL = '일주일 한달 사이', RELAXED = '한달 이상'
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

export type ShelfLifeStat = Array<Data>

export default function useShelfLifeAnalytics() {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    const itemLeftDays = useMemo(() => Array.from(fridge.values())
        .map((item: Item) => ({id: item.id, leftDays: leftDays(item.expiredAt!)})), [fridge]);

    const shelfLifeStat: ShelfLifeStat = useMemo(() => {
        const amountObj = Object.values(CautionDegree)
            .map((degree: CautionDegree) => ({[degree]: 0}))
            .reduce((acc, val) => ({...acc, ...val}), {});

        itemLeftDays
            .forEach(item => {
                const days = item.leftDays
                if (days < 7) amountObj[CautionDegree.IMMINENT] += 1
                else if (7 <= days && days < 30) amountObj[CautionDegree.GENERAL] += 1
                else if (30 < days) amountObj[CautionDegree.RELAXED] += 1
            })

        return Object.values(CautionDegree)
            .map((degree: CautionDegree) => {
                return {label: degree, color: cautionMap.get(degree) as CautionColor, amount: amountObj[degree]}
            })
    }, [fridge])

    return {shelfLifeStat, itemLeftDays};
}
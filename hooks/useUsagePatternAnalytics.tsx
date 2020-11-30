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

export default function useUsagePatternAnalytics() {

    const {containerState} = useContainerContext();
    const {fridge} = containerState;

    return {};
}
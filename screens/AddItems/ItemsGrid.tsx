import React, {useState} from "react";
import {Item} from "../../contexts/Account";
import {GestureResponderEvent, View} from "react-native";
import DeleteModal from "../../components/DeleteItemModal";
import ItemCard from "../../components/ItemNewCard";
import Grid from "../../components/Grid";

type Props = {
    container: Array<string>
}

export default function ItemsGrid(props: Props) {
    const {container} = props;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const itemCards = container
        .map((item: string, key: number) => (
            <View key={key}>
                <ItemCard label={item}/>
            </View>
        ))

    return (
        <>
            <Grid container={itemCards}/>
        </>
    );
}
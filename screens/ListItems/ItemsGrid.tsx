import React, {useState} from "react";
import {Item} from "../../contexts/Account";
import {GestureResponderEvent, View} from "react-native";
import DeleteModal from "../../components/DeleteItemModal";
import ItemCard from "../../components/ItemNewCard";
import Grid from "../../components/Grid";

type Props = {
    container: Array<Item>
}

export default function ItemsGrid(props: Props) {
    const {container} = props;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const itemCards = container.sort((l: Item, r: Item) => l.expiredAt.getTime() - r.expiredAt.getTime())
        .map((item: Item, key: number) => (
            <View key={key}>
                <DeleteModal item={item} visible={visibleDeleteModal}
                             hideModal={() => setVisibleDeleteModal(false)}/>
                <ItemCard label={item.name}
                          // showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}
                />
            </View>
        ))

    return (
        <>
            <Grid container={itemCards}/>
        </>
    );
}
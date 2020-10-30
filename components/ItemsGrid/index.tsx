import {Item} from "../../contexts/Account";
import {GestureResponderEvent, View} from "react-native";
import DeleteModal from "../DeleteItemModal";
import ItemCard from "../ItemNewCard";
import {chunkArray} from "../../utils/functions";
import React, {useState} from "react";

type Props = {
    container: Array<Item>
}

const ItemsGrid = (props: Props) => {
    const {container} = props;
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const chunk_size = 4

    const itemComponents = container.sort((l: Item, r: Item) => l.expiredAt.getTime() - r.expiredAt.getTime())
        .map((item: Item, key: number) => (
            <View key={key}>
                <DeleteModal item={item} visible={visibleDeleteModal}
                             hideModal={() => setVisibleDeleteModal(false)}/>
                <ItemCard item={item}
                          showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}/>
                {/*<ItemHeader item={item}*/}
                {/*            showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}/>*/}
                {/*<ItemContent item={item}/>*/}
            </View>
        ));

    const chunked = chunkArray(itemComponents, chunk_size);

    return (
        <View style={{backgroundColor: "#f2f2f2", padding: "5%"}}>
            {
                chunked.map((components, key: number) => (
                    <View key={key} style={{flexDirection: "row", justifyContent: "space-around"}}>
                        {components.map(component => component)}
                    </View>
                ))
            }
        </View>
    );
}

export default ItemsGrid;

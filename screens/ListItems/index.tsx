import React, { useState, useEffect } from "react";
import {styles} from "./styles";
import {View, Text, Image, ScrollView, RefreshControl} from "react-native";
import Assets from "../../constants/Assets";
import { useAccountStateValue, Item } from "../../contexts/Account";
import ItemHeader from "../../components/ItemHeader";
import ItemComponent from "../../components/ItemComponent";

const ListItems = () => {

    const {accountState} = useAccountStateValue();
    const {container} = accountState;
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <ScrollView style={{backgroundColor: "#f2f2f2"}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => alert('refresh에 트리거됨')}
                                />
                            }
                >
                    <View style={{width: "100%", aspectRatio: 2.5, backgroundColor: "skyblue",}}>
                        <Image source={Assets.Image.advertise} style={styles.advertise}/>
                    </View>

                    <View style={{backgroundColor: "#f2f2f2"}}>
                        {
                            container.map((item: Item, key) => (
                                <View key={key}>
                                    <ItemHeader item={item}/>
                                    <ItemComponent item={item}/>
                                </View>
                            ))
                        }

                        <Text style={styles.apiResult}>
                            {
                                container.map((item, key) => {
                                    {item.name}
                                })
                            }
                        </Text>
                    </View>
                </ScrollView>
                {/*<AddItem navigation={this.props.navigation}></AddItem>*/}
            </View>
        </View>
    )
}

export default ListItems;

import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {Image, RefreshControl, ScrollView, Text, View} from "react-native";
import Assets from "../../constants/Assets";
import {Item, useAccountStateValue} from "../../contexts/Account";
import ItemHeader from "../../components/ItemHeader";
import ItemComponent from "../../components/ItemComponent";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";

const ListItems = () => {

    const navigation = useNavigation();

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
                                    {
                                        item.name
                                    }
                                })
                            }
                        </Text>
                    </View>
                </ScrollView>

                <View style={{
                    position: "absolute",
                    padding: 20,
                    borderRadius: 50,
                    bottom: 36,
                    right: 28,
                    backgroundColor: "black"
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                        <AntDesign
                            name="plus"
                            size={28}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ListItems;

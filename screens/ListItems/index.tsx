import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {Image, RefreshControl, ScrollView, Text, View} from "react-native";
import Assets from "../../constants/Assets";
import {convertContainer, useAccountContext} from "../../contexts/Account";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import LocalStorage from "../../constants/LocalStorage";
import {Analytics} from "aws-amplify";
import ItemsGrid from "../../components/ItemsGrid";
import ItemNavigator from "../../navigators/ItemNavigator";

const ListItems = () => {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const {accountState, accountDispatch} = useAccountContext();
    const {container} = accountState;

    useEffect(() => {
        AsyncStorage.setItem(LocalStorage.KEY.USER_ITEMS, JSON.stringify(container))
            .then(_ => {
                console.log(`[omtm]: success to sync Account Context with AsyncStorage`);
                // setVisibleDeleteModal(false);
            })
            .catch(err => console.error('[omtm]: fail to sync Account Context with AsyncStorage', err));
    }, [container])

    const refreshUserItems = () => {
        setRefreshing(true);

        console.log(accountState.cachedUser.username)
        Analytics.record({
            name: 'refreshUserItems',
            attributes: {message: `hello im ${accountState.cachedUser.username}`}
        })
            .then(res => console.debug("[omtm]: success to record an event through AWS pinpoint with " + res))
            .catch(err => console.warn("[omtm]: fail to record with " + err))

        AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)
            .then(userItems => {
                accountDispatch({
                    type: 'setContainer',
                    value: {container: userItems ? convertContainer(JSON.parse(userItems)) : []}
                });
                setRefreshing(false);
            })
            .catch(err => {
                alert(`식자재 정보를 불러오지 못했습니다. ${err}`);
                setRefreshing(false);
            })
    }

    const storageTypes = ["전체", "냉장", "냉동", "실온"]

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
                        // contentContainerStyle={{alignItems: "center"}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => refreshUserItems()}
                            />
                        }
            >
                {/*<View style={styles.advertiseContainer}>*/}
                {/*    <Image source={Assets.Image.advertise} style={styles.advertiseImage}/>*/}
                {/*</View>*/}
                <View
                    style={{
                        alignSelf: 'center',
                        width: "80%",
                        backgroundColor: "white",
                        marginTop: 32,
                        flexDirection: 'row',
                        justifyContent: "space-around",
                    }}>
                    {
                        storageTypes.map((s, k) => (
                            <View key={k} style={{padding: 10}}>
                                <Text>{s}</Text>
                            </View>
                        ))
                    }
                </View>

                <ItemsGrid container={container}/>
            </ScrollView>

            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign
                        name="plus"
                        size={20}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListItems;

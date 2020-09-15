import React, {useState} from "react";
import {styles} from "./styles";
import {GestureResponderEvent, Image, RefreshControl, ScrollView, View} from "react-native";
import Assets from "../../constants/Assets";
import {convertContainer, Item, useAccountContext} from "../../contexts/Account";
import ItemHeader from "../../components/ItemHeader";
import ItemContent from "../../components/ItemContent";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import {getUserItems} from "../../api/omtm";
import DeleteModal from "../../components/DeleteModal";

const ListItems = () => {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

    const {accountState, accountDispatch} = useAccountContext();
    const {profile, container} = accountState;
    const {id} = profile;

    const refreshUserItems = () => {
        setRefreshing(true);
        getUserItems(id)
            .then(res => {
                accountDispatch({
                    type: 'setContainer',
                    value: {container: convertContainer(res as Array<Item>)}
                })
                setRefreshing(false);
            })
            .catch(err => alert(err))
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => refreshUserItems()}
                            />
                        }
            >
                <View style={styles.advertiseContainer}>
                    <Image source={Assets.Image.advertise} style={styles.advertiseImage}/>
                </View>

                <View style={{backgroundColor: "#f2f2f2"}}>
                    {
                        container.sort((l: Item, r: Item) => l.expiredAt.getTime() - r.expiredAt.getTime())
                            .map((item: Item, key: number) => (
                                <View key={key}>
                                    <DeleteModal item={item} visible={visibleDeleteModal}
                                                 hideModal={() => setVisibleDeleteModal(false)}/>
                                    <ItemHeader item={item}
                                                showModal={(_: GestureResponderEvent) => setVisibleDeleteModal(true)}/>
                                    <ItemContent item={item}/>
                                </View>
                            ))
                    }
                </View>
            </ScrollView>

            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign
                        name="plus"
                        size={28}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListItems;

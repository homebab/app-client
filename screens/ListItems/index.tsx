import React, {useState} from "react";
import {styles} from "./styles";
import {Image, RefreshControl, ScrollView, View} from "react-native";
import Assets from "../../constants/Assets";
import {convertContainer, Item, useAccountContext} from "../../contexts/Account";
import ItemHeader from "../../components/ItemHeader";
import ItemComponent from "../../components/ItemComponent";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import {getUserItems} from "../../services/api";

const ListItems = () => {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const {accountState, accountDispatch} = useAccountContext();
    const {profile, container} = accountState;
    const {id} = profile;

    const refreshUserItems = () => {
        getUserItems(id)
            .then(res => accountDispatch({type: 'setContainer', value: {container: convertContainer(res as Array<Item>)}}))
            .catch(err => alert(err))
    }

    // React.useEffect(() => {
    //     loadUserItems();
    // }, []);

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
                        container.map((item: Item, key: number) => (
                            <View key={key}>
                                <ItemHeader item={item}/>
                                <ItemComponent item={item}/>
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

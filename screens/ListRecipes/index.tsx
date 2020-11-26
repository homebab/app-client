import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Layout from "../../constants/Layout";
import Mocks from "../../constants/Mocks";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Analytics } from 'aws-amplify';

export default function ListRecipes() {
    const [refreshing, setRefreshing] = useState<boolean>(false)

    // Not constant, fetch api
    const videoIds = Mocks.SearchedRecipesInfo.eggplant;

    // useEffect(() => {
    //     console.debug('[omtm]: test to record an event to AWS pinpoint');
    //     Analytics.record({
    //         name: 'PAGE_VIEW',
    //         attributes: {pageType: 'ListRecipes'}
    //     })
    //         .then(res => console.debug("[omtm]: success to record an event through AWS pinpoint with " + JSON.stringify(res)))
    //         .catch(err => console.warn("[omtm]: fail to record with " + err))
    // }, []);

    return (
        <View style={styles.container}>
            {/*<ScrollView style={{backgroundColor: "#f2f2f2"}}*/}
            {/*            refreshControl={*/}
            {/*                <RefreshControl*/}
            {/*                    refreshing={refreshing}*/}
            {/*                    onRefresh={() => {*/}
            {/*                        setRefreshing(true)*/}
            {/*                        setRefreshing(false)*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            }*/}
            {/*>*/}
            {/*    {videoIds.map((id, key) => {*/}
            {/*        return (<RecipeCard key={key} id={id}/>)*/}
            {/*    })}*/}
            {/*</ScrollView>*/}
            <MaterialCommunityIcons name="chef-hat" size={100} color="black"/>
            <Text style={{marginTop: 8, fontSize: 28}}>Coming Soon</Text>
        </View>
    );
}

// 16:9
const videoHeight = Layout.window.width * 9 / 16

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

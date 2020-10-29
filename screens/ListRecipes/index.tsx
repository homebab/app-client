import * as React from 'react';
import {useState} from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import EmbedVideo from "../../components/EmbedVideo";
import Layout from "../../constants/Layout";
import Mocks from "../../constants/Mocks";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import RecipeCard from "../../components/RecipeCard";

export default function ListRecipes() {
    const [refreshing, setRefreshing] = useState<boolean>(false)

    // Not constant, fetch api
    const videoIds = Mocks.SearchedRecipesInfo.eggplant;

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: "#f2f2f2"}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    setRefreshing(true)
                                    setRefreshing(false)
                                }}
                            />
                        }
            >
                {videoIds.map((id, key) => {
                    return (<RecipeCard key={key} id={id}/>)
                })}
            </ScrollView>
        </View>
    );
}

// 16:9
const videoHeight = Layout.window.width * 9 / 16

const styles = StyleSheet.create({
    container: {
        flex: 1
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

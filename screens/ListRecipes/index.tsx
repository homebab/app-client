import * as React from 'react';
import {useLayoutEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from "../../constants/Layout";
import RecipeCard from "../../components/RecipeCard";
import useFetchData from "../../hooks/useFetchData";
import {EndPoints} from "../../constants/Endpoints";
import {useContainerContext} from "../../contexts/Container";
import {ActivityIndicator} from "react-native-paper";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import Loading from "../../components/Loading";
import WebView from 'react-native-webview';
import CrossIconButton from "../../components/CrossIconButton";
import Search from "../../components/Search";
import {useNavigation} from "@react-navigation/native";
import {Recipe, RecipeHit, RecipeRecommendationResponse, sourceToRecipe} from "../../types/Recipe";

export default function ListRecipes() {
    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const {state: {isLoading, isError, data}, setUrl: fetchData} = useFetchData<RecipeRecommendationResponse>(
        EndPoints.buildAPIPath("/recommend-recipes", "/recipe-recommender",
            {
                ingredients: fridge.length > 0 ? fridge
                    .map(i => i.name.replace('\n', ' '))
                    .join(",") : '인기, 간단', size: 5
            }
        ), [], [fridge]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<undefined | string>(undefined);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                videoId ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CrossIconButton containerStyle={{marginRight: 16}} size={28}
                                         onPress={() => setVideoId(undefined)}/>
                    </View> :
                    <></>
            // <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //     <Search containerStyle={{marginRight: 16}} size={28}
            //             onPressHandler={() => setIsSearching(true)}/>
            // </View>
        });
    }, [videoId, navigation]);

    if (isLoading) {
        return <Loading/>
    } else {
        // TODO: refactoring
        const recipeHits: Array<RecipeHit<Recipe>> = sourceToRecipe(data as RecipeRecommendationResponse)

        return (
            <View style={styles.container}>
                {!videoId ?
                    <ScrollView style={{backgroundColor: "#f2f2f2"}}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing}
                                                    onRefresh={() => {
                                                        setRefreshing(true)
                                                        setRefreshing(false)
                                                    }}
                                    />}>
                        {
                            recipeHits.map((recipe: any, k: number) => {
                                return (<RecipeCard key={k} recipeHit={recipe}
                                                    onPress={() => setVideoId(recipe.info.external_id)}/>)
                            })
                        }
                    </ScrollView> :
                    <WebView
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        source={{uri: `https://m.youtube.com/watch?v=${videoId}`}}
                    />}
            </View>
        );
    }
}

// 16:9
const videoHeight = Layout.window.width * 9 / 16

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
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

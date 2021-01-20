import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
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
import {buildRecipeRecommendationEndPoint} from "../../services/homebab/recipeRecommendation";

export default function ListRecipes() {
    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const {state: {isLoading, isError, data}, setUrl: fetchData} = useFetchData<RecipeRecommendationResponse>(
        buildRecipeRecommendationEndPoint(fridge), []);

    useEffect(() => {
        fetchData(buildRecipeRecommendationEndPoint(fridge))
    }, [fridge]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<undefined | string>(undefined);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                videoUrl ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CrossIconButton containerStyle={{marginRight: 16}} size={28}
                                         onPress={() => setVideoUrl(undefined)}/>
                    </View> :
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Search containerStyle={{marginRight: 16}}
                                onPress={() => setVideoUrl("https://m.youtube.com")}/>
                    </View>
        });
    }, [videoUrl, navigation]);

    if (isLoading) {
        return <Loading/>
    } else {
        // TODO: refactoring
        const recipeHits: Array<RecipeHit<Recipe>> = sourceToRecipe(data as RecipeRecommendationResponse)

        return (
            <View style={styles.container}>
                {!videoUrl ?
                    <ScrollView style={{backgroundColor: "#f2f2f2"}}>
                        {
                            recipeHits.map((recipe: RecipeHit<Recipe>, k: number) => {
                                return (<RecipeCard key={k} recipeHit={recipe}
                                                    onPress={() => setVideoUrl(`https://m.youtube.com/watch?v=${recipe._source.videoId}`)}/>)
                            })
                        }
                    </ScrollView> :
                    <WebView
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        source={{uri: videoUrl}}
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

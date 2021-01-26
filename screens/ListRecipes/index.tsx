import * as React from 'react';
import {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import Layout from "../../constants/Layout";
import RecipeCard from "../../components/RecipeCard";
import useFetchData from "../../hooks/useFetchData";
import {useContainerContext} from "../../contexts/Container";
import Loading from "../../components/Loading";
import WebView from 'react-native-webview';
import CrossIconButton from "../../components/CrossIconButton";
import Search from "../../components/Search";
import {useNavigation} from "@react-navigation/native";
import {Recipe, RecipeHit, RecipeRecommendationResponse, sourceToRecipe} from "../../types/Recipe";
import {buildRecipeRecommendationEndPoint} from "../../services/homebab/recipeRecommendation";
import {styles as navigatorStyle} from "../../navigators/styles"
import Grid from "../../components/Grid";
import {isTablet} from "../../utils/responsive";

export default function ListRecipes() {
    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const {state: {isLoading, isError, data}, setUrl: fetchData} = useFetchData<RecipeRecommendationResponse>(
        buildRecipeRecommendationEndPoint(fridge, isTablet ? 12 : 5), []);

    const recipes: Array<Recipe> = useMemo( () =>
        sourceToRecipe(data as RecipeRecommendationResponse ?? []), [data]);

    useEffect(() => {
        fetchData(buildRecipeRecommendationEndPoint(fridge, isTablet ? 12 : 5))
    }, [fridge]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<undefined | string>(undefined);
    const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                videoUrl ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CrossIconButton containerStyle={[navigatorStyle.headerIcon, {marginRight: 16}]} size={28}
                                         onPress={() => {
                                             setVideoUrl(undefined);
                                             setIsOpenVideo(false);
                                         }}/>
                    </View> :
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Search containerStyle={[navigatorStyle.headerIcon, {marginRight: 16}]}
                                onPress={() => {
                                    Linking.openURL("https://m.youtube.com");
                                    // setVideoUrl("https://m.youtube.com");
                                    // setIsOpenVideo(true);
                                }}/>
                    </View>
        });
    }, [videoUrl, navigation]);

    const recipeCards = recipes
            .map((recipe: Recipe, k: number) =>
                <RecipeCard key={k} recipe={recipe}
                            onPress={() => {
                                Linking.openURL(`https://m.youtube.com/watch?v=${recipe.videoId}`);
                                // setVideoUrl(`https://m.youtube.com/watch?v=${recipe.videoId}`);
                                // setIsOpenVideo(true)
                            }} containerStyle={{backgroundColor: '#f2f2f2'}}/>
    )

    if (isLoading) {
        return <Loading/>
    } else {
        return (
            <View style={styles.container}>
                {!isOpenVideo ?
                    <ScrollView style={{backgroundColor: "#f2f2f2"}}>
                        {
                            isTablet ?
                                <Grid container={recipeCards} chunkSize={3} itemStyle={{flex: 1, padding: 8}}/> :
                                recipeCards
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

import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Linking, RefreshControl, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import CrossIconButton from "../../components/CrossIconButton";
import Grid from "../../components/Grid";
import Loading from "../../components/Loading";
import RecipeCard from "../../components/RecipeCard";
import Search from "../../components/Search";
import Layout from "../../constants/Layout";
import { useContainerContext } from "../../contexts/Container";
import useFetchData from "../../hooks/useFetchData";
import { styles as navigatorStyle } from "../../navigators/styles";
import { buildRecipeRecommendationEndPoint } from "../../services/homebab/recipeRecommendation";
import { Recipe, RecipeRecommendationResponse, sourceToRecipe } from "../../types/Recipe";
import { isTablet } from "../../utils/responsive";

export default function ListRecipes() {
    const { containerState } = useContainerContext();
    const { fridge } = containerState;

    const endpoint = buildRecipeRecommendationEndPoint(fridge, isTablet ? 12 : 5);
    const { state: { isLoading, isError, data, page }, fetchData } = useFetchData<RecipeRecommendationResponse>(
        (endpoint(0)), [], [fridge]);

    const recipes: Array<Recipe> = useMemo(() =>
        sourceToRecipe(data as RecipeRecommendationResponse ?? []), [data]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("https://m.youtube.com");
    const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isOpenVideo ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CrossIconButton containerStyle={[navigatorStyle.headerIcon, { marginRight: 16 }]} size={28}
                            onPress={() => {
                                setVideoUrl("https://m.youtube.com");
                                setIsOpenVideo(false);
                            }} />
                    </View> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Search containerStyle={[navigatorStyle.headerIcon, { marginRight: 16 }]}
                            onPress={() => {
                                Linking.openURL("https://m.youtube.com");
                                // setVideoUrl("https://m.youtube.com");
                                // setIsOpenVideo(true);
                            }} />
                    </View>
        });
    }, [videoUrl, navigation]);

    const renderItem = ({ item }: { item: Recipe }) => {
        return (
            <RecipeCard recipe={item}
                onPress={() => {
                    Linking.openURL(`https://m.youtube.com/watch?v=${item.videoId}`);
                    // setVideoUrl(`https://m.youtube.com/watch?v=${recipe.videoId}`);
                    // setIsOpenVideo(true)
                }} containerStyle={isTablet ? { backgroundColor: '#f2f2f2' } : { backgroundColor: 'white', marginBottom: '4%' }} />
        )
    };

    if (false) {
        return <Loading />
    } else {
        return (
            <View style={styles.container}>
                {!isOpenVideo ?
                    isTablet ?
                        <Grid
                            data={recipes} renderItem={renderItem} chunkSize={3} itemStyle={{ flex: 1, padding: 8 }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                                setRefreshing(true);
                                fetchData(endpoint(page)).then(_ => setRefreshing(false));
                            }} />}
                        /> :
                        <FlatList
                            keyExtractor={(_, index) => index.toString()}
                            data={recipes} renderItem={renderItem}
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                fetchData(endpoint(page)).then(_ => setRefreshing(false));
                            }}
                        /> :
                    <WebView
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        source={{ uri: videoUrl }}
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

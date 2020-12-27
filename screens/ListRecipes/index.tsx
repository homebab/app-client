import * as React from 'react';
import {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from "../../constants/Layout";
import Mocks from "../../constants/Mocks";
import RecipeCard from "../../components/RecipeCard";
import useFetchData from "../../hooks/useFetchData";
import {EndPoints} from "../../constants/Endpoints";
import {useContainerContext} from "../../contexts/Container";
import {ActivityIndicator} from "react-native-paper";
import RelativeCenterLayout from "../../Layouts/RelativeCenterLayout";

export default function ListRecipes() {
    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const {isLoading, isError, data} = useFetchData<any>(
        EndPoints.buildAPIPath("/recommend-recipes", "/omtm/recipe-recommender",
            {ingredients: Array.from(fridge.values()).map(i => i.name).join(","), size: 5}), null
    );

    const [refreshing, setRefreshing] = useState<boolean>(false);

    // Not constant, fetch api
    const videoIds = Mocks.SearchedRecipesInfo.kimchi;

    // useEffect(() => {
    //     console.debug('[omtm]: test to record an event to AWS pinpoint');
    //     Analytics.record({
    //         name: 'PAGE_VIEW',
    //         attributes: {pageType: 'ListRecipes'}
    //     })
    //         .then(res => console.debug("[omtm]: success to record an event through AWS pinpoint with " + JSON.stringify(res)))
    //         .catch(err => console.warn("[omtm]: fail to record with " + err))
    // }, []);

    if (!data) {
        return <RelativeCenterLayout><ActivityIndicator/></RelativeCenterLayout>
    } else {

        // TODO: refactoring
        const recipes = data[0].hits.hits
            .map(r => ({
                id: r._id,
                score: r._score,
                info: r._source
            }));
        console.log(recipes[0].info.thumbnails)

        return (
            <View style={styles.container}>
                <ScrollView style={{backgroundColor: "#f2f2f2"}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        setRefreshing(true)
                                        console.log(data)
                                        setRefreshing(false)
                                    }}
                                />
                            }
                >
                    {recipes.map((recipe, key) => {
                        return (<RecipeCard key={key} recipe={recipe}/>)
                    })}
                </ScrollView>
                {/*<MaterialCommunityIcons name="chef-hat" size={100} color="black"/>*/}
                {/*<Text style={{marginTop: 8, fontSize: 28}}>Coming Soon</Text>*/}
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

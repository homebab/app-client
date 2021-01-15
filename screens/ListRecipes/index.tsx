import * as React from 'react';
import {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from "../../constants/Layout";
import RecipeCard from "../../components/RecipeCard";
import useFetchData from "../../hooks/useFetchData";
import {EndPoints} from "../../constants/Endpoints";
import {useContainerContext} from "../../contexts/Container";
import {ActivityIndicator} from "react-native-paper";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import Loading from "../../components/Loading";

export default function ListRecipes() {
    const {containerState} = useContainerContext();
    const {fridge} = containerState;
    const {isLoading, isError, data} = useFetchData<any>(
        EndPoints.buildAPIPath("/recommend-recipes", "/omtm/recipe-recommender",
            {
                ingredients: fridge.length > 0 ? fridge
                    .map(i => i.name.replace('\n', ' '))
                    .join(",") : '인기, 간단', size: 5
            }
        ), null
    );

    const [refreshing, setRefreshing] = useState<boolean>(false);

    // useEffect(() => {
    //     console.debug('[HOMEBAB]: test to record an event to AWS pinpoint');
    //     Analytics.record({
    //         name: 'PAGE_VIEW',
    //         attributes: {pageType: 'ListRecipes'}
    //     })
    //         .then(res => console.debug("[HOMEBAB]: success to record an event through AWS pinpoint with " + JSON.stringify(res)))
    //         .catch(err => console.warn("[HOMEBAB]: fail to record with " + err))
    // }, []);

    if (isLoading) {
        return <Loading/>
    } else {

        // TODO: refactoring
        const recipes = data[0].hits.hits
            .map(r => ({
                id: r._id,
                score: r._score,
                info: r._source
            }));
        // console.log(recipes[0].info.thumbnails)

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

import {Image, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import Layout from "../../constants/Layout";
import {Entypo, EvilIcons} from "@expo/vector-icons";
import {YOUTUBE_API_KEY} from "react-native-dotenv";
import {Recipe, RecipeHit} from "../../types/Recipe";
import {EndPoints} from "../../constants/Endpoints";

const RecipeHeader = ({title}: {title: string}) => {
    return (
        <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12}}>
            <View style={{marginBottom: 12, flexDirection: "row", alignItems: "center"}}>
                <View style={{
                    flex: 1, aspectRatio: 1, alignItems: "center", justifyContent: "center",
                    padding: 4, borderWidth: 1, borderColor: "#dbdbdb", borderRadius: 100
                }}>
                    <Entypo name="youtube" size={24} color="#FF0000"/>
                </View>
                <View style={{flex: 11, marginLeft: 12, marginRight: 12}}>
                    <Text style={{fontWeight: "bold", fontSize: 16}}>{title}</Text>
                </View>
                {/*<Entypo name="dots-three-vertical" size={16} color="#444444" />*/}
            </View>


            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View style={{width: "60%", flexDirection: "row", alignItems: "center"}}>
                    {
                        ['유튜브', '초간단레시피', '가성비'].slice(0, 3).map((tag: any, key) => (
                            <View key={key}>
                                <Text>#{tag}</Text>
                            </View>
                        ))
                    }
                </View>

                {/*<View style={{position: "absolute", right: 0, flexDirection: "row", alignItems: "center"}}>*/}
                {/*    <View style={{marginRight: 12}}>*/}
                {/*        <EvilIcons name="heart" size={28} color="#bfbfbf"/>*/}
                {/*    </View>*/}
                {/*    <View style={{marginRight: 12}}>*/}
                {/*        <EvilIcons name="share-apple" size={28} color="#bfbfbf"/>*/}
                {/*    </View>*/}
                {/*    <View>*/}
                {/*        <EvilIcons name="sc-youtube" size={28} color="#bfbfbf"/>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
        </View>
    )
}

type Props = {
    recipeHit: RecipeHit<Recipe>,
    onPress: () => void,
}

const RecipeCard = (props: Props) => {
    const {recipeHit, onPress} = props
    const {_source} = recipeHit
    const {kind, videoId, publishedAt, publisher, title, description, thumbnails} = _source

    const [validUrl, setValidUrl] = useState(true);
    const imageUrl = thumbnails.standard.url;

    // 16:9
    const videoHeight = Layout.window.width * 9 / 16;

    if (validUrl) {
        return (
            <View style={{marginBottom: 12, borderTopWidth: 0.1, borderColor: '#ababab', backgroundColor: "#fffdfb"}}>
                <RecipeHeader title={_source.title}/>

                <View>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={{uri: imageUrl}}
                               style={{width: "100%", resizeMode: "cover", aspectRatio: 16 / 9}}/>
                    </TouchableOpacity>
                </View>

            </View>
            // <View>
            //     {/*<EmbedVideo id={id} height={videoHeight}/>*/}
            //     <Image style={{height: videoHeight, width: '100%'}} onError={() => setValidUrl(false)} source={{uri: imageUrl}}/>
            //     <View style={{padding: 4, height: videoHeight / 8, justifyContent: 'space-between', alignItems: 'center', flexDirection:'row'}}>
            //         {/*<Text style={{}}>매칭 정보</Text>*/}
            //         {/*<MaterialCommunityIcons name="file-document-box-search-outline" size={32} color="black" />*/}
            //     </View>
            // </View>
        );
    } else return (<></>)

};

export default RecipeCard;
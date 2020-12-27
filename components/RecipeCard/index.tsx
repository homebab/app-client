import {Image, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import Layout from "../../constants/Layout";
import {useState} from "react";
import EmbedVideo from "../EmbedVideo";

type Props = {
    recipe: any
}

const RecipeCard = (props: Props) => {
    const {recipe} = props

    const [validUrl, setValidUrl] = useState(true);
    const imageUrl = recipe.info.thumbnails.standard.url;
    console.log(imageUrl)

    // 16:9
    const videoHeight = Layout.window.width * 9 / 16;

    if (validUrl) {
        return (
            <View>
                {/*<EmbedVideo id={id} height={videoHeight}/>*/}
                <Image style={{height: videoHeight, width: '100%'}} onError={() => setValidUrl(false)} source={{uri: imageUrl}}/>
                <View style={{padding: 20, height: videoHeight / 5, justifyContent: 'space-between', alignItems: 'center', flexDirection:'row'}}>
                    {/*<Text style={{}}>매칭 정보</Text>*/}
                    {/*<MaterialCommunityIcons name="file-document-box-search-outline" size={32} color="black" />*/}
                </View>
            </View>
        );
    } else return (<></>)

};

export default RecipeCard;
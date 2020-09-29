import {Image, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import Layout from "../../constants/Layout";
import {useState} from "react";

type Props = {
    id: string
}

const RecipeCard = (props: Props) => {
    const {id} = props

    const [validUrl, setValidUrl] = useState(true);
    const imageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

    // 16:9
    const videoHeight = Layout.window.width * 9 / 16;

    if (validUrl) {
        return (
            <View>
                {/*<EmbedVideo id={id} height={videoHeight}/>*/}
                <Image style={{height: videoHeight, width: '100%'}} onError={() => setValidUrl(false)} source={{uri: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`}}/>
                <View style={{height: videoHeight / 3, justifyContent: 'space-around', alignItems: 'center', flexDirection:'row'}}>
                    <Text>식자재 레시피 매칭 정보</Text>
                    <MaterialCommunityIcons name="file-document-box-search-outline" size={32} color="black" />
                </View>
            </View>
        );
    } else return (<></>)

};

export default RecipeCard;
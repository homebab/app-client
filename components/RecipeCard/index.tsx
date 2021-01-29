import { Entypo } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Assets from "../../constants/Assets";
import Layout from "../../constants/Layout";
import { Recipe } from "../../types/Recipe";

const RecipeHeader = ({ title, publisher }: { title: string, publisher: string }) => {
    return (
        <View style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }}>
            <View style={{ marginBottom: 12, flexDirection: "row", alignItems: "center" }}>
                <View style={{
                    flex: 1, aspectRatio: 1, alignItems: "center", justifyContent: "center",
                    padding: 4, borderWidth: 1, borderColor: "#dbdbdb", borderRadius: 100, backgroundColor: 'white'
                }}>
                    <Entypo name="youtube" size={24} color="#FF0000" />
                </View>
                <View style={{ flex: 11, marginLeft: 12, marginRight: 12 }}>
                    <Text
                        style={{ fontWeight: "bold", fontSize: 16, fontFamily: 'nanum-square-round-bold' }}>{title}</Text>
                </View>
                {/*<Entypo name="dots-three-vertical" size={16} color="#444444" />*/}
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ width: "60%", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontFamily: 'nanum-square-round' }}>{publisher}</Text>
                </View>

                {/*<View style={{width: "60%", flexDirection: "row", alignItems: "center"}}>*/}
                {/*    {*/}
                {/*        tags.concat(['가성비레시피']).slice(0, 3).map((tag: any, key) => (*/}
                {/*            <View key={key}>*/}
                {/*                <Text style={{fontFamily: 'nanum-square-round'}}>#{tag}</Text>*/}
                {/*            </View>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</View>*/}

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
    recipe: Recipe,
    onPress: () => void,
    containerStyle?: StyleProp<ViewStyle>,
}

const RecipeCard = (props: Props) => {
    const { recipe, onPress, containerStyle } = props
    const { kind, videoId, publishedAt, publisher, title, description, thumbnails } = recipe

    const [validUrl, setValidUrl] = useState(true);
    const imageUrl = thumbnails.medium?.url
        ?? thumbnails.standard?.url
        ?? thumbnails.default?.url;

    // 16:9
    const videoHeight = Layout.window.width * 9 / 16;

    if (validUrl) {
        return (
            <View style={[{
                flex: 1, backgroundColor: "#fffdfb",
                borderTopWidth: 0.1, borderColor: '#ababab'
            }, containerStyle]}>
                <RecipeHeader title={title.length > 40 ? title.slice(0, 38) + '...' : title} publisher={[publisher]} />

                <View>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={imageUrl ? { uri: imageUrl } : Assets.Image.logo}
                            style={{ width: "100%", resizeMode: "cover", aspectRatio: 16 / 9 }} />
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
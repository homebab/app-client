import {Image, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import Layout from "../../constants/Layout";
import {Entypo, EvilIcons} from "@expo/vector-icons";

type Props = {
    recipe: any
}

const RecipeCard = (props: Props) => {
    const {score, info} = props.recipe

    const [validUrl, setValidUrl] = useState(true);
    const imageUrl = info.thumbnails.standard.url;
    // console.log(imageUrl)

    // 16:9
    const videoHeight = Layout.window.width * 9 / 16;

    if (validUrl) {
        return (
            <View style={{/* marginBottom:16, */ marginBottom: 12, borderTopWidth: 0.1, borderColor: '#ababab', backgroundColor: "#fffdfb"}}>
                <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12}}>
                    <View style={{marginBottom: 12, flexDirection: "row", alignItems: "center"}}>
                        <View style={{
                            flex: 1,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderColor: "#dbdbdb",
                            padding: 4,
                            borderRadius: 100
                        }}>
                            <Entypo name="youtube" size={24} color="#FF0000"/>
                            {/*<Image style={{height: "100%", aspectRatio: 1, resizeMode: "cover", borderRadius: 100}}*/}
                            {/*       source={{uri: "https://fm-foodpicturebucket.s3.ap-northeast-2.amazonaws.com/frontend/users/cat03.jpg"}}/>*/}
                        </View>
                        <View style={{flex: 11, marginLeft: 12, marginRight: 12}}>
                            <Text style={{fontWeight: "bold", fontSize: 16}}>{info.title}</Text>
                            <View style={{
                                flexDirection: "row",
                                alignContent: "center" /*,  justifyContent:"space-between" */
                            }}>

                            </View>
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

                        <View style={{position: "absolute", right: 0, flexDirection: "row", alignItems: "center"}}>
                            <View style={{marginRight: 12}}>
                                <EvilIcons name="heart" size={28} color="#bfbfbf"/>
                            </View>
                            <View style={{marginRight: 12}}>
                                <EvilIcons name="share-apple" size={28} color="#bfbfbf"/>
                            </View>
                            <View>
                                <EvilIcons name="sc-youtube" size={28} color="#bfbfbf"/>
                            </View>
                        </View>
                    </View>
                </View>


                <View>
                    <TouchableOpacity onPress={() => {
                    }}>
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
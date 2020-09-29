import {View} from "../Themed";
import {WebView} from "react-native-webview";
import * as React from "react";

type Props = {
    id: string
    height: number,
}

const EmbedVideo = (props: Props) => {
    const {id, height} = props;

    return (
        <View style={{
            width: "100%",
            height: height
        }}>
            <WebView
                javaScriptEnabled={true}
                allowsFullscreenVideo={true}
                source={{uri: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=1&controls=1`}}
            />
        </View>
    )
};


export default EmbedVideo;
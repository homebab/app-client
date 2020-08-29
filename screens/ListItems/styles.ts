import {StyleSheet, TextStyle, ViewStyle, ImageStyle} from "react-native";



const container: ViewStyle = {
    flex: 1,
};

const advertiseContainer: ViewStyle = {
    width: "100%",
    aspectRatio: 2.5,
    backgroundColor: "skyblue"
}

const advertiseImage: ImageStyle = {
    flex:1,
    resizeMode: 'cover',
    width: '100%',
}

const addButton: ViewStyle = {
    position: "absolute",
    padding: 20,
    borderRadius: 50,
    bottom: 36,
    right: 28,
    backgroundColor: "black"
}

export const styles = StyleSheet.create({
    container,
    advertiseContainer,
    advertiseImage,
    addButton
});

import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    advertiseContainer: {
        width: "100%",
        aspectRatio: 2.5,
        backgroundColor: "skyblue"
    },
    advertiseImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
    },
    addButton: {
        position: "absolute",
        padding: 20,
        borderRadius: 50,
        bottom: 36,
        right: 28,
        backgroundColor: "black"
    },
    storageMenu: {
        alignSelf: 'center',
        width: "80%",
        backgroundColor: "white",
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: "space-around",
    }
});

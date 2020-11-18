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
    storageMenu: {
        alignSelf: 'center',
        width: "80%",
        backgroundColor: "white",
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    plusButton: {
        position: "absolute",
        padding: 16,
        borderRadius: 50,
        bottom: '8%',
        right: '10%',
        backgroundColor: 'black'
    }
});

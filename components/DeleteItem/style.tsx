import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: "center"
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        paddingTop: 30,
        paddingBottom: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    modalText: {
        // alignSelf: 'center',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalFooter: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: 4
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 18,
        paddingRight: 18
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '100',
        textAlign: "center"
    }
});
import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: "center", alignItems: 'center', justifyContent: 'center',
        margin: 4, flexDirection: "row", width: '100%', borderWidth: 1, borderColor: 'rgba(208,200,192,0.5)'
    },
    disabled: {
        color: 'gray'
    }
})


export default styles;
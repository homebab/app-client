import {StyleSheet, TextStyle, ViewStyle} from "react-native";

const container: ViewStyle = {
    flex: 1,
    backgroundColor: "#f2f2f2",
};

const headContainer: ViewStyle = {
    padding: 18,
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1.5,
    borderColor: "#e6e6e6"
}

const imageBox: ViewStyle = {
    flex: 3,
    aspectRatio: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
}

const cameraIconContainer: ViewStyle = {
    zIndex: -1,
    position: "absolute",
    right: -13,
    bottom: -13,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: "white",
    padding: 2,
    alignItems: "center",
    justifyContent: "center"
}

const cameraIconWrapper: ViewStyle = {
    borderRadius: 32,
    padding: 6,
    aspectRatio: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
}

const topTextInputBox: ViewStyle = {
    flex: 10/* , backgroundColor:"#f4f4f4" */,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18
}

const topTextInput: TextStyle = {
    fontSize: 26,
    borderColor: "#d9d9d9",
    paddingBottom: 4,
    paddingTop: 4,
    borderBottomWidth: 1,
    alignItems: "center"
}

const bottomContainer: ViewStyle = {
    alignItems: "center",
    backgroundColor: "white"
}

const bottomTextInputBox: ViewStyle = {
    flexDirection: 'row',
    width: "85%",
    borderColor: "#d9d9d9",
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    alignItems: "center"
}

const bottomTextInput: TextStyle = {
    flex: 1,
    fontSize: 26
}

const submitButton: ViewStyle = {
    width: "85%",
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#333333"
}

const submitText: TextStyle = {
    color: "white",
    fontSize: 20,
    padding: 16,
    alignSelf: "center"
}

export const styles = StyleSheet.create({
    container,
    headContainer,
    imageBox,
    cameraIconContainer,
    cameraIconWrapper,
    topTextInputBox,
    topTextInput,
    bottomContainer,
    bottomTextInputBox,
    bottomTextInput,
    submitButton,
    submitText
});

import {TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {styles} from "./styles";

type Props = {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void;
    onStartEditing?: () => void;
    onEndEditing: () => void;
    onFocus?: () => void;
    containerStyle?: ViewStyle;
}

const SearchBar = (props: Props) => {

    const {placeholder, value, onChangeText, onStartEditing, onEndEditing, onFocus, containerStyle} = props;
    const [editing, setEditing] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.text} placeholder={placeholder} value={value}
                           onChangeText={onChangeText}
                           onFocus={() => onFocus ? onFocus() : null}
                           onKeyPress={() => {
                               onStartEditing ? onStartEditing() : null;
                               setEditing(true);
                           }}/>
                {editing ?
                    <TouchableOpacity onPress={() => {
                        onEndEditing();
                        setEditing(false);
                    }}>
                        <Ionicons
                            name={"md-close"} style={styles.icon} color="gray"
                            // @ts-ignore, TODO: how to fix it without @ts-ignore
                            backgroundColor="transparent"
                        />
                    </TouchableOpacity> : <Ionicons
                        name="md-search" style={styles.icon} color="gray"
                        // @ts-ignore, TODO: how to fix it without @ts-ignore
                        backgroundColor="transparent"
                    />}
            </View>
        </View>
    )
}

export default SearchBar;
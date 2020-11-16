import {TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";

type Props = {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void;
    onStartEditing?: () => void;
    onEndEditing?: () => void;
    onFocus?: () => void;
    containerStyle?: ViewStyle;
}

const SearchBar = (props: Props) => {

    const {placeholder, value, onChangeText, onStartEditing, onEndEditing, onFocus, containerStyle} = props;
    const [editing, setEditing] = useState(false);

    return (
        <View style={[{backgroundColor: 'white', padding: 12, paddingLeft: 20, paddingRight: 20}, containerStyle]}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: '#f2f2f2',
                padding: 10,
                paddingLeft: 16,
                paddingRight: 16
            }}>
                <TextInput style={{fontSize: 16}} placeholder={placeholder} value={value}
                           onChangeText={onChangeText}
                           onFocus={() => onFocus ? onFocus() : null}
                           onKeyPress={() => {
                               onStartEditing ? onStartEditing() : null;
                               setEditing(true);
                           }}/>
                {editing ?
                    <TouchableOpacity onPress={onEndEditing}>
                        <Ionicons
                            name={"md-close"} size={18} color="gray"
                            // @ts-ignore, TODO: how to fix it without @ts-ignore
                            borderRadius={32} backgroundColor="transparent"
                        />
                    </TouchableOpacity> : <Ionicons
                        name="md-search" size={18} color="gray"
                        // @ts-ignore, TODO: how to fix it without @ts-ignore
                        borderRadius={32} backgroundColor="transparent"
                    />}
            </View>
        </View>
    )
}

export default SearchBar;
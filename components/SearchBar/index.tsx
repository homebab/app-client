import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const SearchBar = () => {

    return (
        <View style={{backgroundColor: 'white', padding: 12}}>
            <View style={{flexDirection: "row", justifyContent: "space-between",backgroundColor: '#f2f2f2', padding: 8, paddingLeft: 16, paddingRight: 16}}>
                <TextInput style={{fontSize: 16}} placeholder={"품목명을 검색하세요"}/>
                <Ionicons
                    name="md-search"
                    size={16}
                    color="black"
                    // @ts-ignore, TODO: how to fix it without @ts-ignore
                    borderRadius={32}
                    backgroundColor="transparent"
                    // iconStyle={{marginRight: 4, marginLeft: 4}}
                />
            </View>
        </View>
    )
}

export default SearchBar;
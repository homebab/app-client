import React, {useState} from "react";
import SearchBar from "../../components/SearchBar";
import {Item} from "../../contexts/Container";
import {View} from "react-native";



const SearchItems = () => {

    const [searchWord, setSearchWord] = useState('');
    // const [visible, setVisible] = useState(false);

    return (
        <View style={{flex: 1}}>
            <SearchBar
                placeholder={"식품명을 직접 입력해주세요."}
                value={searchWord}
                onChangeText={text => setSearchWord(text)}
                // onStartEditing={() => setVisible(true)}
                // onEndEditing={() => setVisible(false)}
            />
        </View>
    )
}

export default SearchItems;
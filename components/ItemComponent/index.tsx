
import {Image, View, Text} from "react-native";
import React from 'react';
import { Item } from "../../contexts/Account";

type Props = {
    item: Item,
}

// TODO: class -> function
export default class ItemComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        
    }
    render() {
        return (
            <View style={{padding:18, width:"100%", flexDirection: "row", backgroundColor:"white", borderBottomWidth:1.5, borderColor:"#e6e6e6"}}>
              
                <View style={{flex:3, height:"100%", aspectRatio:1, backgroundColor:"black", alignItems: "center", justifyContent:"center",}}>
                    {!(this.props.item.url == '') && <Image source={{uri: this.props.item.url}} style={{height: "100%", resizeMode: "cover", aspectRatio: 1}}/>}
                </View>

                <View style={{flex:10, height:"100%" /* , backgroundColor:"pink" */, alignItems: "flex-start", marginLeft:18}}>
                    
                        <Text style={{fontSize:12, color:"#737373"}}>{this.props.item.expiredAt}</Text>
                        <Text style={{fontSize:16}}>{this.props.item.name}</Text>
                        <Text style={{position:"absolute",fontSize:12, bottom:0, color:"#737373"}}>{this.props.item.memo}</Text>
                        <View style={{backgroundColor:"#f2f2f2" , padding: 1, position:"absolute", right:0, top:0}}>
                            <Text style={{fontSize:12, color:"#737373"}}>{this.props.item.category}</Text>
                        </View>
                </View>

            </View>
        );
    }
}

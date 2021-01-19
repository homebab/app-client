import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, DataStore, Hub} from 'aws-amplify';
import SignIn from '../../components/SignIn';
import {MyCognitoUser} from "../../services/aws/cognito";


const Landing = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>
            <SignIn/>
        </View>
    );
};

export default Landing;


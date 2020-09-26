import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, Hub} from 'aws-amplify';
import SignIn from '../../components/SignIn';


const Landing = () => {

    // const navigation = useNavigation();
    // const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    useEffect(() => {
        Hub.listen("auth", ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    accountDispatch({
                        type: 'setAccount',
                        value: {
                            cachedUser: data,
                            // profile: cachedUser,
                            // container: convertContainer(res as Array<Item>),
                            isAuthenticated: true
                        }
                    });
                    break;
                // case "signOut":
                // this.setState({ user: null });
                // break;
                // case "customOAuthState":
                //     this.setState({ customState: data });
            }
        });

        Auth.currentAuthenticatedUser()
            .then(res => {
                accountDispatch({
                    type: 'setAccount',
                    value: {
                        cachedUser: res,
                        // profile: cachedUser,
                        // container: convertContainer(res as Array<Item>),
                        isAuthenticated: true
                    }
                })
            })
            .catch(err => console.log(`[omtm]: ${err}`))

    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>
            <SignIn/>
        </View>
    );
};

export default Landing;


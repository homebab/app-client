import {useAccountContext} from "../contexts/Account";
import {useEffect} from "react";
import {Auth, Hub} from "aws-amplify";
import {MyCognitoUser} from "../services/aws/cognito";
import {HubCallback} from "@aws-amplify/core/src/Hub";

const useAccountAuthFlow = () => {
    const {accountState, accountDispatch} = useAccountContext();
    const {isAuthenticated} = accountState;

    const hubListener: HubCallback = async ({channel: channel, payload: {event, data}}) => {
        console.debug(`[AMPLIFY_HUB]: on channel '${channel}' listen event - ${event} with data - ${JSON.stringify(data).slice(0, 32)}`);
        switch (event) {
            case "signIn":
                const cognitoUser: MyCognitoUser = data;
                console.debug("[HOMEBAB]: success to signIn for", cognitoUser.getUsername());

                accountDispatch({
                    type: 'SET_ACCOUNT',
                    account: {
                        cognitoUser: cognitoUser,
                        customAttributes: {
                            name: cognitoUser.getSignInUserSession()?.getIdToken().decodePayload()["custom:name"] ?? undefined,
                            image: cognitoUser.getSignInUserSession()?.getIdToken().decodePayload()["custom:image"] ?? undefined,
                        },
                        isAuthenticated: true,
                        alarm: {
                            manageIngredients: false,
                            recommendRecipes: false
                        }
                    }
                });
                break;
            case "signOut":
                accountDispatch({type: 'DEAUTHENTICATE'});
                console.debug("[HOMEBAB]: success to sign out");
        }
    }

    useEffect(() => {
        Hub.listen("auth", hubListener);

        // retrieve cachedUser
        Auth.currentAuthenticatedUser()
            .then((cachedUser: MyCognitoUser) => {
                console.debug("[HOMEBAB]: success to retrieve ", cachedUser.getUsername());

                accountDispatch({
                    type: 'SET_ACCOUNT',
                    account: {
                        cognitoUser: cachedUser,
                        customAttributes: {
                            name: cachedUser.getSignInUserSession()?.getIdToken().decodePayload()["custom:name"] ?? undefined,
                            image: cachedUser.getSignInUserSession()?.getIdToken().decodePayload()["custom:image"] ?? undefined,
                        },
                        isAuthenticated: true,
                        alarm: {
                            manageIngredients: false,
                            recommendRecipes: false
                        }
                    }
                });
            })
            .catch(err => console.debug(`[HOMEBAB]: ${err}`));
        return () => {
            Hub.remove('auth', hubListener);
            console.log('UNMOUNTED on Landing');
        }
    }, []);

    return isAuthenticated;
}

export default useAccountAuthFlow;
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";


type MyCognitoAttributes = { 'custom:name': string, 'custom:image': string }

export type MyCognitoUser = CognitoUser & { attributes: MyCognitoAttributes; }

export async function updateUser(name: string, image: string): Promise<MyCognitoAttributes> {
    const attributes: MyCognitoAttributes = {
        'custom:name': name,
        'custom:image': image
    }

    try {
        const user: MyCognitoUser = await Auth.currentAuthenticatedUser();
        const res: string = await Auth.updateUserAttributes(user, {
            'custom:name': name,
            'custom:image': image
        });

        console.debug('[HOMEBAB]: success to update userAttributes with ', res)
    } catch (err) {
        console.debug('[HOMEBAB]: fail to update userAttributes with ', err)
    }

    return attributes
}

export async function getUserAttributes() {
    const user: MyCognitoUser = await Auth.currentAuthenticatedUser();
    return user.attributes;
}
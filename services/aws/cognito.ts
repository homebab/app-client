import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Alarm, CustomAttributes, initialAlarm } from "../../contexts/Account";


export type CognitoCustomAttributes = { 'custom:name'?: string, 'custom:image'?: string, 'custom:alarm'?: string }

export type MyCognitoUser = CognitoUser & { attributes: CognitoCustomAttributes; }

export async function updateCustomAttributes(attributes: CognitoCustomAttributes): Promise<CognitoCustomAttributes> {
    try {
        const user: MyCognitoUser = await Auth.currentAuthenticatedUser();
        const res: string = await Auth.updateUserAttributes(user, attributes);

        console.debug('[HOMEBAB]: success to update userAttributes with ', res);
        return attributes
    } catch (err) {
        console.debug('[HOMEBAB]: fail to update userAttributes with ', err);
        throw Error;
    }
}

export function getCustomAttributes(cognitoUser: MyCognitoUser): CustomAttributes {
    const idToken = cognitoUser.getSignInUserSession()?.getIdToken().decodePayload();
    const [name, image, alarm] = idToken ? [
        idToken["custom:name"],
        idToken["custom:image"],
        idToken["custom:alarm"] ? JSON.parse(idToken["custom:alarm"]) : initialAlarm
    ] : Array(3).fill(undefined);
    return { name, image, alarm }
}
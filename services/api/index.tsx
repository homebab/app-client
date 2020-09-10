import {EndPoints} from "../../constants/Endpoints";
import {Account, Profile} from "../../contexts/Account";


export const createUser = (userProfile: Profile) => {
    const {name, email} = userProfile;

    fetch(EndPoints.buildAPIPath('/users'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + seller.cognitoId
        },
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then(res => console.log(`[omtm]: fetch api to App Server and result is ${JSON.stringify(res)}`));
};
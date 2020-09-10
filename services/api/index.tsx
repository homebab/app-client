import {EndPoints} from "../../constants/Endpoints";
import {Profile} from "../../contexts/Account";


export const createUser = async (userProfile: Profile) => {
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
    })
        .then(res => res.json())
        .then(res => {
            console.debug(`[omtm]: response from Omtm Server is ${res}`);
            console.debug(`[omtm]: response from Omtm Server is ${JSON.stringify(res)}`);
            if (res.status === "500")
                console.warn(`[omtm]: response status 500 with ${res.message}`);
            else {
                return res
            }
        })
        .catch(err => console.warn(`[omtm]: fail to fetch api with ${err}`));
};

export const getUserItems = () => {

}
import {EndPoints} from "../../constants/Endpoints";

export const createUser = async (name: string, email: string, imageUrl?: string) => await new Promise((resolve, reject) => {
    // const {name, email} = userProfile;

    fetch(EndPoints.buildAPIPath('/users'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + seller.cognitoId
        },
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            image_url: imageUrl
        })
    })
        .then(res => res.json())
        .then(res => {
            console.debug(`[omtm]: response from Omtm Server is ${JSON.stringify(res)}`);
            if (res.status === 500)
                console.warn(`[omtm]: response status 500 with ${res.message}`);
            else {
                // res will be number that represent a PK on RDB
                resolve(res);
            }
        })
        .catch(err => {
            console.warn(`[omtm]: fail to fetch api with ${err}`);
            reject(err);
        });
});

export const getUserItems = () => {

}
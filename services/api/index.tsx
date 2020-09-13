import {EndPoints} from "../../constants/Endpoints";
import {handleHttpStatus} from './HttpStatus';

// type Response = {
//     status: HttpStatus,
//     message: string,
//     data: Object
// }

export const createUser = async (name: string, email: string, imageUrl?: string) => await new Promise((resolve, reject) => {

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
            imageUrl: imageUrl
        })
    })
        .then(handleHttpStatus)
        .then(res => {
            if (typeof(res) === "string")
                throw Error(res)
            else resolve(res);
        })
        .catch(err => {
            console.warn(`[omtm]: fail to fetch POST api to Omtm Server with ${err}`);
            reject(err);
        });
});

export const retrieveUser = async (email: string) => await new Promise((resolve, reject) => {
    // TODO: is it necessary?

    fetch(EndPoints.buildAPIPath(`/users?email=${email}`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + seller.cognitoId
        },
        method: 'GET'
    })
        .then(handleHttpStatus)
        .then(resolve)
        .catch(reject)
});

export const getUserItems = () => {

}
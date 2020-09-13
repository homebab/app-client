import {EndPoints} from "../../constants/Endpoints";
import {handleHttpStatus} from './HttpStatus';
import {Item, Storage} from "../../contexts/Account";

// type Response = {
//     status: HttpStatus,
//     message: string,
//     data: Object
// }

export const createUser = (name: string, email: string, imageUrl?: string) => new Promise((resolve, reject) => {

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
            if (typeof (res) === "string")
                throw Error(res)
            else resolve(res);
        })
        .catch(err => {
            console.warn(`[omtm]: fail to fetch POST api to Omtm Server with ${err}`);
            reject(err);
        });

});

export type UserResponse = {
    id: number,
    email: string,
    name: string,
    age: number,
    gender: string,
    imageUrl: string,
    active: boolean,    // 휴먼 상태 유무
    userItems: Array<Item>
}

export const retrieveUser = (email: string) => new Promise((resolve, reject) => {
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
        .then((res) => {
            if (typeof (res) === "string")
                throw Error(res)
            console.debug(`[omtm]: retrieve user data, ${JSON.stringify(res)}`)
            resolve(res);
        })
        .catch(reject)
});


export const addUserItem = (userId: number, name: string, expiredAt: Date, storage: Storage, tag: string, memo: string, imageUrl?: string) => new Promise((resolve, reject) => {

    fetch(EndPoints.buildAPIPath(`/items/${userId}`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            name: name,
            expiredAt: expiredAt,
            storage: storage,
            tag: tag,
            memo: memo,
            imageUrl: imageUrl
        })
    })
        .then(handleHttpStatus)
        .then(res => {
            if (typeof (res) === "string")
                throw Error(res)
            else resolve(res);
        })
        .catch(err => {
            console.warn(`[omtm]: fail to fetch POST api to Omtm Server with ${err}`);
            reject(err);
        });
})


export const getUserItems = (userId: number) => new Promise((resolve, reject) => {

    fetch(EndPoints.buildAPIPath(`/items/${userId}`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'GET'
    })
        .then(handleHttpStatus)
        .then((res) => {
            if (typeof (res) === "string")
                throw Error(res)
            console.debug(`[omtm]: retrieve user's items data, ${JSON.stringify(res)}`);
            resolve(res)
        })
        .catch(reject)
});


export const deleteUserItem = (itemId: number) => new Promise((resolve, reject) => {

    fetch(EndPoints.buildAPIPath(`/items/${itemId}`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'DELETE'
    })
        .then(handleHttpStatus)
        .then(res => {
            if (typeof (res) === "string")
                throw Error(res)
            resolve(res)
        })
        .catch(reject)
})
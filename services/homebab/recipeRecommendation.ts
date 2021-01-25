import {EndPoints} from "../../constants/Endpoints";
import {Item} from "../../contexts/Container";
import {handleHttpStatus} from "../HttpStatus";

const prefix = "/omtm/recipe-recommender"

export const recommendRecipes = (ingredients: string, size: number) => new Promise((resolve, reject) => {

    fetch(EndPoints.buildAPIPath('/recommend-recipes', prefix, {ingredients: ingredients, size: size}), {
        headers: {
            'Content-Type': 'application/ingredients.json',
            'Accept': 'application/ingredients.json',
            // 'Authorization': 'Bearer ' + seller.cognitoId
        },
        method: 'GET',
    })
        .then(handleHttpStatus)
        .then(res => {
            if (typeof (res) === "string")
                throw Error(res)
            console.debug('[HOMEBAB]: success to create user on Omtm Server with ' + res);
            resolve(res);
        })
        .catch(err => {
            console.warn(`[HOMEBAB]: fail to create user on Omtm Server with ${err}`);
            reject(err);
        });

});


export const buildRecipeRecommendationEndPoint = (fridge: Array<Item>, size?: number) => EndPoints.buildAPIPath("/recommend-recipes", "/recipe-recommender",
    {
        ingredients: fridge.length > 0 ? fridge
            .map(i => i.name.replace('\n', ' '))
            .join(",") : '인기, 간단',
        size: size ?? 5
    })
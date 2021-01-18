export interface Recipe {
    kind: string,
    videoId: string,
    publishedAt: Date,
    publisher: string,
    title: string,
    description: string,
    thumbnails: any,
}

export const sourceToRecipe: (res: RecipeRecommendationResponse) => Array<RecipeHit<Recipe>> = (res: RecipeRecommendationResponse) => res.map((r: RecipeHit<Source>) => {
    const {kind, external_id, published_at, publisher, title, description, thumbnails} = r._source;

    return {
        ...r,
        _source: {
            kind,
            videoId: external_id,
            publishedAt: new Date(published_at),
            publisher, title, description, thumbnails
        }
    }
})


interface Source {
    kind: string,
    external_id: string,
    published_at: string,
    publisher: string,
    title: string,
    description: string,
    thumbnails: any,
}

export interface RecipeHit<T> {
    _index: String,
    _type: String,
    _id: String,
    _score: Number,
    _source: T
}

export type RecipeRecommendationResponse = Array<RecipeHit<Source>>
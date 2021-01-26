interface YoutubeThumbnailImage {
    height: number,
    width: number,
    url: string
}

export interface Recipe {
    kind: string,
    videoId: string,
    publishedAt: Date,
    publisher: string,
    title: string,
    description: string,
    thumbnails: {
        default?: YoutubeThumbnailImage,
        medium?: YoutubeThumbnailImage,
        high?: YoutubeThumbnailImage,
        standard?: YoutubeThumbnailImage,
        maxres?: YoutubeThumbnailImage,
    },
}

export const sourceToRecipe: (res: RecipeRecommendationResponse) => Array<Recipe> = (res: RecipeRecommendationResponse) => res.map((r: RecipeHit<Source>) => {
    const {kind, external_id, published_at, publisher, title, description, thumbnails} = r._source;

    return {
            kind,
            videoId: external_id,
            publishedAt: new Date(published_at),
            publisher, title, description, thumbnails
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
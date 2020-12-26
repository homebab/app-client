

const SearchedRecipesInfo = {
    eggplant: ['kpeQCq4mIXs', 'yOuhrzhJnCM', 'n0H5n7lEIrY', 'S9Umssy6O9s'],
    kimchi: ['j9NXZh0gX3w', '2qhM8DM9I3I', 'yoSumzKzHqQ', 'lyxPlcVgQqg']
}

interface Ingredient {
    name: string,
    amount: string,
    owned: boolean
}

type YoutubeRecipe = {
    id: number,
    ingredients: Array<Ingredient>,
    steps: Array<string>
    imageUrl: string
}

const RecommendedRecipeVideos: Array<YoutubeRecipe> = [
    {
        id: 0,
        ingredients: [
            {name: '김치', amount: '반포기', owned: true}
        ],
        steps: [
            '1. 김치를 씻는다.',
            '2. 맛있게 먹는다.'
        ],
        imageUrl: ''
    }
]


export default {
    SearchedRecipesInfo
}
export interface Ingredients {
    categories: string[],
    storages: string[],
    채소: string[],
    과일: string[],
    육류: string[],
}

export const Ingredients: Ingredients = {
    categories: ["채소", "과일", "육류", "수산물", "양공", "견과", "조미료", "소스", "양념", "면류", "유제품", "김치/젓갈", "반찬", "인스턴트", "과자/제과", "기타"],
    storages: ["전체", "냉장", "냉동", "실온"],
    채소: ["가지", "감자", "건나물", "건버섯류", "고구마", "고사리", "고추", "곤드레", "깻잎"],
    과일: ["거봉", "건포토", "곶감", "귤"],
    육류: ["닭고기\n가슴살", "닭고기\n날개", "닭고기\n다리"]
}
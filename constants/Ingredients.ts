import { Item } from "../contexts/Container";
import Assets from "./Assets";

export interface Ingredients {
    채소: string[],
    과일: string[],
    육류: string[],
    수산물: string[],
    '곡물/견과류': string[],
    '양념/소스': string[],
    '가공/유제품': string[],
    기타: string[],
}

export const imageKeys = Object.keys(Assets.FoodImages)
export const getImageKey = (itemName: string) => imageKeys.filter(key => itemName.includes(key)).sort((a, b) => b.length - a.length)[0];

export const Ingredients: Ingredients = {
    채소: [
        // 잎채소
        "대파", "양배추", "브로콜리", "시금치", "다진파", "깻잎", "쪽파", "부추", "배추", "상추",
        "청경채", "양상추", "샐러드채소", "무청시래기", "미나리", "샐러리", "아스파라거스", "알배추", "쑥갓", "모듬쌈채소",
        "달래", "무순", "마늘쫑", "적채", "봄동", "토란대", "깻잎순", "아욱", "파슬리", "두릅",
        "어린잎채소", "새싹채소", "무청", "치커리", "죽순", "배추시래기", "신선초", "갓", "원추리", "로메인",
        "유채나물", "실파", "질경이", "근대", "머위대", "루꼴라", "방아잎", "열무", "케일", "연잎",
        "씀바귀", "메밀순", "방울양배추", "영양부추", "호박잎", "단배추", "비타민", "얼갈이배추", "보리순",

        // 열매채소
        "애호박", "청양고추", "오이", "파프리카", "홍고추", "가지", "풋고추", "피망", "아삭이고추", "블랙올리브",
        "꽈리고추", "단호박", "옥수수", "건고추", "늙은호박", "미니파프리카", "노각", "박", "여주", "호박꽃",
        "그린올리브", "쥬키니호박",

        // 뿌리채소
        "양파", "무", "감자", "당근", "다진마늘", "밤고구마", "마늘", "호박고구마", "다진생강", "생강",
        "연근", "마", "우엉", "토란", "알감자", "파뿌리", "콜라비", "자색고구마", "더덕", "도라지",
        "다진양파", "마늘대", "비트", "강황", "레디쉬", "무말랭이", "순무", "총각무", "야콘", "자색감자",
        "적양파",

        // 버섯
        "팽이버섯", "새송이버섯", "느타리버섯", "표고버섯", "건표고버섯", "양송이버섯", "미니새송이버섯", "목이버섯", "석이버섯", "애느타리버섯",
        "백만송이버섯", "참타리버섯", "노루궁뎅이버섯", "영지버섯", "잎새버섯", "황금팽이버섯", "만가닥버섯", "맛타리버섯", "송화버섯",

        // 나물/허블류
        "콩나물", "숙주", "고사리", "로즈마리", "명이나물", "고구마순", "바질", "파슬리", "냉이", "페퍼민트",
        "곤드레", "참나물", "세발나물", "방풍나물", "취나물", "돌나물", "가죽나물", "머위나물", "비름나물", "모듬나물",
        "고들빼기", "고춧잎", "쑥", "곰취", "타임"
    ],

    과일: [
        "사과", "귤", "바나나", "딸기", "배","블루베리", "키위", "단감", "토마토", "방울토마토",
        "곶감", "망고", "석류", "건포도", "파인애플", "크랜베리", "푸룬", "오렌지", "아보카도", "라임",
        "건블루베리", "청포도", "복분자", "한라봉", "자몽", "레몬", "건체리", "건사과", "자두", "살구",
        "미니토마토", "오디", "참외", "라즈베리", "산딸기", "건자두", "메론", "수박", "용과", "모듬건과일",
        "유자", "포도", "복숭아", "체리", "거봉", "홍시", "대추토마토", "건살구", "무화과", "천도복숭아",
        "건포도"
    ],

    육류: [
        // 소고기
        "소고기\n국거리용", "소고기\n구이용", "소고기\n불고기용", "소고기\n차돌박이", "소고기\n양지",
        "소고기\n안심", "소고기\n등심", "소고기\n샤브샤브용", "소고기\n육포", "소고기\n다짐육",
        "소고기\n우둔살", "소고기\n사골", "소고기\n사태", "소고기\n갈비", "소고기\n도가니",
        "소고기\n살치살", "소고기\n우족", "소고기\n장조림용", "소고기\n산적용", "소고기\n육회용",
        "소고기\n채끝살", "소 간","소고기\n홍두깨살", "소 곱창", "소 꼬리", "소고기\n부채살",

        // 돼지고기
        "돼지고기\n국거리용", "돼지고기\n구이용", "돼지고기\n삼겹살", "돼지고기\n다짐육", "돼지고기\n목심",
        "돼지고기\n앞다리살", "돈가스", "돼지고기\n장조림용", "돼지고기\n등갈비", "돼지고기\n수육용",
        "돼지 갈비", "돼지 곱창", "돼지고기\n돈가스용", "돼지고기\n뒷다리살", "돼지고기\n잡채용",
        "돼지고기\n훈제", "돼지고기\n항정살", "돼지고기\n육포", "돼지고기\n안심", "돼지고기\n갈매기살",
        "돼지 등뼈", "돼지고기\n갈비살", "돼지 잡뼈", "돼지 족발", "돼지 간",
        "돼지고기\n껍데기", "돼지고기\n샤브샤브용", "돼지고기\n등심",

        // 댥고기
        "닭고기\n가슴살", "닭고기\n볶음용", "닭고기\n안심", "닭날개", "닭고기\n훈제",
        "닭 한마리", "닭 다리", "닭 모래집", "닭 다리살", "닭 봉",
        "닭 발",

        // 기타
        "계란", "계란노른자", "계란흰자", "메추리알", "훈제오리",
        "오리 한마리", "오리 뼈", "오리 다짐"
    ],

    수산물: [
        // 생선
        "고등어", "오징어", "북어채", "삼치", "갈치", "가자미", "조기", "연어", "낙지", "북어포",
        "명태알", "병어", "임연수어", "훈제연어", "부세조기", "아귀", "미더덕", "코다리", "꽁치", "전어",
        "동태", "쭈꾸미", "솔치", "모듬생선알", "과메기", "명엽채", "문어", "날치알", "정어리", "명태포",
        "미꾸라지", "양미리", "가오리", "곤이", "오징어먹물", "옥돔", "잉어", "농어", "홍어애", "메로알",
        "복어", "망둥어", "숭어", "멍게알", "참치", "방어", "한치", "불볼락", "광어", "대구",
        "갑오징어", "장어", "풀치", "우럭", "명태", "붕어", "멍게", "굴비", "메기", "해삼",
        "실꼬리돔", "홍어", "은어", "꼴뚜기", "북어", "도미", "디포리", "적어", "민어", "참돔",
        "메로", "실치", "도다리", "도치", "해파리", "성게", "성게알", "빙어", "송어",

        // 조개/갑각류
        "새우", "칵테일새우", "건새우", "바지락", "바지락살", "굴", "꼬막", "홍합", "꽃게", "밥새우",
        "우렁", "전복", "보리새우", "대하", "골뱅이", "랍스타", "동죽", "모듬해물", "대게", "건홍합",
        "새조개", "맛조개", "소라", "백합", "오만둥이", "초밥용새우", "피조개", "대합", "민물새우", "모시조개",
        "올갱이", "재첩", "가리비", "맛조갯살", "관자", "다슬기",

        // 건어물
        "잔멸치", "국물멸치", "북어채", "중멸치", "황태채", "진미채", "북어포", "밥새우", "쥐포", "반건조오징어",
        "뱅어포", "오징어채", "황태", "명엽채", "북어머리", "노가리", "건해삼", "풀치", "북"
    ],

    '곡물/견과류': [
        // 견과류/특용작물
        "아몬드", "호두", "땅콩", "모듬견과류", "건대추", "은행", "잣", "밤", "아몬드\n슬라이스", "매실",
        "해바라기씨", "호박씨", "대추", "아몬드가루", "건오미자", "인삼", "피스타치오", "넛맥가루", "오미자", "캐슈넛",
        "모과", "피칸", "수삼", "호두가루", "치자", "땅콩가루", "황기",

        // 주/잡곡
        "쌀", "참깨", "현미", "검정콩", "찹쌀", "귀리", "모듬잡곡", "서리태", "팥", "수수",
        "찹쌀현미", "검은깨", "강낭콩", "완두콩", "햄프씨드", "차조", "기장", "녹두", "들깨", "병아리콩",
        "렌즈콩", "퀴노아", "오트밀", "팥고물", "쥐눈이콩", "청태", "메좁씰", "율무",

        // 밀/가루류
        "밀가루\n중력분", "부침가루", "튀김가루", "전분가루", "빵가루", "컵라면", "미숫가루", "핫케익가루", "찹쌀가루",
        "호떡믹스", "베이킹파우더", "콩가루", "밀가루\n박력분", "코코아가루", "감자가루", "코코넛롱", "쌀가루", "인스턴트\n이스트", "감자수제비가루",
        "한천", "보리싹가루", "호두과자믹수", "젤라틴", "쑥가루", "딸기가루", "메밀가루", "밀가루\n강력분", "연잎가루", "브라우니믹스",
        "옥수수가루", "쿠키믹스", "엿기름", "메쉬포테이토가루", "오미자가루", "블루베리파우더", "백련초가루", "치자가루", "마가루", "통밀가루",
        "자색고구마가루", "쌀가루\n강력분", "검은깨가루", "비스퀵", "아마란스", "코코넛가루", "단호박가루", "현미가루", "잣가루", "쌀가루\n박력분",
        "도넛믹스", "수수가루"
    ],

    '양념/소스': [
        // 장류
        "국간장", "고추장", "된장", "양조간장", "맛간장", "쌈장", "초고추장", "조선간장", "조림간장", "청국장",
        "쯔유", "미소된장", "어간장", "막장", "낫또", "누룩",

        // 기름류
        "참기름", "식용유", "올리브유", "들기름", "카놀라유", "포도씨유", "고추기름", "미강유",

        // 조미/향신료
        "고춧가루", "후춧가루", "식초", "올리고당", "매실청", "물엿", "새우젓", "미림", "깨소금", "청주",
        "통후추", "멸치액젓", "멸치다시마육수", "들깨가루", "파슬리가루", "계피가루", "까나리액젓", "다시다", "조청", "생강술",
        "발사믹식초", "멸치가루", "레몬즙", "생강가루", "미원", "멸치육수", "건월계수잎", "페페론치노", "후리가케", "라면스프",
        "마늘가루", "가쓰오부시", "짜장가루", "표고버섯가루", "샘표 연두", "두반장", "함초가루", "생강청", "황태가루", "고추씨",
        "쌀뜨물", "치킨스톡", "와인식초", "바질가루", "바베큐시즈닝", "산초가루", "실고추", "바닐라에센스", "바닐라파우더", "바닐라향",
        "청양고추가루", "사골육수", "춘장", "새우가루", "커민가루", "케이준시즈닝", "냉면육수", "피쉬소스", "바닐라빈", "다시마육수",
        "단촛물", "피넛월남쌈소스", "정향", "바닐라익스트랙", "청국장가루", "허브시즈닝", "닭육수", "국선생", "오렌지익스트랙", "새우육수",
        "소고기육수", "참치액", "아가베시럽", "오레가노가루", "동치미육수", "감미료", "멘쯔유", "스프링클", "팔각", "새우액젓",
        "트리몰린", "빙초산", "넛맥", "럼주", "칠리파우더", "울금가루", "식용색소", "야채육수", "찹쌀풀", "민트익스트랙",
        "안초비", "케이퍼", "시치미", "다시마가루", "파래가루", "홍합가루", "초피액젓", "폰즈소스", "마늘즙", "양파가루",
        "흑마늘", "톳가루", "국시장국", "타코시즈닝", "파프리카가루", "카레가루",

        // 소스/드레싱
        "케찹", "굴소스", "버터", "마요네즈", "맛소금", "돈가스소스", "연와사비", "허니머스타드", "꽃소금", "스위트칠리",
        "스테이크소스", "토마토스파게티소스", "땅콩버터", "핫소스", "머스타드", "타르타르 소", "연겨자", "소갈비양념", "홀그레인머스타드", "마가린",
        "발사믹글레이즈", "함초소금", "칠리소스", "돼지갈비양념", "바베큐소스", "토마토페이스트", "토마토피자소스", "고형카레", "우스터소스", "토마토퓨레",
        "데리야끼소스", "허니버터", "걍겨자", "메이플시럽", "고추마늘소스", "당근퓨레", "하이라이스가루", "코르마카레페이스트", "바질페스토", "고형하이라이스",
        "망고퓨레", "코코넛밀크", "홀토마토", "데이글라스소스", "팟타이소스", "초코시럽", "사우전아일랜드소스", "깻잎페스토", "사워크림", "오코노미야끼소스," +
        "살사소스", "고르곤졸라소스", "해선장소스", "캬라멜소스",

        // 소금/설탕/잼류
        "소금", "설탕", "꿀", "굵은소금", "딸기잼", "허브솔트", "황설탕", "천일염", "흑설탕", "초콜릿잼",
        "슈가파우더", "팥앙금", "커스타드크림", "살구잼", "사과잼", "단팥", "블루베리필링", "화인스위트", "빙수용팥", "펄슈가",
        "백옥앙금", "라즈베리잼", "바닐라설탕", "밤잼"
    ],

    '가공/유제품': [
        // 면/만두/피자
        "국수", "스파게티면", "만두", "라면", "당면", "짜파게티", "라이스페이퍼", "우동사리", "또띠아", "물만두",
        "칼국수면", "메밀국수", "팔도비빔면", "쌀국수", "펜네", "라면사리", "간짬뽕", "만두피", "마카로니", "쫄면사리",
        "유부주머니", "춘권피", "냉면사리", "수제비면", "푸실리", "리가토니", "생면", "양장피채", "링귀니", "쿠스쿠스",
        "파르팔레", "페투치니",

        // 우유/요구르트
        "우유", "요거트", "요구르트", "생크림", "휘핑크림", "연유", "분유", "요거트파우더", "산양유", "아이스크림믹스", "탈지분유",

        // 치즈
        "체다슬라이스치즈", "모짜렐라치즈", "크림치즈", "파마산치즈가루", "고르곤졸라치즈", "아기치즈", "스트링치즈", "황치즈가루", "까망베르치즈", "리코타치즈",
        "파마산치즈", "체다치즈", "그라나파다노치즈", "큐브치즈", "과일치즈", "브리치즈", "김밥용치즈", "에멘탈치즈", "코티지치즈", "스모그치즈",
        "고다치즈", "후레시모짜렐라치즈", "롤치즈",

        // 김치류
        "배추김치", "깍두기", "갓김치", "열무김치", "총각김치", "김치국물", "백김치", "파김치", "동치미", "무김치",
        "동치미국물", "열무물김치", "고들빼기김치", "순무김치",

        // 밑반찬류
        "멸치볶음", "명란젓", "단무지", "조개젓", "장조림", "창란젓", "조미우엉채", "김밥용단무지", "멸치젓", "황석어젓",
        "모듬전", "생선전",

        // 두부/묵류
        "두부", "손두부", "유부", "도토리묵", "곤약", "청포묵", "연두부", "콩비지", "동부묵", "건도토리묵",
        "검정깨묵", "실곤약", "우무묵", "메밀묵",

        // 장아찌/절임류
        "마늘장아찌", "고추장아찌", "깻잎장아찌", "매실장아찌", "오이장아찌", "할라피뇨", "곰취장아찌", "쌈무", "오이피클", "마늘쫑장아찌",
        "칠리페퍼", "치킨무", "양파장아찌", "무장아찌", "무피클", "토마토장아찌"
    ],

    기타: [
        // 즉석조리식품
        "햇반", "3분카레", "즉석밥", "크림스프", "양송이스프", "핫도그", "튀김", "동그랑땡", "3분짜장", "순대",
        "김밥", "치킨", "치킨탕수육", "감자스프",

        // 햄/어묵
        "어묵", "햄", "소시지", "게맛살", "스팸", "베이컨", "프랑크소시지", "너겟", "비엔나소시지", "떡갈비",
        "슬라이스햄", "김밥용햄", "구멍어묵", "크래미", "미트볼", "살라미소시지", "오리떡갈비", "두부어묵", "프로슈토",

        // 캔
        "참치캔", "꽁치캔", "옥수수캔", "고추참치캔", "번데기캔", "파인애플캔", "골뱅이캔", "연어캔", "닭가슴살캔", "후르츠칵테일",
        "완두콩캔", "닭가슴살캔", "베이크드빈", "만다린오렌지캔", "복숭아캔", "밤캔", "고등어캔", "짜장참치캔",

        // 빵
        "식빵", "모닝빵", "크로와상", "핫도그빵", "꽃빵", "마늘빵", "머핀", "바게트빵", "치즈케익", "햄버거빵",
        "베이글", "치아바타", "통밀빵", "하드롤", "카스테라", "크루통", "도넛", "잉글리쉬머핀", "케이크시트", "발효빵",
        "호밀빵",

        // 떡
        "떡국떡", "떡볶이떡", "백설기", "가래떡", "인절미", "조랭이떡", "송편", "찰떡", "찹살떡", "키리모찌",
        "빙수용떡", "절편", "치즈떡볶이떡",

        // 음료
        "생수", "인스턴트커피", "맥주", "오렌지주스", "레드와인", "화이트와인", "얼음", "원두커피", "녹차", "유자청",
        "탄산수", "홍초", "콜라", "두유", "메실주", "오디청", "정종", "사과청", "홍차티백", "양파즙",
        "자두청", "수제청", "사과주스", "에스프레소", "라임주스", "아이스티믹스가루", "포도주스", "녹차가루", "배즙", "홍삼액",
        "레몬제스트", "사이다", "깔루아", "레몬청", "막걸리", "흑마늘진액", "다시마차", "자몽주스", "모카액기스", "콩국물",
        "레몬주스", "감귤주스", "복분자액", "딸기주스",

        // 과자/아이스크림
        "씨리얼", "초콜릿", "과자", "아이스크림"
    ]
}
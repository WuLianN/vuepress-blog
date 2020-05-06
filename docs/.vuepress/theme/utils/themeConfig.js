export const routerConfig = {
    "/": () => "home",
    "tech": () => "tech",
    "camera": () => "camera",
    "life": () => "life",
}

export const tagType = ['Vue', 'JavaScript', 'Nginx', 'HTTP', 'Node', 'Python', 'Other', 'Java', 'TypeScript']

export const tagTypeConfig = {
    "JavaScript": () => "rgb(123, 110, 5)",
    "Vue": () => "rgb(6, 65, 125)",
    "Nginx": () => "rgb(6, 121, 27)",
    "HTTP": () => "#f34b7d",
    "Node": () => " #555555",
    "Python": () => "#3572A5",
    "Other": () => "#178600",
    "Java": () => "#b07219",
    "TypeScript": () => "#2b7489"
}

const baseUrl = 'https://api.bearcub.club/tag/';
const duck = baseUrl + 'duck.jpg'
const bear = baseUrl + 'bear.jpg'
const elephant = baseUrl + 'elephant.jpg'
const raccoon = baseUrl + 'raccoon.jpg'
const snail = baseUrl + 'snail.jpg'
const jellyfish = baseUrl + 'jellyfish.jpg'
const turtle = baseUrl + 'turtle.jpg'
const whiteFox = baseUrl + 'whiteFox.jpg'

export const tagImg = [duck, bear, elephant, raccoon, snail, jellyfish, turtle, whiteFox]

export const weatherTypeConfig = {
    '晴': '日晴.png',
    '多云': '日间多云.png',
    '晴间多云': '日间多云.png',
    '小雨': '小雨.png',
    '中雨': '中雨.png',
    '大雨': '大雨.png',
    '暴雨': '暴雨.png',
    '大暴雨': '大暴雨.png',
    '特大暴雨': '特大暴雨.png',
    '阵雨': '阵雨.png',
    '雷阵雨': '雷阵雨.png',
    '小雨-中雨': '小到中雨.png',
    '中雨-大雨': '中到大雨.png',
    '大雨-暴雨': '大到暴雨.png',
    '暴雨-大暴雨': '暴雨到大暴雨.png',
    '大暴雨-特大暴雨': '大暴雨到特大暴雨.png',
    '冻雨': '冻雨.png',
    '雨夹雪': '雨夹雪.png',
    '雷阵雨并伴有冰雹': '雷阵雨并伴有冰雹.png',
    '阴': '阴.png',
    '小雪': '小雪.png',
    '中雪': '中雪.png',
    '大雪': '大雪.png',
    '暴雪': '暴雪.png',
    '阵雪': '阵雪.png',
    '小雪-中雪': '小到中雪.png',
    '中雪-大雪': '中到大雪.png',
    '大雪-暴雪': '大到暴雪.png',
    '霾': '霾.png',
    '中度霾': '中度霾.png',
    '重度霾': '重度霾.png',
    '严重霾': '严重霾.png',
    '浮尘': '浮尘.png',
    '扬沙': '扬沙.png',
    '沙尘暴': '沙尘暴.png',
    '强沙尘暴': '强沙尘暴.png',
    '雾': '雾.png',
    '轻雾': '雾.png',
    '浓雾': '浓雾.png',
    '强浓雾': '强浓雾.png',
    '大雾': '大雾.png',
    '特强浓雾': '.特强浓雾png',
}
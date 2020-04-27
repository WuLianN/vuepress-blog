export const routerConfig = {
    "/": () => "home",
    "tech": () => "tech",
    "camera": () => "camera",
    "life": () => "life",
}

export const tagType = ['Vue', 'JavaScript', 'Nginx', 'HTTP', 'Node', 'Python', 'C#', 'Java', 'TypeScript']

export const tagTypeConfig = {
    "JavaScript": () => "rgb(123, 110, 5)",
    "Vue": () => "rgb(6, 65, 125)",
    "Nginx": () => "rgb(6, 121, 27)",
    "HTTP": () => "#f34b7d",
    "Node": () => " #555555",
    "Python": () => "#3572A5",
    "C#": () => "#178600",
    "Java": () => "#b07219",
    "TypeScript": () => "#2b7489"
}

const baseUrl = 'http://api.bearcub.club/tag/';
const duck = baseUrl + 'duck.jpg'
const bear = baseUrl + 'bear.jpg'
const elephant = baseUrl + 'elephant.jpg'
const raccoon = baseUrl + 'raccoon.jpg'
const snail = baseUrl + 'snail.jpg'
const cat = baseUrl + 'cat.jpg'
export const tagImg = [duck, bear, elephant, raccoon, snail, cat] 

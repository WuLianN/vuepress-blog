import axios from 'axios'

export const baseUrl = 'https://api.bearcub.club/'

// const baseUrl = 'http://localhost:3001/'

const oneUrl = baseUrl + 'one'
const weatherUrl = baseUrl + 'weather'

// github repo
const userRepo = 'https://api.bearcub.club/userRepo'

// one
export function getOne() { return axios.get(oneUrl) }

// ip
export function getWeather() { return axios.get(weatherUrl) }

// github repo 
export const needRepo = ['music-player', 'vue-bilibili', 'blog']
export function getTheBestRepo() { return axios.get(userRepo) }

// beauty 美女图片
const beautyUrl = baseUrl + 'beauty'
export function getBeauties(pageNum, pageSize) {
    return axios.get(beautyUrl, { params: { pageNum, pageSize } })
}
import axios from 'axios'

const baseUrl = 'https://api.bearcub.club/'

// const baseUrl = 'http://localhost:3001/'

const oneUrl = baseUrl + 'one'
const weatherUrl = baseUrl + 'weather'

// github repo
const userRepo = 'https://api.github.com/users/WuLianN/repos'

// one
export function getOne() { return axios.get(oneUrl) }

// ip
export function getWeather() { return axios.get(weatherUrl) }

// github repo 
export const needRepo = ['music-player', 'vue-bilibili', 'blog']
export function getTheBestRepo() { return axios.get(userRepo) }
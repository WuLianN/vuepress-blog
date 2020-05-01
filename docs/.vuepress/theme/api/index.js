import axios from 'axios'

const baseUrl = 'https://api.bearcub.club/'

// const baseUrl = 'http://localhost:3001/'

const oneUrl = baseUrl + 'one'
const weatherUrl = baseUrl + 'weather'

// one
export function getOne() { return axios.get(oneUrl) }

// ip
export function getWeather() { return axios.get(weatherUrl) }
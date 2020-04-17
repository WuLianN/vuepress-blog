import axios from 'axios'

const url = 'https://api.bearcub.club/one'

// one
export function getOne() { return axios.get(url) }
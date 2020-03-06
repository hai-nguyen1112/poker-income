import axios from 'axios'

let instance

switch (window.location.hostname) {
    case "localhost":
        instance = axios.create({baseURL: "http://localhost:4000/"})
        break
    case "poker-income.netlify.com":
        instance = axios.create({baseURL: "https://poker-income-backend.herokuapp.com/"})
        break
    default:
        instance = axios.create({baseURL: "http://localhost:4000/"})
}

export default instance
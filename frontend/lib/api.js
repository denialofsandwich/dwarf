import axios from 'axios';

const API = () => {
    return axios.create({
        baseURL: '/_api/',
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
}

export default API
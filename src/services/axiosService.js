import axios from 'axios';

export default class AxiosService {
    postMethod = (url, data, isHeaderRequired = false) => {
        return axios.post(url, data, isHeaderRequired)
    }
    getMethod = (url, isHeaderRequired = false) => {
        return axios.get(url, isHeaderRequired)
    }
    putMethod = (url, data, isHeaderRequired = false) => {
        return axios.put(url, data, isHeaderRequired)
    }
    deleteMethod = (url, data, isHeaderRequired = false) => {
        return axios.delete(url, data, isHeaderRequired)
    }
}

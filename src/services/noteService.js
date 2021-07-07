import AxiosService from "./axiosService";

const axios = new AxiosService();

export default class NotesService {
    baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

    createNote = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/addNotes`, data, { headers: {"Authorization" : token} });
    }
}
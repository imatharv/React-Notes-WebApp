import AxiosService from "./axiosService";

const axios = new AxiosService();

export default class NotesService {
    baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

    createNote = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/addNotes`, data, { headers: {"Authorization" : token} });
    }
    updateNote = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/updateNotes`, data, { headers: {"Authorization" : token} });
    }
    getNote = (token) => {
        return axios.getMethod(`${this.baseURL}notes/getNotesList`, { headers: {"Authorization" : token} });
    }
    archiveNotes = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/archiveNotes`, data, { headers: {"Authorization" : token} });
    }
    getArchiveNotes = (token) => {
        return axios.getMethod(`${this.baseURL}notes/getArchiveNotesList`, { headers: {"Authorization" : token} });
    }
    trashNotes = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/trashNotes`, data, { headers: {"Authorization" : token} });
    }
    getTrashNotes = (token) => {
        return axios.getMethod(`${this.baseURL}notes/getTrashNotesList`, { headers: {"Authorization" : token} });
    }
}
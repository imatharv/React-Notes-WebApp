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
    changeColor = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/changesColorNotes`, data, { headers: {"Authorization" : token} });
    }
    deleteForever = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/deleteForeverNotes`, data, { headers: {"Authorization" : token} });
    }
    SearchUserList = (data, token) => {
        return axios.postMethod(`${this.baseURL}user/searchUserList`,data, { headers: {"Authorization" : token} });
    };
    AddCollaborator = (id, data, token) => {
        return axios.postMethod(`${this.baseURL}notes/${id}/AddcollaboratorsNotes`, data, { headers: {"Authorization" : token} })
    }
    RemoveCollaborator = (id, userId, token) => {
        return axios.deleteMethod(`${this.baseURL}notes/${id}/removeCollaboratorsNotes/${userId}`,{ headers: {"Authorization" : token} });
    };
    PinNote = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/pinUnpinNotes`, data, { headers: {"Authorization" : token} });
    };
    getReminder = (data, token) => {
        return axios.getMethod(`${this.baseURL}notes/getReminderNotesList`, data, { headers: {"Authorization" : token} });
    };
    addReminder = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/addUpdateReminderNotes`, data, { headers: {"Authorization" : token} });
    };
    removeReminder = (data, token) => {
        return axios.postMethod(`${this.baseURL}notes/removeReminderNotes`, data, { headers: {"Authorization" : token} });
    };
}
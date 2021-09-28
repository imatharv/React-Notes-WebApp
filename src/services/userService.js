import AxiosService from "./axiosService";

const axios = new AxiosService();

export default class UserService {
    baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

    registration = (data) => {
        return axios.postMethod(`${this.baseURL}user/userSignUp/`, data);
    }

    login = (data) => {
        return axios.postMethod(`${this.baseURL}user/login/`, data);
    }

    forgetPassword = (data) => {
        return axios.postMethod(`${this.baseURL}user/reset/`, data);
    }

    resetPassword = (data, token) => {
        return axios.postMethod(`${this.baseURL}user/reset-password/`, data, { headers: {"Authorization" : token} });
    }
}
import AxiosService from "./axiosService";

const axios = new AxiosService();

export default class UserService {
    static baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

    registration = (data) => {
        return axios.postMethod(`${this.baseURL}user/userSignUp`, data);
    }
}
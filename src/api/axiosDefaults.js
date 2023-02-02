import axios from "axios";

// API's deployed URL
axios.defaults.baseURL = "https://ushare.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Response & Request Inerceptors 
export const axiosReq = axios.create();
export const axiosRes = axios.create();
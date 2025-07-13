import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function userLoginAction(loginCreds){
    return axios.post(`${backendAPI}api/login`, loginCreds)
}

export const userLoginAction2 = async (credentials) => {
  return axios.post(`${backendAPI}api/login`, credentials, {
    headers: {
      'Accept': 'application/json'
    },
    withCredentials: true, 
  });
};
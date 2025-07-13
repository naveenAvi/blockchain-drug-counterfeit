import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function getDrugs(data){
    return axios.get(`${backendAPI}api/drug`, data)
}
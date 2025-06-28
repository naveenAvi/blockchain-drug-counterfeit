import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function addEntities(data){
    return axios.post(`${backendAPI}api/entities`, data)
}
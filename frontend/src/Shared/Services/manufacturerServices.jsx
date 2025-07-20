import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function getManufacturers(){
    return axios.get(`${backendAPI}api/entities?type=manufacturer`)
}
export async function getManuorderList(){
    return axios.post(`${backendAPI}api/manufacturer/list-orders`, )
}
export async function getManuorderListByID(data){
    return axios.post(`${backendAPI}api/manufacturer/list-orders`,data )
}

export async function confirmAndCreateTokens(data){
    return axios.post(`${backendAPI}api/manufacturer/status-update`,data )
}
import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function getMyDrugAmount(data){
    return axios.post(`${backendAPI}api/my/drug-amount/${data.id}`, data)
}


export async function transfer(data){
    return axios.post(`${backendAPI}api/my/transfer`, data)
}

export async function tansferTO(data){
    return axios.post(`${backendAPI}api/my/tansferTO`, data)
}

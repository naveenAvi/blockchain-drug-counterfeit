import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function addEntities(data){
    return axios.post(`${backendAPI}api/entities`, data)
}

export async function getEntities(entityType){
    return axios.get(`${backendAPI}api/entities/filterby/${entityType}`)
}

export async function getEntitiesByID(id){
    return axios.get(`${backendAPI}api/entities/${id}`)
}


export async function createCorpUser(userInfo){
    return axios.post(`${backendAPI}api/corp_store`,userInfo)
}
export async function getCorpUsers(entID){
    return axios.get(`${backendAPI}api/entities/${entID}/users`)
}
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

export async function transactionHistory(data){
    return axios.post(`${backendAPI}api/transaction-history`, data)
}

export async function getTransactionStatus(data){
    return axios.post(`${backendAPI}api/logging/transaction-status`, {eventReferenceNumber:data})
}

export async function getTransactionsByReference(data){
    return axios.post(`${backendAPI}api/manufacturer/get-transactions-by-reference/${data}`)
}


export async function getTransactionHistoryByAssetsID(referenceNumber){
    return axios.post(`${backendAPI}api/my/getTRansactionHistory`, {referenceNumber})
}


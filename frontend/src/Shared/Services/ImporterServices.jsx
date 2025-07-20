import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function createOrder(orderDetails){
    return axios.post(`${backendAPI}api/importer/create-order`, orderDetails)
}


export async function getorderList(){
    return axios.post(`${backendAPI}api/importer/get-importer-orders`, )
}
export async function getDashboardData(){
    return axios.post(`${backendAPI}api/importer/get-dashbord-data`, )
}

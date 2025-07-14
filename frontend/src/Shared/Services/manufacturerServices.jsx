import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function getManufacturers(){
    return axios.get(`${backendAPI}api/entities?type=manufacturer`)
}
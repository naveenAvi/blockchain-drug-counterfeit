import axios from "axios";
import { backendAPI } from "../Consts/ENV";

export async function getMyDrugAmount(drugID){
    return axios.post(`${backendAPI}api/my/drug-amount/${drugID}`)
}

import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;

export function getSetting(){
    return axios.get(`${API_URL}/api/settings/getSetting.php`)
}


export function updateSetting(data){
    return axios.post(`${API_URL}/api/settings/updateSetting.php`, data);
}

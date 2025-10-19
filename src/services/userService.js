import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL;


export function getUsers(){
    return axios.get(`${API_URL}/api/users/getUsers.php`)
}


export function deleteUser(data){
    return axios.post(`${API_URL}/api/users/deleteUser.php`,data)
}
export function changeRole(data){
    return axios.post(`${API_URL}/api/users/changeRole.php`,data)
}



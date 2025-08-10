import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL;


export function getAllUsers(){
    return axios.get(`${API_URL}/api/users/getAllUsers.php`)
}

export function getUserById(data) {
    return axios.post(`${API_URL}/api/users/getUserById.php`,data)
}

export function addUser(data){
    return axios.post(`${API_URL}/api/users/addUser.php`,data)
}

export function updateUser(data){
    return axios.post(`${API_URL}/api/users/updateUser.php`,data)
}

export function deleteUser(data){
    return axios.post(`${API_URL}/api/users/deleteUser.php`,data)
}

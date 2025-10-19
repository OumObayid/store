import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export function login(data) {    
  return axios.post(`${API_URL}/api/auth/login.php`, data);
}
// ----------------------pour inscription
//envoie de link
export function register(data) {
  return axios.post(`${API_URL}/api/auth/register.php`, data);
}

export function registerTokenEmail(data) {
  return axios.post(`${API_URL}/api/auth/registerTokenEmail.php`, data);
}
//reception de link
export function verifieEmailConfirmToken(data) {
  return axios.post(`${API_URL}/api/auth/verifieEmailConfirmToken.php`, data);
}

//-----------------------passeword oublié
//envoie de link
export function checkEmail(data) {
  return axios.post(`${API_URL}/api/auth/checkEmail.php`, data);
}

export function registerTokenPw(data) {
  return axios.post(`${API_URL}/api/auth/registerTokenPw.php`, data);
}
//reception de link
export function verifiePwConfirmToken(data) {
  return axios.post(`${API_URL}/api/auth/verifiePwConfirmToken.php`, data);
}
export function resetPassword(data) {
console.log('data :', data);
  return axios.post(`${API_URL}/api/auth/resetPassword.php`, data);
}

export function updateUserAddress(data){
    return axios.post(`${API_URL}/api/auth/updateUserAddress.php`,data)
}

export function updatePassword(data){
    return axios.post(`${API_URL}/api/auth/updatePassword.php`,data)
}

export function updateUser(data){
    return axios.post(`${API_URL}/api/auth/updateUser.php`,data)
}
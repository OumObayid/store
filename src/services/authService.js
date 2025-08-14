import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export function login(data) {    
  return axios.post(`${API_URL}/api/auth/login.php`, data);
}
// pour inscription
export function register(data) {
  return axios.post(`${API_URL}/api/auth/register.php`, data);
}

export function registerTokenEmail(data) {
  return axios.post(`${API_URL}/api/auth/registerTokenEmail.php`, data);
}

export function verifieEmailConfirmToken(data) {
  console.log('token',data)
  return axios.post(`${API_URL}/api/auth/verifieEmailConfirmToken.php`, data);
}
export function verifiePwConfirmToken(data) {
  console.log('token',data)
  return axios.post(`${API_URL}/api/auth/verifiePwConfirmToken.php`, data);
}

//Pour Mot de passe oublié
export function checkEmail(data) {
  return axios.post(`${API_URL}/api/auth/checkEmail.php`, data);
}

export function registerTokenPw(data) {

  return axios.post(`${API_URL}/api/auth/registerTokenPw.php`, data);
}

export function resetPassword(data) {
console.log('service data :', data);
  return axios.post(`${API_URL}/api/auth/resetPassword.php`, data);
}

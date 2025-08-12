import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function sendResetLink(data){
    return axios.post(`${API_URL}/api/email/sendEmail.php`,data)
}


export function  sendConfirmationEmail(data) {
    return axios.post(`${API_URL}/api/email/sendEmail.php`,data)

}


export function sendOrderNotification(data) {
        return axios.post(`${API_URL}/api/email/sendEmail.php`,data)

}

//facultatif
export function sendWelcomeEmail(data) {
        return axios.post(`${API_URL}/api/email/sendEmail.php`,data)

}

//facultatif
export function sendPasswordChangeNotification(data){
        return axios.post(`${API_URL}/api/email/sendEmail.php`,data)

}

import http from "./http-common";
import Toast from 'react-native-toast-message';

const getbyid = async (id) => {
    try {
        const res = await http.get(`users/getbyid/${id}`);
    return res.data;
    } catch {
        Toast.show({ type: 'error', text1:"Invalid QR code", text2: "Please Scan a valid QR code...", position: "top" });
    }
};

const getbyusername = async (username) => {
    try {
        const res = await http.get(`users/getbyusername/${username}`);
    return res.data;
    } catch {
        Toast.show({ type: 'error', text1:"Invalid Username", text2: "Please give a valid username...", position: "top" });
    }
};

const UserService = {
    getbyid,
    getbyusername
};

export default UserService;
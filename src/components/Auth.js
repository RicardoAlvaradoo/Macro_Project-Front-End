import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"

import { fetchUserData } from '../services/fetchUser.js';

export const isAuth = () =>  {
    
    
    console.log("Prior Auth");
    let auth_status = auth();
    console.log("In auth", auth_status)
    return auth_status ;
}

 
const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
        const res = await fetchUserData("POST", "/token/refresh/", { refreshToken: refreshToken });
        if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;;
    }
}
const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        
        return false;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
        await refreshToken();
    } else {
        return true;
    }
}

export default isAuth;
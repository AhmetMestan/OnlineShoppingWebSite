import { IJWTProfile, IUser } from "../models/IUser";
import { IUserRegister } from "../models/IUserRegister";
import api from "./api";

export const userLogin = (email : string, password : string) => {
const sendObj = {
    email : email,
    password : password
}
return api.post<IUser>('auth/login', sendObj);

}

export const userRegister = (name : string, email : string, password : string) => {
const sendObj = {
    name : name,
    email : email,
    password : password
}
return api.post<IUserRegister>('auth/signup', sendObj);

}

export const userProfile = (jwt : string) => {
    const header = {
            Authorization: `Bearer ${jwt}`
        }
    return api.get<IJWTProfile>('profile/me', {headers: header});
    }


    export const userLogout = async () => {
      try {
        await api.post("/logout"); // API'ye logout isteği gönder
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        localStorage.removeItem("token");
        //localStorage.clear(); // JWT'yi localStorage'dan sil
        window.location.href = "/"; // Kullanıcıyı login sayfasına yönlendir
      }
    };
    

    



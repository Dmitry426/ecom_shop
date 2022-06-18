import axios from "axios";

const API_URL = "http://fast_auth:4000/api/v1/auth/";


export const createAuthUserWithEmailAndPassword = async (name, email, password) => {
    if (!email || !password) return;
    try {
        await axios.post(API_URL + "signup", JSON.stringify({name,email,password}),{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        });
    } catch (err) {

    }

};



import axios from "axios";

const API_URL = "http://localhost:5010/api/v1/auth/";

export const createAuthUserWithEmailAndPassword = async (
  login,
  email,
  password
) => {
  if (!email || !password) return;
  try {
    await axios.post(
      API_URL + "registration",
      JSON.stringify({ login, email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    if (err.response?.status === 401) {
      alert("User with this email  is already  registred  ");
    } else {
      alert("Sing up failed");
    }
  }
};

export const loginAuthUserWithNameAndPassword = async (email, password) => {
  if (!name || !password) return;
  try {
    let response = await axios.post(
      API_URL + "login",
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response?.data?.accessToken;
  } catch (err) {
    if (err.response?.status === 400) {
      alert("Missing username or password");
    } else if (err.response?.status === 401) {
      alert("Unauthorized ");
    } else {
      alert("Sing in  failed");
    }
  }
};

import axios from "axios";

function getLocalAccessToken() {
    return window.localStorage.getItem("accessToken");
}


function getLocalRefreshToken() {
    return window.localStorage.getItem("refreshToken");
}

const instance = axios.create({
    baseURL: "http://localhost:5010/api/v1/auth/",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
         config.headers.Authorization  = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // eslint-disable-next-line no-undef
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshToken();
                    const {access_token, refresh_token} = rs.data;
                    localStorage.setItem("accessToken", access_token);
                    localStorage.setItem("refreshToken", refresh_token);
                    instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                    return instance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        // eslint-disable-next-line no-undef
                        return Promise.reject(_error.response.data);
                    }
                    // eslint-disable-next-line no-undef
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                // eslint-disable-next-line no-undef
                return Promise.reject(err.response.data);
            }
        }
        // eslint-disable-next-line no-undef
        return Promise.reject(err);
    }
);
export const createAuthUserWithEmailAndPassword = async (
  login,
  email,
  password
) => {
  if (!email || !password) return;
  try {
    await instance.post(
      "registration",
      JSON.stringify({ login, email, password }),
    );
  } catch (err) {
    if (err.response?.status === 409) {
      alert("User with this email  is already  registred  ");
    } else {
      alert("Sing up failed");
    }
  }
};

export const loginAuthUserWithNameAndPassword = async (email, password) => {
  if (!email|| !password) return;
  try {
    let response = await instance.post(
      "login",
      JSON.stringify({ email, password }),
    );

    const {access_token, refresh_token } = response.data
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return true
  } catch (err) {
    if (err.response?.status === 400) {
      alert("Missing username or password");
    } else if (err.response?.status === 409) {
      alert("Unauthorized ");
    } else {
      alert("Sing in  failed");
    }
  }
};

export const logoutUser = async () => {
    try {
        await instance.post(
            "logout",
        );
    } catch (err) {
        alert("Logout failed")
    }
};

export const getUserInfo = async () => {
        try {
       let  response =  await instance.get(
            "user",
        );
       return response.data
    } catch (err) {
        alert("No such  account  ")
    }
};




const refreshToken = async () => {
    const refresh = getLocalRefreshToken()
    try {
        await instance.post(
            "refresh",
            JSON.stringify({refresh}),
            {
                headers: {"Content-Type": "application/json"},
            }
        );
    } catch (err) {
        if (err.response?.status === 409) {
            alert("Probably not a valid token or else token problem ");
        } else {
            alert("Can not refresh ");
        }
    }
};

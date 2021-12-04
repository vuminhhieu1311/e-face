import { API_URL } from "../utils/Config";

const createToken = async (email, password, deviceName, firebaseToken) => {
    return await fetch(`${API_URL}auth/token`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            device_name: deviceName,
            firebase_token: firebaseToken,
        })
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    });
};

export default createToken;

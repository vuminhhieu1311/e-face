import { API_URL } from "../../utils/Config";

const registerUser = async (name, email, password, passwordConfirmation) => {
    return await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    });
};

export default registerUser;

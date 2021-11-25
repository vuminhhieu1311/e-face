import { API_URL } from "../utils/Config";

const deleteToken = async (userToken) => {
    return await fetch(`${API_URL}auth/token`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    });
};

export default deleteToken;

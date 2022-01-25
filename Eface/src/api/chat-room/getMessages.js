import { API_URL } from "../../utils/Config";

const getMessages = async (userToken, roomID) => {
    return await fetch(`${API_URL}rooms/${roomID}/messages`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        
        return Promise.all([statusCode, data]);
    });
};

export default getMessages;

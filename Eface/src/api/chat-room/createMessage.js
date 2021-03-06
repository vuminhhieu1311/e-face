import { API_URL } from "../../utils/Config";

const createMessage = async (userToken, roomID, text) => {
    return await fetch(`${API_URL}messages`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
            room_id: roomID,
            text,
        }),
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        
        return Promise.all([statusCode, data]);
    });
};

export default createMessage;

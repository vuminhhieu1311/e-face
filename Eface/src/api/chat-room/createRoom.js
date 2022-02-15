import { API_URL } from "../../utils/Config";

const createRoom = async (userToken, name, userIds) => {
    return await fetch(`${API_URL}rooms`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
            name,
            user_ids: userIds,
        }),
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        
        return Promise.all([statusCode, data]);
    });
};

export default createRoom;

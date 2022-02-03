import { API_URL } from "../../utils/Config";

const getRoom = async (userToken, userId) => {
    return await fetch(`${API_URL}rooms/user/${userId}`, {
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

export default getRoom;

import { API_URL } from "../../utils/Config";

const deleteFriend = async (userToken, friendID) => {
    return await fetch(`${API_URL}friends/${friendID}`, {
        method: 'DELETE',
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

export default deleteFriend;

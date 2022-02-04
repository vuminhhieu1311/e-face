import { API_URL } from "../../utils/Config";

const callUser = async (userToken, channelName, roomId) => {
    return await fetch(`${API_URL}agora/call-user/room/${roomId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
            channel_name: channelName,
        })
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        
        return Promise.all([statusCode, data]);
    });
};

export default callUser;

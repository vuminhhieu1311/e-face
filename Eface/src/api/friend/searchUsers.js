import { API_URL } from "../../utils/Config";

const searchUsers = async (userToken, keyword) => {
    return await fetch(`${API_URL}users?keyword=${keyword}`, {
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

export default searchUsers;

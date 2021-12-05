import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER, PUSHER_AUTH_ENDPOINT } from './Config';

const initPusher = (userToken) => {
    return new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
        useTLS: true,
        authEndpoint: PUSHER_AUTH_ENDPOINT,
        auth: {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        },
    });
}

export default initPusher;

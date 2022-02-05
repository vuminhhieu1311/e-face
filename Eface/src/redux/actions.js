export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_PUSHER = 'SET_PUSHER';
export const SET_ROOMS = 'SET_ROOMS';
export const LOGOUT = 'LOGOUT';

export const setUserData = (user, userToken) => dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload: {
            user,
            userToken,
        },
    });
};

export const setPusher = (pusher) => dispatch => {
    dispatch({
        type: SET_PUSHER,
        payload: {
            pusher,
        },
    });
};

export const setRooms = (rooms) => dispatch => {
    dispatch({
        type: SET_ROOMS,
        payload: {
            rooms,
        },
    });
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
};

export const SET_USER_DATA = 'SET_USER_DATA';
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

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
};

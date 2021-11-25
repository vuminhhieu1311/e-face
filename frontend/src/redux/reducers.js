import { SET_USER_DATA, LOGOUT } from './actions';

const initialState = {
    user: null,
    userToken: null,
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.userToken
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                userToken: null,
            };
        default:
            return state;
    }
}

export default authReducer;

import { USER_LOGOUT } from '../Actions/AuthActions';
import {
    CLEAR_USER_SESSION,
    GET_USER_SESSIONS_FAILURE_RESPONSE,
    GET_USER_SESSIONS_SUCCESS_RESPONSE,
    GET_USER_SESSION_BY_ID_FAILURE_RESPONSE,
    GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE,
    SAVE_USER_STATE_FAILURE_RESPONSE,
    SAVE_USER_STATE_SUCCESS_RESPONSE,
    UPDATE_USER_SESSION_FAILURE_RESPONSE,
    UPDATE_USER_SESSION_SUCCESS_RESPONSE,
} from '../Actions/SessionAction';
const sessionStates = {};

export const UserSessionReducer = (state = sessionStates, action: any) => {
    switch (action.type) {
        case SAVE_USER_STATE_SUCCESS_RESPONSE:
        case UPDATE_USER_SESSION_SUCCESS_RESPONSE:
        case GET_USER_SESSIONS_SUCCESS_RESPONSE:
        case GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE:
            return {
                ...state,
                ...action.payload,
            };

        case CLEAR_USER_SESSION:
        case SAVE_USER_STATE_FAILURE_RESPONSE:
        case UPDATE_USER_SESSION_FAILURE_RESPONSE:
        case GET_USER_SESSIONS_FAILURE_RESPONSE:
        case GET_USER_SESSION_BY_ID_FAILURE_RESPONSE:
        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
};

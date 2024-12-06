import { IUpdateUserSessionType } from '../Sagas/SessionSaga';

export const SAVE_USER_STATE_ACTIONS: any = 'SAVE_USER_STATE_ACTIONS';
export const SAVE_USER_STATE_SUCCESS_RESPONSE: string =
    'SAVE_USER_STATE_SUCCESS_RESPONSE';
export const SAVE_USER_STATE_FAILURE_RESPONSE: string =
    'SAVE_USER_STATE_FAILURE_RESPONSE';

export const UPDATE_USER_SESSION_ACTION: any = 'UPDATE_USER_SESSION_ACTION';
export const UPDATE_USER_SESSION_SUCCESS_RESPONSE: string =
    'UPDATE_USER_SESSION_SUCCESS_RESPONSE';
export const UPDATE_USER_SESSION_FAILURE_RESPONSE: string =
    'UPDATE_USER_SESSION_FAILURE_RESPONSE';

export const GET_USER_SESSION_BY_ID: any = 'GET_USER_SESSION_BY_ID';
export const GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE: string =
    'GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE';
export const GET_USER_SESSION_BY_ID_FAILURE_RESPONSE: string =
    'GET_USER_SESSION_BY_ID_FAILURE_RESPONSE';

export const GET_USER_SESSIONS: any = 'GET_USER_SESSIONS';
export const GET_USER_SESSIONS_SUCCESS_RESPONSE: string =
    'GET_USER_SESSIONS_SUCCESS_RESPONSE';
export const GET_USER_SESSIONS_FAILURE_RESPONSE: string =
    'GET_USER_SESSIONS_FAILURE_RESPONSE';
export const CLEAR_USER_SESSION: string = 'CLEAR_USER_SESSION';

enum UserSessionFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
    PaymentCompleted = 'paymentCompleted',
}
interface ISessionId {
    id: number;
}

interface UserState {
    userSessionData?: Record<string, any>;
}

export const SaveUserStateAction = (data?: UserState) => {
    return {
        type: SAVE_USER_STATE_ACTIONS,
        payload: data,
    };
};

export const UpdateUserSessionAction = (data: IUpdateUserSessionType) => {
    return {
        type: UPDATE_USER_SESSION_ACTION,
        payload: data,
    };
};

export const GetUserSessionByIdAction = (data: ISessionId) => {
    return {
        type: GET_USER_SESSION_BY_ID,
        payload: data,
    };
};

export const GetUserSessions = (data: UserSessionFilter) => {
    return {
        type: GET_USER_SESSIONS,
        payload: data,
    };
};

export const ClearUserSession = () => {
    return {
        type: CLEAR_USER_SESSION,
    };
};

import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import {
    GET_USER_SESSIONS_FAILURE_RESPONSE,
    GET_USER_SESSIONS_SUCCESS_RESPONSE,
    GET_USER_SESSION_BY_ID_FAILURE_RESPONSE,
    GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE,
    SAVE_USER_STATE_FAILURE_RESPONSE,
    SAVE_USER_STATE_SUCCESS_RESPONSE,
    UPDATE_USER_SESSION_FAILURE_RESPONSE,
    UPDATE_USER_SESSION_SUCCESS_RESPONSE,
} from '../Actions/SessionAction';

interface ISaveUserSession {
    payload: {
        newUserSessionState: 'quote_initiated';
        userSessionData?: Record<string, any>;
    };
}
interface ISessionId {
    payload: {
        id: string;
    };
}

export interface IUpdateUserSessionType {
    id?: number;
    correlationId?: string;
    paymentId?: string;
    nextSessionState?: string;
    userSessionData?: Record<string, any>;
}
interface IUpdateUser {
    payload: IUpdateUserSessionType;
}

enum UserSessionFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
    PaymentCompleted = 'paymentCompleted',
}
export function* SaveUserSessionSaga(actions: ISaveUserSession): unknown {
    try {
        const response = yield call(
            axios.post,
            `v1/users/sessions`,
            actions.payload,
        );
        const { data, success } = response?.data;

        if (success) {
            yield put({
                type: SAVE_USER_STATE_SUCCESS_RESPONSE,
                payload: data,
            });
        }
    } catch (err) {
        yield put({
            type: SAVE_USER_STATE_FAILURE_RESPONSE,
        });
        console.log(err);
    }
}

export function* UpdateUserSessionSaga(actions: IUpdateUser): unknown {
    try {
        if (actions.payload.id) {
            const response = yield call(
                axios.patch,
                `/v1/users/sessions/${actions.payload.id}`,

                actions.payload,
            );

            const { data, success } = response?.data;

            if (success) {
                yield put({
                    type: UPDATE_USER_SESSION_SUCCESS_RESPONSE,
                    payload: data,
                });
            }
        }
    } catch (error) {
        yield put({ type: UPDATE_USER_SESSION_FAILURE_RESPONSE });
        console.log(error);
    }
}

export function* GetUserSessionByIdSaga(actions: ISessionId): unknown {
    try {
        const id = actions.payload.id;
        const response = yield call(axios.get, `/v1/users/sessions/${id}`);
        const { success, data } = response?.data;

        if (success) {
            yield put({
                type: GET_USER_SESSION_BY_ID_SUCCESS_RESPONSE,
                payload: data,
            });
        }
    } catch (error) {
        yield put({ type: GET_USER_SESSION_BY_ID_FAILURE_RESPONSE });
    }
}

export function* GetUserSessionSaga(actions: {
    type: string;
    payload: UserSessionFilter;
}): unknown {
    try {
        const response = yield call(axios.get, `/v1/users/sessions`, {
            params: {
                filterBy: actions.payload,
            },
        });
        const { success, data } = response.data;

        if (success) {
            const lastSession = data[0];
            const payload = lastSession?.isPaymentCompleted ? {} : lastSession;

            yield put({
                type: GET_USER_SESSIONS_SUCCESS_RESPONSE,
                payload: payload,
            });
        }
    } catch (error) {
        yield put({ type: GET_USER_SESSIONS_FAILURE_RESPONSE });
        console.log(error);
    }
}

import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    ADD_SUPPORT_MAIL_FAILED,
    ADD_SUPPORT_MAIL_SUCCESS,
    GET_SUPPORT_TICKET_FAILED,
    GET_SUPPORT_TICKET_SUCCESS,
    REQUEST_A_CALL_BACK_FAILURE,
    REQUEST_A_CALL_BACK_SUCCESS,
} from '../Actions/SupportAction';
import { TOAST_SHOW } from '../Actions/ToastAction';

interface SupportMail {
    payload: {
        question: string;
        Name: string;
        email_address: string;
        message: string;
    };
}
interface RequestCallBack {
    payload: {
        name: string;
        companyName: string;
        // email: string;
        phone: string;
        message: string;
    };
}

export function* SupportMailSaga(action: SupportMail): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/support-mail`,
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({
                type: ADD_SUPPORT_MAIL_SUCCESS,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: ADD_SUPPORT_MAIL_FAILED });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    e?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

export function* GetSupportTicketsSaga(): unknown {
    try {
        const response = yield call(axios.get, 'user/get-support-tickets');
        const { message, success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_SUPPORT_TICKET_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_SUPPORT_TICKET_FAILED });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    e?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

export function* GetRequestCallBackSaga(actions: RequestCallBack): unknown {
    try {
        const response = yield call(
            axios.post,
            `v1/callback-requests`,
            actions.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({
                type: REQUEST_A_CALL_BACK_SUCCESS,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: REQUEST_A_CALL_BACK_FAILURE });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    e?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

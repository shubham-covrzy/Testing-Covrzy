import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import {
    GET_OTP_REQ_FAILED,
    GET_OTP_REQ_SUCCESS,
    VERIFY_OTP_FAILED,
    VERIFY_OTP_SUCCESS,
} from '../Actions/EmailVerifyAction';
import { TOAST_SHOW } from '../Actions/ToastAction';

interface IGetOtp {
    payload: {
        email_address: string;
    };
}

interface IVerifyOtp {
    payload: {
        email_address: string;
        otp: string;
    };
}

export function* GetOtpReqSaga(action: IGetOtp): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/generate-otp`,
            action.payload,
        );
        const { success, status, message } = response?.data;

        if (success) {
            yield put({ type: GET_OTP_REQ_SUCCESS, payload: status });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: message,
                    severity: 'success',
                    show: success,
                },
            });
        }
    } catch (e: any) {
        yield put({ type: GET_OTP_REQ_FAILED });
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

export function* VerifyOtpSaga(action: IVerifyOtp): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/verify-otp`,
            action.payload,
        );
        const { success, status, message } = response?.data;

        if (success) {
            yield put({ type: VERIFY_OTP_SUCCESS, payload: status });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: message,
                    severity: 'success',
                    show: success,
                },
            });
        }
    } catch (e: any) {
        yield put({ type: VERIFY_OTP_FAILED });
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

import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { SEND_OTP_PHONE_LOGIN_ERROR, SEND_OTP_PHONE_LOGIN_SUCCESS, VERIFY_OTP_PHONE_LOGIN_ERROR, VERIFY_OTP_PHONE_LOGIN_SUCCESS } from '../Actions/LoginActions';
import { TOAST_SHOW } from '../Actions/ToastAction';

export function* sendOtpPhoneLoginSaga(actions: any): unknown {
    try {
        const response = yield call(axios.post, `v1/otp/send`, actions.payload);

        const { request_id, isNewUser, type } = response?.data?.data;
        if (type === 'success') {
            yield put({
                type: SEND_OTP_PHONE_LOGIN_SUCCESS,
                payload: {
                    request_id,
                    isNewUser,
                },
            });
        }
    } catch (err: any) {
        yield put({
            type: SEND_OTP_PHONE_LOGIN_ERROR,
        });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    err?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
        console.log(err);
    }
}

export function* resendOtpPhoneLoginSaga(actions: any): unknown {
    try {
        const response = yield call(
            axios.post,
            `v1/otp/resend`,
            actions.payload,
        );

        const { request_id, type } = response?.data;
        if (type === 'success') {
            yield put({
                type: SEND_OTP_PHONE_LOGIN_SUCCESS,
                payload: {
                    request_id,
                },
            });
        }
    } catch (err: any) {
        yield put({
            type: SEND_OTP_PHONE_LOGIN_ERROR,
        });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    err?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
        console.log(err);
    }
}

export function* verifyOtpPhoneLoginSaga(actions: any): unknown {
    try {
        const {
            mainPayload,
            verifyPhoneLoginPayload,
            dispatchPayload,
            phoneNumberPayload,
        } = actions.payload;
        const response = yield call(axios.post, `v1/otp/verify`, mainPayload);
        const { data, success } = response?.data;

        if (success) {
            const payloadForVerifyPhoneLogin = {
                token: data?.message,
                requestId: mainPayload?.requestId ?? '',
                ...verifyPhoneLoginPayload,
            };

            dispatchPayload.dispatch(
                dispatchPayload.actionTrigger(payloadForVerifyPhoneLogin),
            );

            yield put({
                type: VERIFY_OTP_PHONE_LOGIN_SUCCESS,
                payload: data,
            });
        }
    } catch (err: any) {
        yield put({
            type: VERIFY_OTP_PHONE_LOGIN_ERROR,
        });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    err?.response?.status === 406
                        ? 'Incorrect OTP'
                        : err?.response?.data?.errors?.Error?.message ||
                        'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
        console.log(err);
    }
}

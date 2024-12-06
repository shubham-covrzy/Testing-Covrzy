import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    CREATE_PAYMENT_FAILED,
    CREATE_PAYMENT_SUCCESS,
    DOWNLOAD_PAYMENT_RECEIPT_FAILED,
    DOWNLOAD_PAYMENT_RECEIPT_SUCCESS,
    GET_PARTICULAR_PAYMENT_FAILED,
    GET_PARTICULAR_PAYMENT_SUCCESS,
    GET_PAYMENT_BY_ID_FAILURE,
    GET_PAYMENT_BY_ID_SUCCESS,
    GET_PAYMENT_HISTORY_FAILED,
    GET_PAYMENT_HISTORY_SUCCESS,
    PAYMENT_VERIFICATION_FAILURE,
    PAYMENT_VERIFICATION_SUCCESS,
    PaymentReceiptDownloadData,
} from '../Actions/PaymentActions';
import { TOAST_SHOW } from '../Actions/ToastAction';
import { IReduxState } from '../../utils/types';

interface DownloadPaymentReceiptAction {
    payload: PaymentReceiptDownloadData;
}

interface GetPaymentByIdAction {
    payload: {
        receiptId: string;
    };
}

interface CreateOrder {
    payload: {
        amount: number;
        tax: number;
        currency: string;
        recommendationId: string;
    };
}

interface VerifyPayment {
    payload: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    };
}

interface GetInvoiceId {
    payload: string;
}

interface IPaymentReceiptSave {
    payload: {
        formData: FormData;
    };
}
export function* GetPaymentReceiptSaveSaga(
    actions: IPaymentReceiptSave,
): unknown {
    try {
        const response = yield call(
            axios.post,
            `v1/payments/receipts`,
            actions.payload.formData,
        );
    } catch (er: any) {}
}

export function* GetPaymentHistorySaga(): unknown {
    try {
        const response = yield call(axios.get, `v1/payments/history`);
        const { success, data } = response?.data;

        if (success) {
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;
            yield put({
                type: GET_PAYMENT_HISTORY_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PAYMENT_HISTORY_FAILED });
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

export function* GetParticularPaymentSaga(action: GetInvoiceId): unknown {
    try {
        const response = yield call(
            axios.get,
            `/payment/get-invoice-detail/${action.payload}`,
        );
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_PAYMENT_HISTORY_SUCCESS, payload: data });
            yield put({
                type: GET_PARTICULAR_PAYMENT_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PARTICULAR_PAYMENT_FAILED });
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

export function* CreatePaymentOrderSaga(actions: CreateOrder): unknown {
    const userSessionData = yield select(
        (state: IReduxState) => state.UserSession,
    );
    try {
        const response = yield call(
            axios.post,
            `v1/payments/orders`,
            actions.payload,
        );
        const { data, success } = response?.data;

        yield put({
            type: 'UPDATE_USER_SESSION_ACTION',
            payload: {
                id: userSessionData.id,
                nextSessionState: 'payment_initiated',
                paymentData: data,
            },
        });

        if (success) {
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;
            localStorage.setItem('order', decryptTempData.orderId);

            yield put({
                type: CREATE_PAYMENT_SUCCESS,
                payload: decryptTempData,
            });
            // yield put({
            //   type: TOAST_SHOW,
            //   payload: {
            //     message: message || 'Order created successfully',
            //     severity: 'success',
            //     show: true,
            //   },
            // });
        }
    } catch (error: any) {
        yield put({ type: CREATE_PAYMENT_FAILED });
        yield put({
            type: 'UPDATE_USER_SESSION_ACTION',
            payload: {
                id: userSessionData.id,
                nextSessionState: 'payment_failed',
            },
        });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    error?.response?.data?.errors?.Error?.message ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

export function* PaymentVerificationSaga(actions: VerifyPayment): unknown {
    try {
        const response = yield call(
            axios.post,
            `payment/checkout/verify-pay`,
            actions.payload,
        );

        const { success } = response?.data;
        if (success) {
            yield put({ type: PAYMENT_VERIFICATION_SUCCESS });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: 'Payment successful',
                    severity: 'success',
                    show: true,
                },
            });
        } else {
            yield put({ type: PAYMENT_VERIFICATION_FAILURE });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message:
                        response?.data?.errors?.Error?.type ||
                        'Something went wrong',
                    severity: 'danger',
                    show: true,
                },
            });
        }
    } catch (error: any) {
        yield put({
            type: TOAST_SHOW,
            payload: {
                message:
                    error?.response?.data?.errors?.Error?.type ||
                    'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

export function* DownloadPaymentReceiptSaga(
    action: DownloadPaymentReceiptAction,
): unknown {
    try {
        const receiptId = action.payload.receiptId;

        const response = yield call(
            axios.get,
            `v1/payments/receipts/${receiptId}`,
            {
                responseType: 'arraybuffer',
            },
        );

        yield put({
            type: DOWNLOAD_PAYMENT_RECEIPT_SUCCESS,
            payload: response.data,
        });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message: 'Successfully Download Payment receipt pdf ',
                severity: 'success',
                show: true,
            },
        });
    } catch (e: any) {
        yield put({ type: DOWNLOAD_PAYMENT_RECEIPT_FAILED });
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

export function* GetPaymentById(action: GetPaymentByIdAction): unknown {
    try {
        const { receiptId } = action.payload;
        const response = yield call(axios.get, `v1/payments/${receiptId}`);
        const { data, success } = response.data;
        if (success) {
            yield put({
                type: GET_PAYMENT_BY_ID_SUCCESS,
                payload: data,
            });
        }
    } catch (error) {
        yield put({ type: GET_PAYMENT_BY_ID_FAILURE });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message: 'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

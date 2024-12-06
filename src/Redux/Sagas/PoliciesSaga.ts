import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    ADD_NON_COVERZY_POLICIY_FAILED,
    ADD_NON_COVERZY_POLICIY_SUCCESS,
    DELETE_NON_COVERZY_POLICIY_FAILED,
    DELETE_NON_COVERZY_POLICIY_SUCCESS,
    DOWNLOAD_NON_COVRZY_POLICY_FAILURE,
    DOWNLOAD_NON_COVRZY_POLICY_SUCCESS,
    DOWNLOAD_PURCHASED_POLICY_FAILED,
    DOWNLOAD_PURCHASED_POLICY_SUCCESS,
    GET_NON_COVERZY_POLICIY_FAILED,
    GET_NON_COVERZY_POLICIY_SUCCESS,
    PurchasedPolicyDownloadData,
    VIEW_NON_COVERZY_POLICIY_FAILED,
    VIEW_NON_COVERZY_POLICIY_SUCCESS,
} from '../Actions/PoliciesActions';
import { SHOW_ERROR_HANDLER_MODAL, TOAST_SHOW } from '../Actions/ToastAction';
import { getErrorMessage } from '../../Helper/commonFunction';
import { IReduxState } from '../../utils/types';

interface NonCoverzy {
    payload: FormData;
}

interface ViewNonCoverzy {
    payload: string;
}

interface DownloadPolicyAction {
    payload: PurchasedPolicyDownloadData;
}
interface DownloadNonCovrzy {
    payload: string;
}

export function* AddNonCoverzyPoliciySaga(action: NonCoverzy): unknown {
    try {
        const response = yield call(
            axios.post,
            'package/upload-policy',
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({
                type: ADD_NON_COVERZY_POLICIY_SUCCESS,
                payload: success,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: ADD_NON_COVERZY_POLICIY_FAILED });
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

export function* GetNonCoverzyPoliciySaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            'package/get-non-covrzy-policies',
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_NON_COVERZY_POLICIY_SUCCESS,
                payload: decryptTempData,
                // payload: data
            });
        }
    } catch (e: any) {
        yield put({ type: GET_NON_COVERZY_POLICIY_FAILED });
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

export function* ViewNonCoverzyPolicyDataSaga(action: ViewNonCoverzy): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-non-covrzy-policy/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: VIEW_NON_COVERZY_POLICIY_SUCCESS,
                // payload: data
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: VIEW_NON_COVERZY_POLICIY_FAILED });
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

export function* DeleteNonCoverzyPolicyDataSaga(
    action: ViewNonCoverzy,
): unknown {
    try {
        const response = yield call(
            axios.delete,
            `package/delete-non-covrzy-policy/${action.payload}`,
        );
        const { success, message } = response?.data;

        if (success) {
            yield put({
                type: DELETE_NON_COVERZY_POLICIY_SUCCESS,
                payload: 'success',
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({
            type: DELETE_NON_COVERZY_POLICIY_FAILED,
            payload: 'failed',
        });
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
export function* DownloadNonCovrzyPolicySaga(
    action: DownloadNonCovrzy,
): unknown {
    try {
        const nonCovrzyPolicies = yield select(
            (state: IReduxState) => state.Policies,
        );

        const response = yield call(
            axios.get,
            `package/get-non-covrzy-policy-pdf/${action.payload}`,

            { responseType: 'arraybuffer' },
        );
        const { success } = response?.data;
        const blob = new Blob([response.data], {
            type: 'application/pdf',
        });

        // taking original filename
        const doc_name = nonCovrzyPolicies.view_policy.policy_doc;
        const splitted_doc_name = doc_name.split('/');
        const file_name = splitted_doc_name[1];

        //  pdf download
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const anchorElement = document.createElement('a');
        anchorElement.href = url;
        anchorElement.download = file_name;

        // Programmatically click on the anchor element to initiate the download
        anchorElement.click();

        if (success) {
            yield put({
                type: DOWNLOAD_NON_COVRZY_POLICY_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: 'Downloaded successfully',
                    severity: 'success',
                    show: true,
                },
            });
        }
    } catch (error: any) {
        yield put({ type: DOWNLOAD_NON_COVRZY_POLICY_FAILURE });
        yield put({
            type: SHOW_ERROR_HANDLER_MODAL,
            payload: {
                errorResponse: getErrorMessage(error.response),
                openModal: true,
            },
        });
    }
}

export function* DownloadPurchasedPolicySaga(
    action: DownloadPolicyAction,
): unknown {
    try {
        const response = yield call(
            axios.post,
            'v1/policies/policy-certificate',
            action.payload,
            { responseType: 'arraybuffer' },
        );

        yield put({
            type: DOWNLOAD_PURCHASED_POLICY_SUCCESS,
            payload: response.data,
        });
    } catch (error: any) {
        yield put({ type: DOWNLOAD_PURCHASED_POLICY_FAILED });
        yield put({
            type: SHOW_ERROR_HANDLER_MODAL,
            payload: {
                errorResponse: getErrorMessage(error.response),
                openModal: true,
            },
        });
    }
}

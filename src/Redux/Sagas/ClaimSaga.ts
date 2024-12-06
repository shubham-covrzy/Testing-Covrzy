import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    GET_ACTIVE_PLANS_FAILED,
    GET_ACTIVE_PLANS_SUCCESS,
    GET_IN_ACTIVE_PLANS_FAILED,
    GET_IN_ACTIVE_PLANS_SUCCESS,
    GET_PURCHASED_POLICY_FAILED,
    GET_PURCHASED_POLICY_SUCCESS,
    GET_SINGLE_ACTIVE_PLAN_FAILED,
    GET_SINGLE_ACTIVE_PLAN_SUCCESS,
    UPLOAD_CLAIM_PROOF_FAILED,
    UPLOAD_CLAIM_PROOF_SUCCESS,
    VIEW_ALL_CLAIM_FAILED,
    VIEW_ALL_CLAIM_SUCCESS,
} from '../Actions/ClaimActions';
import { TOAST_SHOW } from '../Actions/ToastAction';

interface SinglePlan {
    payload: {
        id: string;
        is_policy: boolean;
        policy_id: string;
    };
}

interface UploadProof {
    payload: FormData;
}

interface PurchasedPolicyPoints {
    policy_id: string;
}

export function* GetActivePlansSaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-active-package-policy`,
        );
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_ACTIVE_PLANS_SUCCESS, payload: data });
            yield put({
                type: GET_ACTIVE_PLANS_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_ACTIVE_PLANS_FAILED });
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

export function* GetInActivePlansSaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-inactive-package-policy`,
        );
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_ACTIVE_PLANS_SUCCESS, payload: data });
            yield put({
                type: GET_IN_ACTIVE_PLANS_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_IN_ACTIVE_PLANS_FAILED });
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

export function* GetSingleActivePlanSaga(action: SinglePlan): unknown {
    try {
        const is_policy = action.payload?.is_policy ? '?is_policy=true' : '';
        const policy_id = action.payload?.policy_id
            ? `?is_policy=false&policy_id=${action.payload?.policy_id}`
            : '';

        const response = yield call(
            axios.get,
            `package/get-single-active-policy/${action.payload?.id}${is_policy}${policy_id}`,
        );
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_SINGLE_ACTIVE_PLAN_SUCCESS, payload: data });
            yield put({
                type: GET_SINGLE_ACTIVE_PLAN_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_SINGLE_ACTIVE_PLAN_FAILED });
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

export function* ViewAllClaimSaga(): unknown {
    try {
        const response = yield call(axios.get, `user/view-all-claim`);
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: VIEW_ALL_CLAIM_SUCCESS, payload: data });
            yield put({
                type: VIEW_ALL_CLAIM_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: VIEW_ALL_CLAIM_FAILED });
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

export function* UploadClaimProofSaga(actions: UploadProof): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/claim-policy`,
            actions.payload,
        );
        const { data, success, message } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: UPLOAD_CLAIM_PROOF_SUCCESS, payload: data });
            yield put({
                type: UPLOAD_CLAIM_PROOF_SUCCESS,
                payload: decryptTempData,
            });
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
        yield put({ type: UPLOAD_CLAIM_PROOF_FAILED });
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

export function* GetPurchasedPolicyPointsSaga(
    action: PurchasedPolicyPoints,
): unknown {
    try {
        const response = yield call(
            axios.get,
            `/package/get-purchased-policy/${action.policy_id}`,
        );
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;
            yield put({
                type: GET_PURCHASED_POLICY_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PURCHASED_POLICY_FAILED });
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

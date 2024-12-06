import axios from '../../axiosConfig';
import { call, put } from 'redux-saga/effects';
import { TOAST_SHOW } from '../Actions/ToastAction';
import {
    GET_ALL_PACKAGES_FAILED,
    GET_ALL_PACKAGES_SUCCESS,
    GET_PACKAGES_DETAILS_FAILED,
    GET_PACKAGES_DETAILS_SUCCESS,
    GET_POLICIES_LIST_FAILED,
    GET_POLICIES_LIST_SUCCESS,
    GET_POLICY_BY_ID_FAILED,
    GET_POLICY_BY_ID_SUCCESS,
} from '../Actions/HomepageActions';
import { DecryptData } from '../../common/CryptoJSToken';

interface GetPolicyById {
    payload: string;
}

interface PackageDetail {
    payload: string;
}

export function* GetPoliciesListSaga(): unknown {
    try {
        const response = yield call(axios.get, 'package/get-all-policy');
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_POLICIES_LIST_SUCCESS, payload: data });
            yield put({
                type: GET_POLICIES_LIST_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_POLICIES_LIST_FAILED });
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

export function* GetPolicyByIdSaga(action: GetPolicyById): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-policy/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_POLICY_BY_ID_SUCCESS, payload: data });
            yield put({
                type: GET_POLICY_BY_ID_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_POLICY_BY_ID_FAILED });
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

export function* GetAllPackagesSaga(): unknown {
    try {
        const response = yield call(axios.get, 'package/get-all-packages');
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_ALL_PACKAGES_SUCCESS, payload: data });
            yield put({
                type: GET_ALL_PACKAGES_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_ALL_PACKAGES_FAILED });
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

export function* GetPackageDetalisSaga(action: PackageDetail): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-package/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_ALL_PACKAGES_SUCCESS, payload: data });
            yield put({
                type: GET_PACKAGES_DETAILS_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PACKAGES_DETAILS_FAILED });
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

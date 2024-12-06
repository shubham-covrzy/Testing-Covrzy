import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import { TOAST_SHOW } from '../Actions/ToastAction';
import {
    GET_PURCHASED_POLICIES_FAILED,
    GET_PURCHASED_POLICIES_SUCCESS,
    GET_SINGLE_PURCHASED_POLICY_FAILED,
    GET_SINGLE_PURCHASED_POLICY_SUCCESS,
} from '../Actions/PurchasesAction';

interface IPolicyData {
    payload: {
        status: string[];
    };
}

export function* GetPurchasedPoliciesSaga(action: IPolicyData): unknown {
    try {
        const status = action.payload.status;
        let variable = '';
        for (let index = 0; index < status.length; index++) {
            if (index === 0) {
                variable += `?status=${status[index]}`;
            } else {
                variable += `&status=${status[index]}`;
            }
        }

        const response = yield call(axios.get, `/v1/policies${variable}`);
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_PURCHASED_POLICIES_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PURCHASED_POLICIES_FAILED });
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

export function* GetSinglePurchasedPolicySaga(action: any): unknown {
    const policyId: string = action.payload;

    try {
        const response = yield call(axios.get, `/v1/policies/${policyId}`);
        const { success, data } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_SINGLE_PURCHASED_POLICY_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_SINGLE_PURCHASED_POLICY_FAILED });
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

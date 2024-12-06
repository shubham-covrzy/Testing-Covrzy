import axios from '../../axiosConfig';
import { call, put } from 'redux-saga/effects';
import { TOAST_SHOW } from '../Actions/ToastAction';
import {
    CREATE_ORDER_ID_FAILED,
    CREATE_ORDER_ID_SUCCESS,
    GET_COMPANY_PROFILE_STATE_FAILED,
    GET_COMPANY_PROFILE_STATE_SUCCESS,
    GET_PACKAGE_BY_SUB_INDUSTRY_FAILED,
    GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS,
    GET_PACKAGE_WITH_PLAN_FAILED,
    GET_PACKAGE_WITH_PLAN_SUCCESS,
    GET_POLICIES_BY_SUB_INDUSTRY_FAILED,
    GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS,
    GET_POLICY_WITH_PLAN_FAILED,
    GET_POLICY_WITH_PLAN_SUCCESS,
    PURCHASE_COVERAGE_FAILED,
    PURCHASE_COVERAGE_SUCCESS,
    SEND_CUSTOMIZE_COVERAZE_FAILED,
    SEND_CUSTOMIZE_COVERAZE_SUCCESS,
    VERIFY_PAYMENT_FAILED,
    VERIFY_PAYMENT_SUCCESS,
} from '../Actions/DashboardAction';
import { DecryptData } from '../../common/CryptoJSToken';

interface CreateOrder {
    payload: {
        amount: number;
        currency: string;
    };
}

interface CustomizeCoverage {
    payload: string;
}

interface VerifyPayment {
    payload: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    };
}

interface PackageWithPlan {
    payload: string;
}

interface PolicyWithPlan {
    payload: string;
}

export function* GetCompanyProfileStateSaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            `company/get-company-profile-state`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_COMPANY_PROFILE_STATE_SUCCESS, payload: data?.is_companyProfileComplete });
            yield put({
                type: GET_COMPANY_PROFILE_STATE_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_COMPANY_PROFILE_STATE_FAILED });
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

export function* GetPackageBySubIndustrySaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-package-by-subindustry`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS, payload: data?.core });
            yield put({
                type: GET_PACKAGE_BY_SUB_INDUSTRY_SUCCESS,
                payload: decryptTempData?.core,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_PACKAGE_BY_SUB_INDUSTRY_FAILED });
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

export function* GetPoliciesBySubIndustrySaga(): unknown {
    try {
        const response = yield call(
            axios.get,
            'package/get-policy-by-subindustry',
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS, payload: data?.core });
            yield put({
                type: GET_POLICIES_BY_SUB_INDUSTRY_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_POLICIES_BY_SUB_INDUSTRY_FAILED });
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

export function* GetPackageWithPlanSaga(action: PackageWithPlan): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-package-with-plan/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_PACKAGE_WITH_PLAN_SUCCESS,
                payload: decryptTempData,
            });
            // yield put({ type: GET_PACKAGE_WITH_PLAN_SUCCESS, payload: data });
        }
    } catch (e: any) {
        yield put({ type: GET_PACKAGE_WITH_PLAN_FAILED });
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

export function* CraeteOrderIdSaga(actions: CreateOrder): unknown {
    try {
        const response = yield call(
            axios.post,
            `payment/create-order`,
            actions.payload,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: CREATE_ORDER_ID_SUCCESS, payload: data });
            yield put({
                type: CREATE_ORDER_ID_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: CREATE_ORDER_ID_FAILED });
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

export function* PurchaseCoverageSaga(actions: CreateOrder): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/purchase-support-mail`,
            actions.payload,
        );
        const { success, message } = response?.data;

        if (success) {
            // DecryptData responce data
            // const decryptTempData = process.env.REACT_APP_DECRYPT_DATA === "true" ? DecryptData(data) : data

            // yield put({ type: CREATE_ORDER_ID_SUCCESS, payload: data });
            yield put({ type: PURCHASE_COVERAGE_SUCCESS, payload: message });
        }
    } catch (e: any) {
        yield put({ type: PURCHASE_COVERAGE_FAILED });
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

export function* VerifyPaymentSaga(actions: VerifyPayment): unknown {
    try {
        const response = yield call(
            axios.post,
            `payment/checkout/verify-pay`,
            actions.payload,
        );
        const { success, message } = response?.data;

        if (success) {
            // DecryptData responce data
            // const decryptTempData = DecryptData(data ? data : '')

            yield put({ type: VERIFY_PAYMENT_SUCCESS });
            // yield put({ type: VERIFY_PAYMENT_SUCCESS, payload: data });
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
        yield put({ type: VERIFY_PAYMENT_FAILED });
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

export function* GetPolicyWithPlanSaga(action: PolicyWithPlan): unknown {
    try {
        const response = yield call(
            axios.get,
            `package/get-policy-with-plan/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_POLICY_WITH_PLAN_SUCCESS, payload: data });
            yield put({
                type: GET_POLICY_WITH_PLAN_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_POLICY_WITH_PLAN_FAILED });
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

export function* SendCustomizeCoverageSaga(
    actions: CustomizeCoverage,
): unknown {
    try {
        const response = yield call(axios.post, `user/customize-support-mail`, {
            id: actions.payload,
        });
        const { success, message } = response?.data;

        if (success) {
            // DecryptData responce data
            // const decryptTempData = process.env.REACT_APP_DECRYPT_DATA === "true" ? DecryptData(data) : data

            // yield put({ type: CREATE_ORDER_ID_SUCCESS, payload: data });
            yield put({
                type: SEND_CUSTOMIZE_COVERAZE_SUCCESS,
                payload: message,
            });
            // yield put({
            //     type: TOAST_SHOW,
            //     payload: { message: message, severity: "success", show: success },
            // });
        }
    } catch (e: any) {
        yield put({ type: SEND_CUSTOMIZE_COVERAZE_FAILED });
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

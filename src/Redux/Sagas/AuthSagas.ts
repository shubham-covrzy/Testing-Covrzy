import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData, EncryptData } from '../../common/CryptoJSToken';
import { ADDITIONAL, COMPANY } from '../../constants/main';
import { ADD_COMPANY_DETAILS } from '../Actions/AddCoverage';
import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    GET_AUTH_USER_DATA_FAILED,
    GET_AUTH_USER_DATA_SUCCESS,
    GET_COMPANY_TYPE_FAILED,
    GET_COMPANY_TYPE_SUCCESS,
    GET_FUNDING_DETAILS_FAILED,
    GET_FUNDING_DETAILS_SUCCESS,
    GET_INDUSTRY_LIST_FAILED,
    GET_INDUSTRY_LIST_SUCCESS,
    GET_SUB_INDUSTRY_LIST_FAILED,
    GET_SUB_INDUSTRY_LIST_SUCCESS,
    GET_TURN_OVER_LIST_FAILED,
    GET_TURN_OVER_LIST_SUCCESS,
    GET_USER_FOUND,
    GET_USER_NOT_FOUND,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    SAVE_ADDITIONAL_DETAILS,
    SAVE_COMPANY_DETAILS,
    SAVE_PERSONAL_DETAILS_FAILED,
    SAVE_PERSONAL_DETAILS_SUCCESS,
    SUBMIT_SIGN_UP_DETAILS_FAILED,
    SUBMIT_SIGN_UP_DETAILS_SUCCESS,
} from '../Actions/AuthActions';
import { CLEAR_EMAIL_VERIFY_STATE } from '../Actions/EmailVerifyAction';
import { TOAST_SHOW } from '../Actions/ToastAction';
import { NavigateFunction } from 'react-router-dom';
import { SAVE_USER_STATE_ACTIONS } from '../Actions/SessionAction';
import { UPDATE_USER_DATA_SUCCESS } from '../Actions/UserProfileAction';

interface ILogin {
    payload: {
        email: string;
        password: string;
    };
}

interface ForgotPassword {
    payload: {
        email: string;
    };
}

interface ResetPassword {
    payload: {
        data: {
            new_password: string;
            confirm_password: string;
            is_validateToken: boolean;
        };
        token: string;
    };
}

interface ISignUpDetails {
    payload: {
        completed_step: string;
        personalDetails: {
            id: number;
        };
        companyDetails: {
            id: number;
            company_type: number;
            industry: number;
            sub_industry: number;
            turnover: number;
            funding_detail: number;
        };
        additionalDetails: {
            number_of_employee: number;
            previous_policy: boolean;
            policy_name: string;
            policy_start_date: string;
            policy_end_date: string;
            policy_coverage_amount: number;
            policy_insurer: string;
        };
    };
}

interface ISubIndustryList {
    payload: {
        id: string;
    };
}

interface IVerifyPhoneLogin {
    navigate: NavigateFunction;
    payload: {};
    shouldNavigate?: () => boolean;
}

// Login
export function* LoginSaga(action: ILogin): unknown {
    try {
        const response = yield call(axios.post, `user/login`, action.payload, {
            withCredentials: true,
        },);
        const { data, message, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // localStorage.setItem('token', decryptTempData?.token);
            const EncryptedData = EncryptData(decryptTempData);
            // localStorage.setItem('tokenExpiration', data?.tokenExpiryAt);

            yield put({ type: GET_USER_FOUND, payload: EncryptedData });
            yield put({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: decryptTempData,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: GET_USER_NOT_FOUND });
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

// Verify Phone Login
export function* VerifyPhoneLoginSaga(action: IVerifyPhoneLogin): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/verify-phone-login`,
            action.payload,
            {
                withCredentials: true,
            },
        );

        // Extract sessionId from response headers
        const sessionId = response?.headers['x-session-id'] || response?.headers['X-Session-ID'];

        if (sessionId) {
            // Save the sessionId to sessionStorage
            sessionStorage.setItem('sessionId', sessionId);
        }

        const { data, message, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // localStorage.setItem('token', decryptTempData?.token);
            // localStorage.setItem('tokenExpiration', data?.tokenExpiryAt);

            const EncryptedData = EncryptData(decryptTempData);

            yield put({ type: GET_USER_FOUND, payload: EncryptedData });
            yield put({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: decryptTempData,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
            yield put({ type: SAVE_USER_STATE_ACTIONS });
            if (action.shouldNavigate) {
                action.navigate('/quote/info');
            } else {
                action.navigate('/user/dashboard');
            }
        }
    } catch (e: any) {
        yield put({ type: GET_USER_NOT_FOUND });
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

// Forgot Password
export function* ForgotPasswordSaga(action: ForgotPassword): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/forgot-password`,
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({ type: FORGOT_PASSWORD_SUCCESS });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: FORGOT_PASSWORD_FAILED });
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

// Reset Password
export function* ResetPasswordSaga(action: ResetPassword): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/reset-password/${action.payload.token}`,
            action.payload.data,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({ type: RESET_PASSWORD_SUCCESS });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: RESET_PASSWORD_FAILED });
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

// sign-up personal details
export function* SavePersonalDetailSaga(action: any): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/register-user`,
            action.payload,
        );
        const { data, message, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: SAVE_PERSONAL_DETAILS_SUCCESS,
                // payload: { ...action.jsonPayload, profile: data?.profile, id: data.user, company_id: data.id }
                payload: {
                    ...action.jsonPayload,
                    profile: decryptTempData?.profile,
                    id: decryptTempData.user,
                    company_id: decryptTempData.id,
                },
            });
            yield put({ type: CLEAR_EMAIL_VERIFY_STATE });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: SAVE_PERSONAL_DETAILS_FAILED });
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

// sign-up company details
export function* GetCompanyTypeSaga(): unknown {
    try {
        const response = yield call(axios.get, `company/get-company-type`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_COMPANY_TYPE_SUCCESS, payload: data });
            yield put({
                type: GET_COMPANY_TYPE_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_COMPANY_TYPE_FAILED });
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

export function* GetFundingDetailSaga(): unknown {
    try {
        const response = yield call(axios.get, `company/get-funding-details`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_FUNDING_DETAILS_SUCCESS, payload: data });
            yield put({
                type: GET_FUNDING_DETAILS_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_FUNDING_DETAILS_FAILED });
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

export function* GetTurnOverListSaga(): unknown {
    try {
        const response = yield call(axios.get, `company/get-turnover-list`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_TURN_OVER_LIST_SUCCESS, payload: data });
            yield put({
                type: GET_TURN_OVER_LIST_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_TURN_OVER_LIST_FAILED });
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

export function* GetIndustryListSaga(): unknown {
    try {
        const response = yield call(axios.get, `company/get-industry-list`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_INDUSTRY_LIST_SUCCESS, payload: data });
            yield put({
                type: GET_INDUSTRY_LIST_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_INDUSTRY_LIST_FAILED });
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

export function* GetSubIndustryListSaga(action: ISubIndustryList): unknown {
    try {
        const response = yield call(
            axios.get,
            `company/get-subindustry-list/${action.payload}`,
        );
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_SUB_INDUSTRY_LIST_SUCCESS,
                payload: decryptTempData,
            });
            // yield put({ type: GET_SUB_INDUSTRY_LIST_SUCCESS, payload: data });
        }
    } catch (e: any) {
        yield put({ type: GET_SUB_INDUSTRY_LIST_FAILED });
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

// submit signUp details
export function* SaveSignUpDetailSaga(action: ISignUpDetails): unknown {
    try {
        const response = yield call(
            axios.post,
            `company/register-user-company`,
            action.payload,
        );
        const { message, success, status } = response?.data;

        if (success) {
            if (action.payload.completed_step === COMPANY) {
                yield put({
                    type: SAVE_COMPANY_DETAILS,
                    payload: action.payload.companyDetails,
                });
                yield put({
                    type: ADD_COMPANY_DETAILS,
                    payload: action.payload.companyDetails,
                });
            } else if (action.payload.completed_step === ADDITIONAL) {
                yield put({
                    type: SAVE_ADDITIONAL_DETAILS,
                    payload: action.payload.additionalDetails,
                });
                // yield put({
                //     type: ADD_ADDITIONAL_DETAILS,
                //     payload: action.payload.additionalDetails
                // });
            }

            yield put({
                type: SUBMIT_SIGN_UP_DETAILS_SUCCESS,
                payload:
                    action.payload.completed_step === ADDITIONAL ? status : '',
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: SUBMIT_SIGN_UP_DETAILS_FAILED });
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

// Get user Profile
export function* GetAuthUserProfileSaga(): unknown {
    try {
        const response = yield call(axios.get, `user/get-user-profile`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            const EncryptedData = EncryptData(decryptTempData);

            // yield put({ type: GET_USER_DATA_SUCCESS, payload: data });
            yield put({
                type: GET_AUTH_USER_DATA_SUCCESS,
                payload: EncryptedData,
            });
            yield put({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: decryptTempData,
            });
            yield put({
                type: SAVE_USER_STATE_ACTIONS
            })

        }
    } catch (e: any) {
        yield put({ type: GET_AUTH_USER_DATA_FAILED });
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
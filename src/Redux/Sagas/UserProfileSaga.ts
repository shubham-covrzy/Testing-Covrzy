import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData, EncryptData } from '../../common/CryptoJSToken';
import { TOAST_SHOW } from '../Actions/ToastAction';
import {
    ADD_USER_DATA_TEAM_FAILED,
    ADD_USER_DATA_TEAM_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_USER_DATA_TEAM_FAILED,
    DELETE_USER_DATA_TEAM_SUCCESS,
    GET_COMPANY_DATA_FAILED,
    GET_COMPANY_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_TEAM_FAILED,
    GET_USER_DATA_TEAM_SUCCESS,
    UPDATE_COMPANY_DATA_FAILED,
    UPDATE_COMPANY_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_TEAM_FAILED,
    UPDATE_USER_DATA_TEAM_SUCCESS,
} from '../Actions/UserProfileAction';

interface IUpdateUser {
    payload: FormData;
}

interface ChangePass {
    payload: {
        current_pass: string;
        new_pass: string;
    };
}

interface AddUser {
    payload: FormData;
}

interface DeleteUser {
    payload: String;
}

interface UpdateCompany {
    payload: {
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

// Get user Profile
export function* GetUserProfileSaga(): unknown {
    try {
        const response = yield call(axios.get, `user/get-user-profile`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_USER_DATA_SUCCESS, payload: data });
            yield put({
                type: GET_USER_DATA_SUCCESS,
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_USER_DATA_FAILED });
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

// Update user Profile
export function* UpdateUserProfileSaga(action: IUpdateUser): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/edit-user-profile`,
            action.payload,
        );

        const { message, success, data } = response?.data;

        if (success) {
            yield put({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: data,
            });
            // yield put({
            //     type: TOAST_SHOW,
            //     payload: { message: message, severity: 'success', show: true },
            // });
        }
    } catch (e: any) {
        yield put({ type: UPDATE_USER_DATA_FAILED });
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

// Change Password
export function* ChangePasswordSaga(action: ChangePass): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/change-password`,
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({ type: CHANGE_PASSWORD_SUCCESS });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: CHANGE_PASSWORD_FAILED });
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

// Get Company Data
export function* GetCompanyDataSaga(): unknown {
    try {
        const response = yield call(axios.get, `company/get-company-details`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            // yield put({ type: GET_COMPANY_DATA_SUCCESS, payload: data[0] });
            yield put({
                type: GET_COMPANY_DATA_SUCCESS,
                payload: decryptTempData[0],
            });
        }
    } catch (e: any) {
        yield put({ type: GET_COMPANY_DATA_FAILED });
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

// Update Company details
export function* UpdateCompanyDataSaga(action: UpdateCompany): unknown {
    try {
        const response = yield call(
            axios.post,
            `company/company-info-edit`,
            action.payload,
        );
        const { message, success, status } = response?.data;

        if (success) {
            yield put({
                type: UPDATE_COMPANY_DATA_SUCCESS,
                payload: status,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: UPDATE_COMPANY_DATA_FAILED });
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

///// Edit Team Settings /////
// Add user
export function* AddUserDataSaga(action: AddUser): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/add-user-profile`,
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({
                type: ADD_USER_DATA_TEAM_SUCCESS,
                payload: success,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: ADD_USER_DATA_TEAM_FAILED });
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

// Get user
export function* GetUserDataSaga(): unknown {
    try {
        const response = yield call(axios.get, `user/get-my-team`);
        const { data, success } = response?.data;

        if (success) {
            // DecryptData responce data
            const decryptTempData =
                process.env.REACT_APP_DECRYPT_DATA === 'true'
                    ? DecryptData(data)
                    : data;

            yield put({
                type: GET_USER_DATA_TEAM_SUCCESS,
                // payload: data
                payload: decryptTempData,
            });
        }
    } catch (e: any) {
        yield put({ type: GET_USER_DATA_TEAM_FAILED });
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

// Edit user
export function* UpdateUserDataSaga(action: AddUser): unknown {
    try {
        const response = yield call(
            axios.post,
            `user/edit-team-member-profile`,
            action.payload,
        );
        const { message, success } = response?.data;

        if (success) {
            yield put({
                type: UPDATE_USER_DATA_TEAM_SUCCESS,
                payload: success,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: UPDATE_USER_DATA_TEAM_FAILED });
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

// Delete User
export function* DeleteUserDataSaga(action: DeleteUser): unknown {
    try {
        const response = yield call(
            axios.delete,
            `user/delete-team-member/${action.payload}`,
        );
        const { success, message } = response?.data;

        if (success) {
            yield put({
                type: DELETE_USER_DATA_TEAM_SUCCESS,
                payload: success,
            });
            yield put({
                type: TOAST_SHOW,
                payload: { message: message, severity: 'success', show: true },
            });
        }
    } catch (e: any) {
        yield put({ type: DELETE_USER_DATA_TEAM_FAILED });
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

import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    ADD_NON_COVERZY_POLICIY_FAILED,
    ADD_NON_COVERZY_POLICIY_SUCCESS,
    DELETE_NON_COVERZY_POLICIY_FAILED,
    DELETE_NON_COVERZY_POLICIY_SUCCESS,
    GET_NON_COVERZY_POLICIY_FAILED,
    GET_NON_COVERZY_POLICIY_SUCCESS,
    PurchasedPolicyDownloadData,
    VIEW_NON_COVERZY_POLICIY_FAILED,
    VIEW_NON_COVERZY_POLICIY_SUCCESS,
} from '../Actions/PoliciesActions';
import { SHOW_ERROR_HANDLER_MODAL, TOAST_SHOW } from '../Actions/ToastAction';
import {
    GET_CITY_FAILURE_RESPONSE,
    GET_CITY_SUCCESS_RESPONSE,
    INITIATE_PURCHASE_POLICY_FAILED,
    INITIATE_PURCHASE_POLICY_SUCCESS,
    MANUAL_PURCHASE_POLICY_FAILURE_RESPONSE,
} from '../Actions/PolicyInputAction';
import { IReduxState } from '../../utils/types';
import { getErrorMessage } from '../../Helper/commonFunction';

interface NonCoverzy {
    payload: FormData;
}

interface InsuranceData {
    payload: any;
    navigate: any;
}

interface ViewNonCoverzy {
    payload: string;
}

interface DownloadPolicyAction {
    payload: PurchasedPolicyDownloadData;
}
interface IStateDetails {
    payload: {
        state_name: string;
    };
}
interface IManualPurchase {
    payload: {
        quoteId: string;
        correlationId: string;
        receiptId: string;
        policyStartDate: string;
    };
}

export function* GetCityNamesSaga(action: IStateDetails): unknown {
    try {
        const response = yield call(axios.get, `data/cities`, {
            params: {
                state: action.payload.state_name,
            },
        });
        const { data } = response;
        yield put({ type: GET_CITY_SUCCESS_RESPONSE, payload: data.data });
    } catch (er) {
        yield put({ type: GET_CITY_FAILURE_RESPONSE });
    }
}

export function* GetInitiatePurchasePolicySaga(action: InsuranceData): unknown {
    try {
        const Payment = yield select((state: IReduxState) => state.Payment);
        const Recommendation = yield select(
            (state: IReduxState) => state.Recommendations,
        );

        const { quoteResponse } = yield select(
            (state: IReduxState) => state.LiabilityQuote,
        );

        const { recommendationResponse, policyStartDate } = Recommendation;

        const date = policyStartDate;

        const { paymentResponse } = Payment;

        const initiatePurchasePayload = action.payload;
        const customerDetails = action.payload.personalDetail;
        const insuredDetails = initiatePurchasePayload.insuredDetail;
        const contactDetail = initiatePurchasePayload.contactDetail;

        const payloadData = {
            receiptId: paymentResponse.receiptId,
            correlationId: recommendationResponse.recommendationId,
            risks: quoteResponse.risks,
            policyStartDate: date,
            businessType: 'New Business',

            customerDetails: {
                customerType: initiatePurchasePayload.customerType,
                email: contactDetail.email,
                phoneNumber: contactDetail.phone,
                customerName:
                    customerDetails.firstName + ' ' + customerDetails.lastName,
                dateOfBirth: customerDetails.dob,
                panCardNo: customerDetails.pan,
                ...initiatePurchasePayload.addressDetail,
            },
            insuredDataDetails: {
                insuredName:
                    insuredDetails.insuredFirstName +
                    ' ' +
                    insuredDetails.insuredLastName,
                InsuredDateOfBirth: insuredDetails.insuredDOB,
                insuredAge: insuredDetails.insuredAge,
                insuredGender: insuredDetails.insuredGender,
                insuredRelation: insuredDetails.insuredRelation,
            },
        };

        const response = yield call(
            axios.post,
            `v1/purchases/initiate-purchase`,
            payloadData,
        );

        const { success, data } = response?.data;
        const payload = data;

        if (success) {
            yield put({ type: INITIATE_PURCHASE_POLICY_SUCCESS, payload });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: 'Policy purchased successfully',
                    severity: 'success',
                    show: true,
                },
            });
            action.navigate('/quote/policy-certificate');
        } else {
            yield put({ type: INITIATE_PURCHASE_POLICY_FAILED });
        }
    } catch (error: any) {
        yield put({ type: INITIATE_PURCHASE_POLICY_FAILED });
        yield put({
            type: SHOW_ERROR_HANDLER_MODAL,
            payload: {
                errorResponse: getErrorMessage(error.response),
                openModal: true,
            },
        });
    }
}

export function* ManualPurchasePolicySaga(action: IManualPurchase): unknown {
    try {
        const response = yield call(
            axios.post,
            `v1/purchases/initiate-manual-purchase`,
            action.payload,
        );
    } catch (error) {
        yield put({ type: MANUAL_PURCHASE_POLICY_FAILURE_RESPONSE });
    }
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

function push(arg0: string): any {
    throw new Error('Function not implemented.');
}

import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import {
    RECOMMENDATION_API_FAILURE_RESPONSE,
    RECOMMENDATION_API_SUCCESS_RESPONSE,
} from '../Actions/RecommendationAction';
import { IReduxState } from '../../utils/types';
import { SHOW_ERROR_HANDLER_MODAL, TOAST_SHOW } from '../Actions/ToastAction';
import { getErrorMessage } from '../../Helper/commonFunction';
import { response } from 'express';

interface IRecommendData {
    payload: {
        legalName: string;
        annualTurnover: string;
        fundingType: boolean;
        fundingAmount: string;
        noOfEmployee: number;
        businessCategory: string;
    };
}

export function* GetRecommendationsSaga(actions: IRecommendData): unknown {
    try {
        const state = yield select(
            (state: IReduxState) => state.CustomerInformation,
        );

        const { policies, businessType } = state;

        let payload = {};

        if (policies.length > 0) {
            const risk = policies.flatMap((item: any) => item.risks);

            if (businessType === 'sme') {
                payload = {
                    recType: 'sumInsured',
                    businessType: 'sme',
                    policies: risk,
                    businessCategory: actions.payload.businessCategory,
                    annualTurnover: actions.payload.annualTurnover,
                };
            } else {
                payload = {
                    recType: 'sumInsured',
                    businessType: 'startup',
                    policies: risk,
                    businessCategory: actions.payload.businessCategory,
                    annualTurnover: actions.payload.annualTurnover,
                    noOfEmployee: actions.payload.noOfEmployee,
                    fundingType: actions.payload.fundingType
                        ? 'funded'
                        : 'bootstrapped',
                };
            }
        } else {
            if (businessType === 'sme') {
                payload = {
                    recType: 'policies',
                    businessType: 'sme',
                    businessCategory: actions.payload.businessCategory,
                    annualTurnover: actions.payload.annualTurnover,
                };
            } else {
                payload = {
                    recType: 'policies',
                    businessType: 'startup',
                    businessCategory: actions.payload.businessCategory,
                    annualTurnover: actions.payload.annualTurnover,
                    noOfEmployee: actions.payload.noOfEmployee,
                    fundingType: actions.payload.fundingType
                        ? 'funded'
                        : 'bootstrapped',
                };
            }
        }

        const response = yield call(axios.post, `v1/recommendations`, payload);
        const { success, data } = response?.data;

        if (success) {
            yield put({
                type: RECOMMENDATION_API_SUCCESS_RESPONSE,
                payload: data,
            });
            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: 'Recommendation generated',
                    severity: 'success',
                    show: true,
                },
            });
        }
    } catch (error: any) {
        yield put({ type: RECOMMENDATION_API_FAILURE_RESPONSE });
        yield put({
            type: SHOW_ERROR_HANDLER_MODAL,
            payload: {
                errorResponse: getErrorMessage(error.response),
                openModal: true,
            },
        });
        // yield put({
        //     type: TOAST_SHOW,
        //     payload: {
        //         message: 'Something went wrong',
        //         severity: 'danger',
        //         show: true,
        //     },
        // });
    }
}

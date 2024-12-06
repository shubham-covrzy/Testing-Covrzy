import { call, put, select } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import {
    LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE,
    LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE,
} from '../Actions/QuoteAction';
import { SHOW_ERROR_HANDLER_MODAL, TOAST_SHOW } from '../Actions/ToastAction';
import { v4 as uuidv4 } from 'uuid';
import { IReduxState } from '../../utils/types';
import { getErrorMessage } from '../../Helper/commonFunction';

interface IProducts {
    payload: Map<string, string>;
}

export function* GetQuoteSaga(actions: IProducts): unknown {
    try {
        const correlationId = uuidv4();
        const coverSIMap = actions.payload;

        const { policyStartDate, policyEndDate } = yield select(
            (state: IReduxState) => state.Recommendations,
        );

        const { selectedCard } = yield select(
            (state: IReduxState) => state.PurchaseQuote,
        );

        const requestBody = {
            correlationId,
            policyStartDate: policyStartDate,
            policyEndDate: policyEndDate,
            risks: covertSelectedProductsToRisks(selectedCard, coverSIMap),
        };

        const response = yield call(
            axios.post,
            'v1/liability/quotes',
            requestBody,
        );
        const { success, data } = response?.data;

        if (success) {
            yield put({
                type: LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE,
                payload: data,
            });

            yield put({
                type: TOAST_SHOW,
                payload: {
                    message: 'Quote generated',
                    severity: 'success',
                    show: true,
                },
            });
        }
        //  else {
        //   yield put({ type: LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE });
        //   yield put({
        //     type: TOAST_SHOW,
        //     payload: {
        //       message: 'Something went wrong',
        //       severity: 'danger',
        //       show: true,
        //     },
        //   });
        // }
    } catch (error: any) {
        yield put({ type: LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE });
        yield put({
            type: SHOW_ERROR_HANDLER_MODAL,
            payload: {
                errorResponse: getErrorMessage(error.response),
                openModal: true,
            },
        });
    }
}

function covertSelectedProductsToRisks(
    selectedProducts: any[],
    coverSIMap: Map<string, string>,
): any {
    const risks: any[] = [];
    selectedProducts.forEach((data) => {
        const index = risks.findIndex(
            (risk) => risk.riskName === data.riskName,
        );

        if (index === -1) {
            const coverSI = coverSIMap.get(data.name);
            const coverSIObject = coverSI || JSON.parse(data.coverSI);
            // coverSI !== null ? JSON.parse(data.coverSI) : null;
            risks.push({
                riskName: data.riskName,
                covers: [
                    {
                        coverName: data.coverName,
                        coverSI: coverSIObject,
                    },
                ],
            });
        } else {
            const coverSI = coverSIMap.get(data.coverName);
            const coverSIObject = coverSI || JSON.parse(data.coverSI);
            // const coverSIObject =
            //     coverSI !== null ? JSON.parse(data.coverSI) : null;
            risks[index].covers.push({
                coverName: data.coverName,
                coverSI: coverSIObject,
            });
        }
    });

    return risks;
}

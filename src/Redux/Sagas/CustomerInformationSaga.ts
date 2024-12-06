import { call, put } from 'redux-saga/effects';
import axios from '../../axiosConfig';
import {
    GST_API_FAILURE_RESPONSE,
    GST_API_SUCCESS_RESPONSE,
} from '../Actions/CustomerInformationAction';
import { TOAST_SHOW } from '../Actions/ToastAction';

interface IGstData {
    payload: {
        gstin: string;
    };
}

export function* GetGstApiIntegrationSaga(actions: IGstData): unknown {
    try {
        const response = yield call(axios.get, `data/gst`, {
            params: {
                gstin: actions.payload.gstin,
            },
        });

        const { success, data } = response.data;

        if (success) {
            yield put({ type: GST_API_SUCCESS_RESPONSE, payload: data });
        } else {
            yield put({ type: GST_API_FAILURE_RESPONSE });
        }
    } catch (error) {
        yield put({ type: GST_API_FAILURE_RESPONSE });
        yield put({
            type: TOAST_SHOW,
            payload: {
                message: 'Something went wrong',
                severity: 'danger',
                show: true,
            },
        });
    }
}

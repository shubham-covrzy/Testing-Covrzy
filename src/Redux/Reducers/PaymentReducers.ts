import {
    CLEAR_PAYMENT_STATE,
    GET_PARTICULAR_PAYMENT_FAILED,
    GET_PARTICULAR_PAYMENT_REQUEST,
    GET_PARTICULAR_PAYMENT_SUCCESS,
    GET_PAYMENT_HISTORY_FAILED,
    GET_PAYMENT_HISTORY_REQUEST,
    GET_PAYMENT_HISTORY_SUCCESS,
    CREATE_PAYMENT_ORDER,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILED,
    CREATE_VERIFY_PAYMENT_REQUEST,
    PAYMENT_VERIFICATION_SUCCESS,
    PAYMENT_VERIFICATION_FAILURE,
    DOWNLOAD_PAYMENT_RECEIPT_REQUEST,
    DOWNLOAD_PAYMENT_RECEIPT_SUCCESS,
    DOWNLOAD_PAYMENT_RECEIPT_FAILED,
    GET_PAYMENT_BY_ID_SUCCESS,
    SAVE_RETRY_PAYMENT_STATE_FALSE,
    SAVE_RETRY_PAYMENT_STATE_TRUE,
    GET_PAYMENT_BY_ID,
    GET_PAYMENT_BY_ID_FAILURE,
} from '../Actions/PaymentActions';

const InitialState = {
    loading: false,
    req_loading: false,
    payment_history: [],
    payment_info: {},
    orderCreatedResponse: {},
    payment_success: false,
    is_getData: '',
    receiptId: '',
    receiptPDF: {},
    paymentResponse: {},
    paymentRetry: false,
    isPaymentCompleted: false,
};

export const PaymentReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case GET_PAYMENT_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                payment_history: action.payload,
            };

        case GET_PAYMENT_HISTORY_FAILED:
            return {
                ...state,
                loading: false,
                payment_history: [],
            };

        case GET_PARTICULAR_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                is_getData: '',
                payment_info: {},
            };

        case GET_PARTICULAR_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payment_info: action.payload,
                is_getData: 'success',
            };

        case GET_PARTICULAR_PAYMENT_FAILED:
            return {
                ...state,
                loading: false,
                payment_info: {},
                is_getData: 'fail',
            };

        case CLEAR_PAYMENT_STATE:
            return {
                ...state,
                loading: false,
                is_getData: '',
            };

        case CREATE_PAYMENT_ORDER:
            return {
                ...state,
                req_loading: true,
            };

        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                req_loading: false,
                orderCreatedResponse: action.payload,
            };

        case CREATE_PAYMENT_FAILED:
            return {
                ...state,
                req_loading: false,
                orderCreatedResponse: {},
            };

        case CREATE_VERIFY_PAYMENT_REQUEST:
            return {
                ...state,
                req_loading: true,
            };

        case PAYMENT_VERIFICATION_SUCCESS:
            return {
                ...state,
                payment_success: true,
                orderCreatedResponse: {},
            };

        case PAYMENT_VERIFICATION_FAILURE:
            return {
                ...state,
                payment_success: false,
            };

        case DOWNLOAD_PAYMENT_RECEIPT_REQUEST:
            return {
                ...state,
                receiptId: action.payload.receiptId,
                loading: true,
            };

        case DOWNLOAD_PAYMENT_RECEIPT_SUCCESS:
            return {
                ...state,
                receiptPDF: {
                    ...state.receiptPDF,
                    [state.receiptId]: action.payload,
                },
                loading: false,
            };

        case DOWNLOAD_PAYMENT_RECEIPT_FAILED:
            return {
                ...state,
                loading: false,
            };

        case GET_PAYMENT_BY_ID:
            return {
                ...state,
                loading: true,
            };
        case GET_PAYMENT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentResponse: action.payload,
            };

        case GET_PAYMENT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                paymentResponse: {},
            };
        case SAVE_RETRY_PAYMENT_STATE_TRUE:
            return {
                ...state,
                paymentRetry: true,
                orderCreatedResponse: {},
            };

        case SAVE_RETRY_PAYMENT_STATE_FALSE:
            return {
                ...state,
                paymentRetry: false,
            };

        default:
            return state;
    }
};

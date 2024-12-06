import {
    LIABILITY_QUOTE_API_REQUEST,
    LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE,
    LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE,
    CLEAR_QUOTE_DATA_ACTION,
    CLEAR_NAVIGATOR_ACTION,
} from '../Actions/QuoteAction';

const initialState = {
    loading: false,
    navigator: false,
    quoteResponse: {},
};

export const LiabilityQuoteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIABILITY_QUOTE_API_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE:
            return {
                ...state,
                loading: false,
                navigator: true,
                quoteResponse: action.payload,
            };

        case LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE:
            return {
                ...state,
                loading: false,
                navigator: false,
            };

        case CLEAR_QUOTE_DATA_ACTION:
            return {
                ...state,
                quoteResponse: {},
            };

        case CLEAR_NAVIGATOR_ACTION:
            return {
                ...state,
                navigator: false,
            };

        default:
            return state;
    }
};

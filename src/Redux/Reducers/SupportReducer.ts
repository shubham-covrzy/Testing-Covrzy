import {
    ADD_SUPPORT_MAIL_FAILED,
    ADD_SUPPORT_MAIL_REQUEST,
    ADD_SUPPORT_MAIL_SUCCESS,
    CLEAR_SUPPORT_RESPONSE,
    GET_SUPPORT_TICKET_FAILED,
    GET_SUPPORT_TICKET_REQUEST,
    GET_SUPPORT_TICKET_SUCCESS,
    REQUEST_A_CALL_BACK_SUCCESS,
    REQUEST_A_CALL_BACK_FAILURE,
} from '../Actions/SupportAction';

const InitialState = {
    loading: false,
    success: false,
    support_tickets: [],
    callback_success: false,
};

export const SupportReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case ADD_SUPPORT_MAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_SUPPORT_MAIL_SUCCESS:
            return {
                loading: false,
                success: true,
            };

        case ADD_SUPPORT_MAIL_FAILED:
            return {
                loading: false,
                success: false,
            };

        case GET_SUPPORT_TICKET_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_SUPPORT_TICKET_SUCCESS:
            return {
                loading: false,
                support_tickets: action.payload,
            };

        case GET_SUPPORT_TICKET_FAILED:
            return {
                loading: false,
                support_tickets: [],
            };
        case REQUEST_A_CALL_BACK_SUCCESS:
            return {
                callback_success: true,
            };
        case REQUEST_A_CALL_BACK_FAILURE:
            return {
                callback_success: false,
            };

        case CLEAR_SUPPORT_RESPONSE:
            return InitialState;

        default:
            return state;
    }
};

import {
    CLOSE_ERROR_HANDLER_MODAL,
    SHOW_ERROR_HANDLER_MODAL,
    TOAST_HIDE,
    TOAST_SHOW,
} from '../Actions/ToastAction';

const ToastInitialState = {
    show: false,
    message: '',
    severity: '',
    errorResponse: '',
    openModal: false,
};

export const ToastReducer = (state = ToastInitialState, action: any) => {
    switch (action.type) {
        case TOAST_SHOW:
            return {
                ...state,
                show: action.payload.show,
                message: action.payload.message,
                severity: action.payload.severity,
            };

        case TOAST_HIDE:
            return {
                show: false,
                message: '',
                severity: '',
            };

        case SHOW_ERROR_HANDLER_MODAL:
            return {
                ...state,
                errorResponse: action.payload.errorResponse,
                openModal: true,
            };
        case CLOSE_ERROR_HANDLER_MODAL:
            return {
                ...state,
                errorResponse: '',
                openModal: false,
            };

        default:
            return { ...state };
    }
};

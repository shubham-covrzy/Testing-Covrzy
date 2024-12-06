// export const TOAST_INIT: any = 'TOAST_INIT';
export const TOAST_SHOW = 'TOAST_SHOW';
export const TOAST_HIDE = 'TOAST_HIDE';
export const SHOW_ERROR_HANDLER_MODAL = 'SHOW_ERROR_HANDLER_MODAL';
export const CLOSE_ERROR_HANDLER_MODAL = 'CLOSE_ERROR_HANDLER_MODAL';

export interface IToastProps {
    show: boolean;
    message: string;
    severity: string | any;
}

export const ToastAction = (data: IToastProps) => {
    return { type: TOAST_SHOW, payload: data };
};

export const CloseErrorHandlerModalAction = () => {
    return { type: CLOSE_ERROR_HANDLER_MODAL };
};

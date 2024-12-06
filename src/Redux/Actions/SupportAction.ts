export const ADD_SUPPORT_MAIL_REQUEST: any = 'ADD_SUPPORT_MAIL_REQUEST';
export const ADD_SUPPORT_MAIL_SUCCESS: string = 'ADD_SUPPORT_MAIL_SUCCESS';
export const ADD_SUPPORT_MAIL_FAILED: string = 'ADD_SUPPORT_MAIL_FAILED';

export const GET_SUPPORT_TICKET_REQUEST: any = 'GET_SUPPORT_TICKET_REQUEST';
export const GET_SUPPORT_TICKET_SUCCESS: string = 'GET_SUPPORT_TICKET_SUCCESS';
export const GET_SUPPORT_TICKET_FAILED: string = 'GET_SUPPORT_TICKET_FAILED';

export const REQUEST_A_CALL_BACK_REQUEST: any = 'REQUEST_A_CALL_BACK_REQUEST';
export const REQUEST_A_CALL_BACK_SUCCESS: string =
    'REQUEST_A_CALL_BACK_SUCCESS';
export const REQUEST_A_CALL_BACK_FAILURE: string =
    'REQUEST_A_CALL_BACK_FAILURE';

export const CLEAR_SUPPORT_RESPONSE: String = 'CLEAR_SUPPORT_RESPONSE';

export interface SupportMail {
    question: string;
    Name: string;
    email_address: string;
    message: string;
    phone_no: string;
}
export interface RequestCallBack {
    name: string;
    companyName: string;
    // email: string;
    phone: string;
    message: string;
}

export const AddSupportMailAction = (data: SupportMail) => {
    return { type: ADD_SUPPORT_MAIL_REQUEST, payload: data };
};

export const GetSupportTicketsAction = () => {
    return { type: GET_SUPPORT_TICKET_REQUEST };
};

export const SaveRequestCallBackAction = (data: RequestCallBack) => {
    return { type: REQUEST_A_CALL_BACK_REQUEST, payload: data };
};

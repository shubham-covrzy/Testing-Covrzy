import { date } from 'yup';

export const GET_PAYMENT_HISTORY_REQUEST: any = 'GET_PAYMENT_HISTORY_REQUEST';
export const GET_PAYMENT_HISTORY_SUCCESS: string =
    'GET_PAYMENT_HISTORY_SUCCESS';
export const GET_PAYMENT_HISTORY_FAILED: string = 'GET_PAYMENT_HISTORY_FAILED';
export const CREATE_PAYMENT_ORDER: any = 'CREATE_PAYMENT_ORDER';
export const CREATE_PAYMENT_SUCCESS: string = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILED: string = 'CREATE_PAYMENT_FAILED';
export const CREATE_VERIFY_PAYMENT_REQUEST: any =
    'CREATE_VERIFY_PAYMENT_REQUEST';
export const PAYMENT_VERIFICATION_SUCCESS: string =
    'PAYMENT_VERIFICATION_SUCCESS';
export const PAYMENT_VERIFICATION_FAILURE: any = 'PAYMENT_VERIFICATION_FAILURE';
export const SAVE_PAYMENT_RESPONSE: string = 'SAVE_PAYMENT_RESPONSE';

export const GET_PARTICULAR_PAYMENT_REQUEST: any =
    'GET_PARTICULAR_PAYMENT_REQUEST';
export const GET_PARTICULAR_PAYMENT_SUCCESS: string =
    'GET_PARTICULAR_PAYMENT_SUCCESS';
export const GET_PARTICULAR_PAYMENT_FAILED: string =
    'GET_PARTICULAR_PAYMENT_FAILED';

export const CLEAR_PAYMENT_STATE: string = 'CLEAR_PAYMENT_STATE';

export const DOWNLOAD_PAYMENT_RECEIPT_REQUEST: any =
    'DOWNLOAD_PAYMENT_RECEIPT_REQUEST';
export const DOWNLOAD_PAYMENT_RECEIPT_SUCCESS: string =
    'DOWNLOAD_PAYMENT_RECEIPT_SUCCESS';
export const DOWNLOAD_PAYMENT_RECEIPT_FAILED: string =
    'DOWNLOAD_PAYMENT_RECEIPT_FAILED';
export const GET_PAYMENT_BY_ID: any = 'GET_PAYMENT_BY_ID';
export const GET_PAYMENT_BY_ID_SUCCESS = 'GET_PAYMENT_BY_ID_SUCCESS';
export const GET_PAYMENT_BY_ID_FAILURE = 'GET_PAYMENT_BY_ID_FAILURE';

export const SAVE_PAYMENT_RECEIPT: any = 'SAVE_PAYMENT_RECEIPT';

// need to rename it
export const SAVE_RETRY_PAYMENT_STATE_FALSE: string =
    'SAVE_RETRY_PAYMENT_STATE_FALSE';
export const SAVE_RETRY_PAYMENT_STATE_TRUE: string =
    'SAVE_RETRY_PAYMENT_STATE_FALSE';

export interface PaymentReceiptDownloadData {
    receiptId: string;
}

interface CreateOrder {
    amount: number;
    tax: number;
    description: string;
    correlationId?: string;
}

interface VerifyPayment {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface ISavePaymentReceipt {
    formData: FormData;
}
export const GetPaymentHistoryAction = () => {
    return { type: GET_PAYMENT_HISTORY_REQUEST };
};

export const GetParticularPaymentAction = (data: number) => {
    return { type: GET_PARTICULAR_PAYMENT_REQUEST, payload: data };
};

export const ClearPaymentStateAction = () => {
    return { type: CLEAR_PAYMENT_STATE };
};

export const CreatePaymentOrderAction = (data: CreateOrder) => {
    return { type: CREATE_PAYMENT_ORDER, payload: data };
};

export const verifyPaymentRequestAction = (data: VerifyPayment) => {
    return { type: CREATE_VERIFY_PAYMENT_REQUEST, payload: data };
};
export const paymentVerificationSuccessAction = (data: any) => {
    return { type: PAYMENT_VERIFICATION_SUCCESS, payload: data };
};
export const paymentVerificationFailureAction = (data: any) => {
    return { type: PAYMENT_VERIFICATION_FAILURE, payload: data };
};

export const DownloadPaymentReceiptAction = (
    data: PaymentReceiptDownloadData,
) => {
    return { type: DOWNLOAD_PAYMENT_RECEIPT_REQUEST, payload: data };
};

export const GetPaymentById = (receiptId: string) => {
    return {
        type: GET_PAYMENT_BY_ID,
        payload: { receiptId },
    };
};

export const SavePaymentReceipt = (data: ISavePaymentReceipt) => {
    return { type: SAVE_PAYMENT_RECEIPT, payload: data };
};

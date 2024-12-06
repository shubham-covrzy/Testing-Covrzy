export const LIABILITY_QUOTE_API_REQUEST: any = 'LIABILITY_QUOTE_API_REQUEST';
export const LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE: any =
    'LIABILITY_QUOTE_API_REQUEST_ERROR_RESPONSE';
export const LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE: any =
    'LIABILITY_QUOTE_API_REQUEST_SUCCESS_RESPONSE';

export const CLEAR_QUOTE_DATA_ACTION: string = 'CLEAR_QUOTE_DATA_ACTION';

export const CLEAR_NAVIGATOR_ACTION: string = 'CLEAR_NAVIGATOR_ACTION';

export const liabilityQuoteApiIntegrationAction = (
    data: Map<string, string>,
) => {
    return { type: LIABILITY_QUOTE_API_REQUEST, payload: data };
};

export const ClearQuoteDataAction = () => {
    return { type: CLEAR_QUOTE_DATA_ACTION };
};

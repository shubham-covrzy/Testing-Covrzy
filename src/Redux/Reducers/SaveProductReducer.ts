import {
    SELECTED_PRODUCT_CARD_ACTION,
    SAVE_TOTAL_AMOUNTS_OF_PRODUCTS,
    CLEAR__SELECTED_PRODUCTS,
} from '../Actions/SaveProductAction';

const InitialStates = {
    selectedCard: [],
    gst: '',
    total: '',
    grandTotal: '',
};

export const PurchaseQuoteReducer = (state = InitialStates, action: any) => {
    switch (action.type) {
        case SELECTED_PRODUCT_CARD_ACTION:
            return {
                ...state,
                selectedCard: action.payload.selectedCards,
            };
        case SAVE_TOTAL_AMOUNTS_OF_PRODUCTS:
            return {
                ...state,
                gst: action.payload,
                total: action.payload,
                grandTotal: action.payload,
            };

        case CLEAR__SELECTED_PRODUCTS:
            return {
                ...state,
                selectedCard: [],
            };
        default:
            return state;
    }
};

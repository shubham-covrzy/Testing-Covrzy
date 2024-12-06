export const SELECTED_PRODUCT_CARD_ACTION: string =
    'SELECTED_PRODUCT_CARD_ACTION';
export const SAVE_TOTAL_AMOUNTS_OF_PRODUCTS: string =
    'SAVE_TOTAL_AMOUNTS_OF_PRODUCTS';

export const CLEAR__SELECTED_PRODUCTS: any = 'CLEAR__SELECTED_PRODUCTS';

interface SelectedProduct {
    selectedCards: QuoteProduct[];
}

export interface QuoteProduct {
    id: number;
    coverName: string;
    premium: number;
    coverSI: number;
}

export const selectedProductCardAction = (data: SelectedProduct) => {
    return { type: SELECTED_PRODUCT_CARD_ACTION, payload: data };
};

export const saveProductsPricesGstAction = (data: any) => {
    return { type: SAVE_TOTAL_AMOUNTS_OF_PRODUCTS, payload: data };
};

export const ClearSelectedProducts = () => {
    return { type: CLEAR__SELECTED_PRODUCTS };
};

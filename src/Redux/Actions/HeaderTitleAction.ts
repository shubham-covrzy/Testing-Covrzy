export const HEADER_TITLE = 'HEADER_TITLE';

export const setPageHeaderTitle = (page_name: string) => {
    return { type: HEADER_TITLE, payload: page_name };
};

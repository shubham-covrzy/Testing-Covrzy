import { HEADER_TITLE } from '../Actions/HeaderTitleAction';

const initial = {
    title: '',
};

export const HeaderTitleReducer = (state = initial, action: any) => {
    switch (action.type) {
        case HEADER_TITLE:
            return {
                title: action.payload,
            };

        default:
            return state;
    }
};

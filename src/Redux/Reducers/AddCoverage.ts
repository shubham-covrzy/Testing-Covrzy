import {
    ADD_ADDITIONAL_DETAILS,
    ADD_COMPANY_DETAILS,
    BACK_SCREEN_ACTION,
    CLEAR_ADD_COVRAZY_STATE,
    SET_CURRENT_STEP,
} from '../Actions/AddCoverage';

const LoginInitialState = {
    coverage_step: 1,
    company_details: {},
    additional_details: {},
};

export const AddCoverageReducer = (state = LoginInitialState, action: any) => {
    switch (action.type) {
        case ADD_COMPANY_DETAILS:
            return {
                ...state,
                coverage_step: 2,
                company_details: action.payload,
            };

        case ADD_ADDITIONAL_DETAILS:
            return {
                ...state,
                // coverage_step: 3,
                // additional_details: action.payload
            };

        case BACK_SCREEN_ACTION:
            return {
                ...state,
                coverage_step: state.coverage_step - 1,
            };

        case SET_CURRENT_STEP:
            return {
                ...state,
                coverage_step: action.payload,
            };

        case CLEAR_ADD_COVRAZY_STATE:
            return {
                coverage_step: 1,
                company_details: {},
                additional_details: {},
            };

        default:
            return state;
    }
};

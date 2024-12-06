import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardStepWizard from '../../common/DashboardStepWizard';
import { ADD_COVERAGE } from '../../constants/main';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import { IReduxState } from '../../utils/types';
import AdditionalDetail from './AdditionalDetail';
// import BasicInfoStep from "./BasicInfoStep";
import CompanyDetailsStep from './CompanyDetailsStep';
// import CompanyLocationsStep from "./CompanyLocationsStep";
// import ContactStep from "./ContactStep";
// import RevenueStep from "./RevenueStep";
// import Review from "./Review";

const AddCovrage = () => {
    const dispatch = useDispatch();
    const { coverage_step } = useSelector(
        (state: IReduxState) => state.AddCoverage,
    );

    useEffect(() => {
        //dispatch(setPageHeaderTitle(ADD_COVERAGE))
    }, [dispatch]);

    // const CoverageCurrentStep = () => {
    //     switch (coverage_step) {
    //         case 1:
    //             return <BasicInfoStep />
    //         case 2:
    //             return <CompanyDetailsStep />
    //         case 3:
    //             return <CompanyLocationsStep />
    //         case 4:
    //             return <ContactStep />
    //         case 5:
    //             return <RevenueStep />
    //         default:
    //             return <BasicInfoStep />
    //     }
    // }

    const CoverageCurrentStep = () => {
        switch (coverage_step) {
            case 1:
                return <CompanyDetailsStep />;
            // case 2:
            //     return <CompanyLocationsStep />
            case 2:
                return <AdditionalDetail />;
            // case 3:
            //     return <Review />
            // case 5:
            //     return <RevenueStep />
            default:
                return <CompanyDetailsStep />;
        }
    };

    return (
        <Fragment>
            <DashboardStepWizard />
            {CoverageCurrentStep()}
        </Fragment>
    );
};
export default AddCovrage;

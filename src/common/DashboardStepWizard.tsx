import { useEffect } from 'react';
import InfoSolid from '../../src/assets/images/info-solid.svg';
import ListSolid from '../../src/assets/images/list-solid.svg';
// import LocationSolid from '../../src/assets/images/location-solid.svg';
import BookSolid from '../../src/assets/images/book-solid.svg';
// import RupeeSolid from '../../src/assets/images/rupee-sign-solid.svg';
import InfoSolidBlue from '../../src/assets/images/info-solid-blue.svg';
import ListSolidBlue from '../../src/assets/images/list-solid-blue.svg';
// import LocationSolidBlue from '../../src/assets/images/location-solid-blue.svg';
import BookSolidBlue from '../../src/assets/images/book-solid-blue.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../utils/types';
import { COMPANY } from '../constants/main';
import { GetCompanyProfileStateAction } from '../Redux/Actions/DashboardAction';
// import RupeeSolidBlue from '../../src/assets/images/rupee-blue.svg';

const DashboardStepWizard = () => {
    const { coverage_step, company_details, additional_details } = useSelector(
        (state: IReduxState) => state.AddCoverage,
    );
    const { stage } = useSelector((state: IReduxState) => state.Dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCompanyProfileStateAction());
    }, [dispatch]);

    const coverageSteps = [
        // { id: 1, title: 'Basic Info', solid: InfoSolid, solidBlue: InfoSolidBlue, isDone: true },
        {
            id: 1,
            title: 'Company Details',
            solid: ListSolid,
            solidBlue: ListSolidBlue,
            isDone:
                stage === COMPANY ||
                (company_details && Object.keys(company_details).length !== 0),
        },
        // { id: 3, title: 'Company Locations', solid: LocationSolid, solidBlue: LocationSolidBlue, isDone: false },
        {
            id: 2,
            title: 'Additional Details',
            solid: BookSolid,
            solidBlue: BookSolidBlue,
            isDone:
                additional_details &&
                Object.keys(additional_details).length !== 0,
        },
        // { id: 3, title: "Review & Submit", solid: InfoSolid, solidBlue: InfoSolidBlue, isDone: false },
        // { id: 6, title: "Revenue", solid: RupeeSolid, solidBlue: RupeeSolidBlue, isDone: false },
    ];

    return (
        <>
            <div className="db-step-progress">
                <div className="db-step-wrp">
                    {coverageSteps?.map((obj) => (
                        <div
                            className={`db-step-circle ${obj?.id === coverage_step ? 'db-active' : obj?.isDone ? 'db-done' : ''}`}
                        >
                            <span>
                                <img
                                    alt=""
                                    src={obj?.solid}
                                    className="db-orange-img"
                                />
                                <img
                                    alt=""
                                    src={obj?.solidBlue}
                                    className="db-blue-img"
                                />
                            </span>
                            <p>{obj?.title}</p>
                        </div>
                    ))}
                </div>
                <div className="db-line"></div>
            </div>
        </>
    );
};

export default DashboardStepWizard;

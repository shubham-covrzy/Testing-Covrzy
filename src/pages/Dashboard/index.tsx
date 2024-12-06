import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Row } from 'react-bootstrap';
import CanvasSideBar from '../../common/CanvasSideBar';
// import CanvasSideBarPolicy from "../Policies/CanvasSideBar";
import Cards from '../UserDetail/Cards';
import StartupPackage from '../../assets/images/startup-package.svg';
import Liability from '../../assets/images/liability.svg';
// import BMI from '../../assets/images/bmi.svg';
import StartupPackageOrange from '../../assets/images/startup-package-o.svg';
import LiabilityOrange from '../../assets/images/liability-o.svg';
// import BMIOrange from '../../assets/images/bmi-o.svg';
import CheckFill from '../../assets/images/CheckFill-PurpleBg.svg';
import { Col } from 'react-bootstrap';
import ShoppingCovered from '../../common/ShopingCovered';
import { useDispatch, useSelector } from 'react-redux';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import { COMPANY, HOME, PERSONAL } from '../../constants/main';
import { IReduxState } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import CommercialCrime from '../../assets/images/commercial-crime.svg';
import {
    GetCompanyProfileStateAction,
    GetPackageBySubIndustryAction,
    GetPoliciesBySubIndustryAction,
} from '../../Redux/Actions/DashboardAction';
import CustomLoader from '../../common/Loader/CustomLoader';
import ActivePoliciesCard from '../Claims/ActivePoliciesCard';
import { GetActivePlansAction } from '../../Redux/Actions/ClaimActions';
import { SetCurrentStepAction } from '../../Redux/Actions/AddCoverage';
import { dateConverter } from '../../Helper/commonFunction';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';

const Dashboard = () => {
    const { sendGAEvent } = useGAEvent(GACategories.DashboardHomePage);

    // const [show, setShow] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const [showPolicyData, setShowPolicyData] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        is_profile_completed,
        package_list,
        loading,
        policies_list,
        stage,
        additional_policies_list,
    } = useSelector((state: IReduxState) => state.Dashboard);
    const {
        active_policies,
        active_packages,
        loading: policies_loading,
    } = useSelector((state: IReduxState) => state.Claim);

    useEffect(() => {
        //dispatch(setPageHeaderTitle(HOME))
        dispatch(GetCompanyProfileStateAction());
        dispatch(GetPackageBySubIndustryAction());
        dispatch(GetPoliciesBySubIndustryAction());
        dispatch(GetActivePlansAction());
    }, [dispatch]);

    const handleClose = () => setShowPolicy(false);
    // const handleShow = () => setShowPolicy(true);

    // const handleClosePolicy = () => setShowPolicy(false);
    const handleShowPolicy = (data: Object | any) => {
        setShowPolicy(true);
        setShowPolicyData(data);
    };

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    const AddCoverageHandler = (id: string, planType: string) => {
        if (is_profile_completed === 'yes')
            handleNavigate(`/user/dashboard/complate-payment/${planType}/${id}`);
        else if (is_profile_completed === 'no') {
            if (stage === PERSONAL) dispatch(SetCurrentStepAction(1));
            else if (stage === COMPANY) dispatch(SetCurrentStepAction(2));
            handleNavigate(`/user/dashboard/${planType}/${id}/add-covrage`);
        }
    };

    const SME_LINK = process.env.REACT_APP_SME_URL

    const handleSmeNavigate = (route: string) => {
        if (SME_LINK && window.location.origin !== SME_LINK) {
            window.location.href = SME_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <Fragment>
            <div>
                <div className="db-main-title">
                    <h2>Welcome</h2>
                    <h2>Let's get you covered</h2>
                </div>

                <div className="purchase-card">
                    {policies_loading ? (
                        <CustomLoader />
                    ) : false &&
                        (active_policies.length !== 0 ||
                            active_packages?.length !== 0) ? (
                        <Row>
                            {/* <div className="db-main-title">
                                    <h2>Active Policies</h2>
                                </div> */}
                            {active_policies.map((policy: Object | any) => (
                                <Col
                                    xl={4}
                                    lg="6"
                                    md={6}
                                    key={policy?.purchased_policy_id}
                                >
                                    <ActivePoliciesCard
                                        title={policy?.policy?.policy_name}
                                        // image={CommercialCrime}
                                        claimAmount={
                                            policy?.policy?.claim_amount
                                        }
                                        createdAt={dateConverter(
                                            policy?.start_date,
                                        )}
                                        // onClick={() => handleShowPolicy(policy)}
                                        onClick={() =>
                                            handleNavigate(
                                                `/user/policies/activePolicy/${policy?.purchased_policy_id}`,
                                            )
                                        }
                                        buttonTitle={'View Details'}
                                    />
                                </Col>
                            ))}
                            {active_packages.map((packObj: object | any) => {
                                return packObj?.package?.packages_policy.map(
                                    (packages_policy: object | any) => (
                                        <Col
                                            xl={4}
                                            lg="6"
                                            md={6}
                                            key={
                                                packages_policy?.purchased_policy_id
                                            }
                                        >
                                            <ActivePoliciesCard
                                                package_name={
                                                    packObj?.package
                                                        ?.package_name
                                                }
                                                title={
                                                    packages_policy?.policy_id
                                                        ?.policy_name
                                                }
                                                // image={CommercialCrime}
                                                claimAmount={
                                                    packages_policy?.policy_id
                                                        ?.claim_amount
                                                }
                                                createdAt={dateConverter(
                                                    packObj?.created_at,
                                                )}
                                                // buttonTitle={'Initiate a claim'}
                                                // buttonTitle={'View Details'}
                                                // onClick={() => navigate(`/user/claims/activePolicy/${packages_policy?.purchased_policy_id}`)}
                                                onClick={() =>
                                                    handleNavigate(
                                                        `/user/policies/activePolicy/${packages_policy?.packages_policy_id}`,
                                                    )
                                                }
                                            />
                                        </Col>
                                    ),
                                );
                            })}
                        </Row>
                    ) : (
                        <span

                            onClick={() => {
                                sendGAEvent(GAActions.StartShoppingClicked)
                                handleSmeNavigate('/')
                            }
                            }
                        >
                            <ShoppingCovered
                                shopingTitle="You haven't selected any coverages"
                                buttonTitle="Start Shopping"
                                onClick={() => handleSmeNavigate('/')}
                            />
                        </span>
                    )}
                </div>
                {/* old dashboard flow */}

                {/* <div className="db-recommended mt-5" id={'coverages'}>
                    <h2>Recommended Packages</h2>
                </div>
                {loading ? (
                    <CustomLoader />
                ) : (
                    <div className="pi-card-wrp db-card-wrp">
                        {package_list.length === 0 ? (
                            <ShoppingCovered shopingTitle="No Packages Found" />
                        ) : (
                            <Row>
                                {package_list?.map((obj: any, i: number) => (
                                    <Col lg={4} md={6} key={obj?.id}>
                                        <Cards
                                            onClick={() =>
                                                AddCoverageHandler(
                                                    obj?.id,
                                                    'package',
                                                )
                                            }
                                            onLinkClick={() =>
                                                handleShowPolicy(obj)
                                            }
                                            title={obj?.package_name}
                                            // desc={obj?.package_type}
                                            desc={obj?.package_defination}
                                            // image={StartupPackage}
                                            image={
                                                process.env
                                                    .REACT_APP_IMAGE_BASE_URL +
                                                obj?.icon
                                            }
                                            // hoverImage={StartupPackageOrange}
                                            buttonTitle={'Add Coverage'}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                )} */}

                {/* <div className="db-recommended mt-5" id={'policies'}>
                    <h2>Recommended Policies</h2>
                </div>
                {loading ? (
                    <CustomLoader />
                ) : (
                    <div className="pi-card-wrp db-card-wrp">
                        {policies_list.length === 0 ? (
                            <ShoppingCovered shopingTitle="No Policies Found" />
                        ) : (
                            <Row>
                                {policies_list?.map((obj: any, i: number) => (
                                    <Col lg={4} md={6} key={obj?.id}>
                                        <Cards
                                            onClick={() =>
                                                AddCoverageHandler(
                                                    obj?.id,
                                                    'policy',
                                                )
                                            }
                                            onLinkClick={() =>
                                                handleShowPolicy(obj)
                                            }
                                            title={obj?.policy_name}
                                            desc={obj?.policy_defination}
                                            // desc={obj?.description}
                                            // image={Liability}
                                            image={
                                                process.env
                                                    .REACT_APP_IMAGE_BASE_URL +
                                                obj?.icon
                                            }
                                            // hoverImage={LiabilityOrange}
                                            buttonTitle={'Buy Policy'}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                )} */}
                {/* 
                {additional_policies_list.length !== 0 && (
                    <>
                        <div className="db-recommended mt-5" id={'policies'}>
                            <h2>Additional Policies</h2>
                        </div>
                        {loading ? (
                            <CustomLoader />
                        ) : (
                            <div className="pi-card-wrp db-card-wrp"> */}
                {/* {additional_policies_list.length === 0 ?
                            <ShoppingCovered
                                shopingTitle="No Additional Policies Found"
                            /> : */}
                {/* <Row>
                                    {additional_policies_list?.map(
                                        (obj: any, i: number) => (
                                            <Col lg={4} md={6} key={obj?.id}>
                                                <Cards
                                                    onClick={() =>
                                                        AddCoverageHandler(
                                                            obj?.id,
                                                            'policy',
                                                        )
                                                    }
                                                    onLinkClick={() =>
                                                        handleShowPolicy(obj)
                                                    }
                                                    title={obj?.policy_name}
                                                    desc={
                                                        obj?.policy_defination
                                                    }
                                                    // desc={obj?.description}
                                                    // image={Liability}
                                                    // hoverImage={LiabilityOrange}
                                                    image={
                                                        process.env
                                                            .REACT_APP_IMAGE_BASE_URL +
                                                        obj?.icon
                                                    }
                                                    buttonTitle={'Buy Policy'}
                                                />
                                            </Col>
                                        ),
                                    )}
                                </Row>
                                {/* } */}
            </div>
            {/* )}
                    </>
                )} */}

            {/* {showPolicy && (
                    <CanvasSideBar
                        show={showPolicy}
                        image={
                            showPolicyData?.policy_name
                                ? Liability
                                : StartupPackage
                        }
                        checkImage={CheckFill}
                        onHide={handleClose}
                        content={showPolicyData}
                        // buttonTitle={"View More"}
                        buttonTitle={
                            showPolicyData?.policy_name
                                ? 'Buy Policy'
                                : 'Add Coverage'
                        }
                        onClick={() =>
                            AddCoverageHandler(
                                showPolicyData?.id,
                                showPolicyData?.policy_name
                                    ? 'policy'
                                    : 'package',
                            )
                        }
                        onClickLink={() =>
                            navigate(
                                `/user/dashboard/product-details/${
                                    showPolicyData?.policy_name
                                        ? 'policy'
                                        : 'package'
                                }/${showPolicyData?.id}`,
                            )
                        }
                    />
                )} */}
            {/* </div> */}
            {/* end old flow */}
        </Fragment>
    );
};

export default Dashboard;

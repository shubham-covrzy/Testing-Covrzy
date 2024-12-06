import { Fragment, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import CoveredButton from '../../common/Buttons/CoveredButton';
import CustomButton from '../../common/Buttons/CustomButton';
// import StartupPackage from '../../assets/images/startup-package.svg';
// import CommercialCrime from '../../assets/images/commercial-crime.svg';
// import TechInsurance from '../../assets/images/tech-errors-Insurance.svg';
import CoveredSidebar from './CoveredSidebar';
import ThumbsUp from '../../assets/images/thumbs-up.svg';
import ThumbsDown from '../../assets/images/thumbs-down.svg';
import ChevronRight from '../../assets/images/chevron-right.svg';
import { useDispatch, useSelector } from 'react-redux';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
// import { CLAIMS, POLICIES } from "../../constants/main";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import {
    GetPurchasedPolicyPoints,
    GetSingleActivePlanAction,
} from '../../Redux/Actions/ClaimActions';
import CustomLoader from '../../common/Loader/CustomLoader';
import { NumberFormat } from '../../common/NumberFormat';
import { dateConverter } from '../../Helper/commonFunction';

const ViewActivePolicy = () => {
    const [showCoverd, setShowCoverd] = useState(false);
    const [isPolicy, setIsPolicy] = useState(false);
    const [showNotCoverd, setShowNotCoverd] = useState(false);
    const { loading, view_active_plan, purchased_policy } = useSelector(
        (state: IReduxState) => state.Claim,
    );

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activePlanId, policyId }: any = useParams();

    useEffect(() => {
        dispatch(
            GetSingleActivePlanAction({
                activePlan: policyId ? 'activePackage' : 'activePolicy',
                activePlanId: activePlanId ? activePlanId : '',
                policyId: policyId,
            }),
        );
        setIsPolicy(!policyId);
    }, [dispatch]);

    useEffect(() => {
        if (view_active_plan?.policy) {
            dispatch(GetPurchasedPolicyPoints(view_active_plan?.policy?.id));
        }
    }, [view_active_plan]);

    const handleClose = () => {
        setShowNotCoverd(false);
        setShowCoverd(false);
    };
    const handleShowCovered = () => setShowCoverd(true);
    const handleShowNotCovered = () => setShowNotCoverd(true);

    // console.log('purchased_policy', purchased_policy?.insured_points && JSON.parse(purchased_policy?.insured_points), purchased_policy?.uninsured_points && JSON.parse(purchased_policy?.uninsured_points));

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }
    return (
        <Fragment>
            <div className="claim-insurance">
                <div className="claim-top">
                    <span>
                        {/* <img src={activePlan === 'activePolicy' ? CommercialCrime : TechInsurance} alt='' /> */}
                        <img
                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${isPolicy
                                ? view_active_plan?.policy?.icon
                                : view_active_plan?.package
                                    ?.packages_policy?.[0]?.policy_id
                                    ?.icon
                                }`}
                            alt=""
                            width="80%"
                        />
                    </span>
                    <div>
                        {loading ? (
                            <CustomLoader />
                        ) : (
                            <h2>
                                {isPolicy
                                    ? view_active_plan?.policy?.policy_name
                                    : view_active_plan?.package
                                        ?.packages_policy?.[0]?.policy_id
                                        ?.policy_name}
                            </h2>
                        )}
                        {view_active_plan?.package?.package_name && (
                            <h6>{view_active_plan?.package?.package_name}</h6>
                        )}
                    </div>
                </div>
                <div className="db-line"></div>
                <div className="use-insurance">
                    <div className="use-insurance-box">
                        <Row>
                            <Col md={5}>
                                <Row className="use-insurance-first">
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Insurer Name</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {
                                                        view_active_plan?.user
                                                            ?.company[0]
                                                            ?.insurer
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Sum Insured</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {
                                                        isPolicy
                                                            ? view_active_plan?.finalize_policy &&
                                                            JSON.parse(
                                                                view_active_plan?.finalize_policy,
                                                            )?.[0]?.amount
                                                            : view_active_plan?.finalize_policy &&
                                                            JSON.parse(
                                                                view_active_plan?.finalize_policy,
                                                            )?.find(
                                                                (item: any) =>
                                                                    item?.policy_id ===
                                                                    view_active_plan
                                                                        ?.package
                                                                        ?.packages_policy?.[0]
                                                                        ?.policy_id
                                                                        ?.id,
                                                            )?.amount
                                                        // `${NumberFormat(isPolicy ?
                                                        //     (view_active_plan?.policy?.coverage_amount || 0) :
                                                        //     // view_active_plan?.package?.package_plan[0]?.coverage_amount)
                                                        //     view_active_plan?.package?.packages_policy?.[0]?.policy_id?.id)
                                                        // }/year`
                                                    }
                                                </span>
                                            )}
                                            {/* <p>for entire family</p> */}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Policy Start Date</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {dateConverter(
                                                        view_active_plan?.start_date ||
                                                        '',
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="use-insurance-box-item">
                                            <strong>Policy End Date</strong>
                                            {loading ? (
                                                <CustomLoader />
                                            ) : (
                                                <span>
                                                    {dateConverter(
                                                        view_active_plan?.end_date ||
                                                        '',
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={7} className="m-auto">
                                <Row>
                                    <Col md={6}>
                                        <CoveredButton
                                            onClick={handleShowCovered}
                                            buttonTitle="What's Covered"
                                            ArrowImage={ChevronRight}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <CoveredButton
                                            onClick={handleShowNotCovered}
                                            buttonTitle="What's Not Covered"
                                            ArrowImage={ChevronRight}
                                        />
                                    </Col>
                                    {!pathname.includes('/user/policies/') && (
                                        <Col md={12} className="mt-md-4">
                                            <CustomButton
                                                buttonTitle="Use My Insurance"
                                                // onClick={() => navigate(`/user/claims/${policyId ? 'activePackage' : 'activePolicy'}/${pathname.includes("activePackage") ? view_active_plan?.package?.id : view_active_plan?.policy?.id}/upload-proof`)}
                                                onClick={() =>
                                                    handleNavigate(
                                                        `/user/claims/${policyId
                                                            ? 'activePackage'
                                                            : 'activePolicy'
                                                        }/${activePlanId}/${policyId
                                                            ? `policy/${policyId}/`
                                                            : ''
                                                        }upload-proof/${policyId
                                                            ? view_active_plan
                                                                ?.package
                                                                ?.id
                                                            : view_active_plan
                                                                ?.policy
                                                                ?.id
                                                        }`,
                                                    )
                                                }
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {showCoverd && (
                <CoveredSidebar
                    title="What's Covered?"
                    image={ThumbsUp}
                    show={showCoverd}
                    onHide={handleClose}
                    content={JSON.parse(purchased_policy?.insured_points)}
                // content={JSON.parse(view_active_plan?.policy ? view_active_plan?.policy?.policy_prons : view_active_plan?.package?.packages_policy?.[0]?.policy_id?.policy_prons)}
                />
            )}
            {showNotCoverd && (
                <CoveredSidebar
                    title="What's not Covered?"
                    image={ThumbsDown}
                    show={showNotCoverd}
                    onHide={handleClose}
                    // content={JSON.parse(view_active_plan?.policy ? view_active_plan?.policy?.policy_cons : view_active_plan?.package?.packages_policy?.[0]?.policy_id?.policy_cons)}
                    content={JSON.parse(purchased_policy?.uninsured_points)}
                />
            )}
        </Fragment>
    );
};

export default ViewActivePolicy;

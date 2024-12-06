import { useEffect } from 'react';
import { Fragment } from 'react';
import { Col, Nav, Tab } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import ShopingCovered from '../../common/ShopingCovered';
import ActivePoliciesCard from './ActivePoliciesCard';
// import StartupPackage from '../../assets/images/startup-package.svg';
// import CommercialCrime from '../../assets/images/commercial-crime.svg';
// import TechInsurance from '../../assets/images/tech-errors-Insurance.svg';
// import ChevronRight from '../../assets/images/chevron-right.svg';
// import ThumbsUp from '../../assets/images/thumbs-up.svg';
// import ThumbsDown from '../../assets/images/thumbs-down.svg';
// import CustomButton from "../../common/Buttons/CustomButton";
// import CoveredButton from "../../common/Buttons/CoveredButton";
// import CoveredSidebar from "./CoveredSidebar";
// import FileUpload from "../Policies/FileUpload";
// import OrangeButton from "../../common/Buttons/OrangeButton";
import { useDispatch, useSelector } from 'react-redux';
// //import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import { CLAIMS } from '../../constants/main';
import { IReduxState } from '../../utils/types';
import {
    GetActivePlansAction,
    GetInActivePlansAction,
    ViewAllClaimAction,
} from '../../Redux/Actions/ClaimActions';
import { useNavigate } from 'react-router-dom';
import ClaimViewCard from './ClaimViewCard';
import CustomLoader from '../../common/Loader/CustomLoader';
import InActivePoliciesCard from './InActivePolicyCard';
import { dateConverter } from '../../Helper/commonFunction';

const Claims = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        active_packages,
        active_policies,
        inActive_packages,
        inActive_policies,
        claim_packages,
        claim_policies,
        loading,
    } = useSelector((state: IReduxState) => state.Claim);

    useEffect(() => {
        // //dispatch(setPageHeaderTitle(CLAIMS))
        dispatch(GetActivePlansAction());
        dispatch(ViewAllClaimAction());
        dispatch(GetInActivePlansAction());
    }, [dispatch]);

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
            <div className="db-main-title">
                <h2>Past Claims or Start a New Claim</h2>
            </div>
            {loading ? (
                <CustomLoader />
            ) : (
                <div className="active-policies">
                    <Row>
                        {[...claim_packages, ...claim_policies].map(
                            (item: Object | any) => (
                                <Col xl={4} lg="6" md={6} key={item?.claim_id}>
                                    <ClaimViewCard
                                        image={
                                            process.env
                                                .REACT_APP_IMAGE_BASE_URL +
                                            item?.policy_id?.icon
                                        }
                                        title={
                                            item?.policy_id
                                                ? item?.policy_id?.policy_name
                                                : item?.package_id?.package_name
                                        }
                                        status={item?.status}
                                        createdAt={dateConverter(
                                            item?.created_at,
                                        )}
                                        // endDate={dateConverter(item?.created_at)}
                                        package_name={
                                            item?.package_id?.package_name
                                        }
                                        claimAmount={
                                            item?.policy_id
                                                ? item?.policy_id?.claim_amount
                                                : item?.package_id
                                                    ?.package_plan[0]
                                                    ?.claim_amount
                                        }
                                    />
                                </Col>
                            ),
                        )}
                    </Row>
                </div>
            )}

            <div className="support-tab">
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={'active'}
                >
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="active">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="inactive">Inactive</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="active">
                            {(active_policies?.length !== 0 ||
                                active_packages?.length !== 0) && (
                                    <>
                                        <div className="db-main-title">
                                            <h2>Active Policies</h2>
                                        </div>
                                        {loading ? (
                                            <CustomLoader />
                                        ) : (
                                            <div className="active-policies">
                                                <Row>
                                                    {active_policies.map(
                                                        (policy: Object | any) => (
                                                            <Col
                                                                xl={4}
                                                                lg="6"
                                                                md={6}
                                                                key={
                                                                    policy?.purchased_policy_id
                                                                }
                                                                className={'mb-4'}
                                                            >
                                                                <ActivePoliciesCard
                                                                    sumAmount={
                                                                        policy?.finalize_policy &&
                                                                        JSON.parse(
                                                                            policy?.finalize_policy,
                                                                        )?.[0]
                                                                            ?.amount
                                                                    }
                                                                    title={
                                                                        policy
                                                                            ?.policy
                                                                            ?.policy_name
                                                                    }
                                                                    images={
                                                                        process.env
                                                                            .REACT_APP_IMAGE_BASE_URL +
                                                                        policy
                                                                            ?.policy
                                                                            ?.icon
                                                                    }
                                                                    insurerName={
                                                                        policy
                                                                            ?.company
                                                                            ?.insurer
                                                                    }
                                                                    end_date={dateConverter(
                                                                        policy?.end_date,
                                                                    )}
                                                                    claimAmount={
                                                                        policy
                                                                            ?.policy
                                                                            ?.claim_amount
                                                                    }
                                                                    createdAt={dateConverter(
                                                                        policy?.created_at,
                                                                    )}
                                                                    buttonTitle={
                                                                        'Initiate a Claim'
                                                                    }
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            `/user/claims/activePolicy/${policy?.purchased_policy_id}`,
                                                                        )
                                                                    }
                                                                />
                                                            </Col>
                                                        ),
                                                    )}
                                                    {active_packages.map(
                                                        (packObj: object | any) => {
                                                            const pp =
                                                                packObj?.finalize_policy &&
                                                                JSON.parse(
                                                                    packObj?.finalize_policy,
                                                                ).map(
                                                                    (item: any) => {
                                                                        return packObj?.package?.packages_policy.filter(
                                                                            (
                                                                                item2: any,
                                                                            ) => {
                                                                                return (
                                                                                    item2
                                                                                        ?.policy_id
                                                                                        ?.id ===
                                                                                    item?.policy_id
                                                                                );
                                                                            },
                                                                        )[0];
                                                                    },
                                                                );
                                                            return pp?.map(
                                                                (
                                                                    packages_policy:
                                                                        | object
                                                                        | any,
                                                                ) => (
                                                                    <Col
                                                                        xl={4}
                                                                        lg="6"
                                                                        md={6}
                                                                        key={
                                                                            packages_policy?.purchased_policy_id
                                                                        }
                                                                    >
                                                                        <ActivePoliciesCard
                                                                            sumAmount={
                                                                                JSON.parse(
                                                                                    packObj?.finalize_policy,
                                                                                ).find(
                                                                                    (
                                                                                        item: any,
                                                                                    ) =>
                                                                                        item?.policy_id ===
                                                                                        packages_policy
                                                                                            ?.policy_id
                                                                                            ?.id,
                                                                                )
                                                                                    ?.amount
                                                                            }
                                                                            insurerName={
                                                                                packObj
                                                                                    ?.company
                                                                                    ?.insurer
                                                                            }
                                                                            package_name={
                                                                                packObj
                                                                                    ?.package
                                                                                    ?.package_name
                                                                            }
                                                                            title={
                                                                                packages_policy
                                                                                    ?.policy_id
                                                                                    ?.policy_name
                                                                            }
                                                                            images={
                                                                                process
                                                                                    .env
                                                                                    .REACT_APP_IMAGE_BASE_URL +
                                                                                packages_policy
                                                                                    ?.policy_id
                                                                                    ?.icon
                                                                            }
                                                                            claimAmount={
                                                                                packages_policy
                                                                                    ?.policy_id
                                                                                    ?.claim_amount
                                                                            }
                                                                            createdAt={dateConverter(
                                                                                packObj?.created_at,
                                                                            )}
                                                                            end_date={dateConverter(
                                                                                packObj?.end_date,
                                                                            )}
                                                                            buttonTitle={
                                                                                'Initiate a Claim'
                                                                            }
                                                                            onClick={() =>
                                                                                handleNavigate(
                                                                                    `/user/claims/activePackage/${packObj?.purchased_policy_id}/policy/${packages_policy?.policy_id?.id}`,
                                                                                )
                                                                            }
                                                                        />
                                                                    </Col>
                                                                ),
                                                            );
                                                        },
                                                    )}
                                                    {/* {active_packages.map((packObj: object | any) => {
                                            return packObj?.package?.packages_policy.map((packages_policy: object | any) => (
                                                <Col xl={4} lg="6" md={6} key={packages_policy?.purchased_policy_id} className={'mb-4'}>
                                                    <ActivePoliciesCard
                                                        // sumAmount={finalize_policy}
                                                        insurerName={packObj?.company?.insurer}
                                                        package_name={packObj?.package?.package_name}
                                                        title={packages_policy?.policy_id?.policy_name}
                                                        // image={CommercialCrime}
                                                        images={process.env.REACT_APP_IMAGE_BASE_URL + packages_policy?.policy_id?.icon}
                                                        claimAmount={packages_policy?.policy_id?.claim_amount}
                                                        createdAt={dateConverter(packObj?.created_at)}
                                                        end_date={dateConverter(packObj?.end_date)}
                                                        buttonTitle={'Initiate a Claim'}
                                                        onClick={() => navigate(`/user/claims/activePackage/${packObj?.purchased_policy_id}/policy/${packages_policy?.policy_id?.id}`)}
                                                    />
                                                </Col>
                                            ))
                                        })} */}
                                                </Row>
                                            </div>
                                        )}
                                    </>
                                )}

                            {/* {active_packages?.length !== 0 && <>
                                <div className="db-main-title">
                                    <h2>Active Packages</h2>
                                </div>
                                {loading ? <CustomLoader /> : <div className="active-policies">
                                    <Row>
                                        {active_packages.map((pack: Object | any) => (
                                            <Col xl={4} lg="6" md={6} key={pack?.purchased_policy_id}>
                                                <ActivePoliciesCard
                                                    title={pack?.package?.package_name}
                                                    image={TechInsurance}
                                                    claimAmount={pack?.package?.package_plan[0]?.claim_amount}
                                                    createdAt={dateConverter(pack?.created_at)}
                                                    buttonTitle={'Initiate a claim'}
                                                    onClick={() => navigate(`/user/claims/activePackage/${pack?.purchased_policy_id}`)}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </div>}
                            </>} */}

                            {!loading &&
                                active_policies?.length === 0 &&
                                active_packages?.length === 0 && (
                                    <ShopingCovered shopingTitle="You don’t have any active coverages" />
                                )}
                        </Tab.Pane>

                        <Tab.Pane eventKey="inactive">
                            {inActive_policies?.length !== 0 && (
                                <>
                                    <div className="db-main-title">
                                        <h2>Inactive Policies</h2>
                                    </div>
                                    {loading ? (
                                        <CustomLoader />
                                    ) : (
                                        <div className="active-policies">
                                            <Row>
                                                {inActive_policies.map(
                                                    (policy: Object | any) => (
                                                        <Col
                                                            xl={4}
                                                            lg="6"
                                                            md={6}
                                                            key={
                                                                policy?.purchased_policy_id
                                                            }
                                                        >
                                                            <InActivePoliciesCard
                                                                title={
                                                                    policy
                                                                        ?.policy
                                                                        ?.policy_name
                                                                }
                                                                coverageAmount={
                                                                    policy
                                                                        ?.policy
                                                                        ?.coverage_amount
                                                                }
                                                                claimAmount={
                                                                    policy
                                                                        ?.policy
                                                                        ?.claim_amount
                                                                }
                                                                startDate={dateConverter(
                                                                    policy?.start_date,
                                                                )}
                                                                endDate={dateConverter(
                                                                    policy?.end_date,
                                                                )}
                                                            />
                                                        </Col>
                                                    ),
                                                )}
                                            </Row>
                                        </div>
                                    )}
                                </>
                            )}

                            {inActive_packages?.length !== 0 && (
                                <>
                                    <div className="db-main-title">
                                        <h2>Inactive Packages</h2>
                                    </div>
                                    {loading ? (
                                        <CustomLoader />
                                    ) : (
                                        <div className="active-policies">
                                            <Row>
                                                {inActive_packages.map(
                                                    (pack: Object | any) => (
                                                        <Col
                                                            xl={4}
                                                            lg="6"
                                                            md={6}
                                                            key={
                                                                pack?.purchased_policy_id
                                                            }
                                                        >
                                                            <InActivePoliciesCard
                                                                title={
                                                                    pack
                                                                        ?.package
                                                                        ?.package_name
                                                                }
                                                                coverageAmount={
                                                                    pack
                                                                        ?.package
                                                                        ?.package_plan[0]
                                                                        ?.coverage_amount
                                                                }
                                                                claimAmount={
                                                                    pack
                                                                        ?.package
                                                                        ?.package_plan[0]
                                                                        ?.claim_amount
                                                                }
                                                                startDate={dateConverter(
                                                                    pack?.start_date,
                                                                )}
                                                                endDate={dateConverter(
                                                                    pack?.end_date,
                                                                )}
                                                            />
                                                        </Col>
                                                    ),
                                                )}
                                            </Row>
                                        </div>
                                    )}
                                </>
                            )}

                            {!loading &&
                                inActive_policies?.length === 0 &&
                                inActive_packages?.length === 0 && (
                                    <ShopingCovered shopingTitle="You don’t have any inactive coverages" />
                                )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </Fragment>
    );
};

export default Claims;

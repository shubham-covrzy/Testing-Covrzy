import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Col, Form, Nav, Spinner, Tab } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import ShopingCovered from '../../common/ShopingCovered';
import Cards from '../UserDetail/Cards';
import StartupPackage from '../../assets/images/startup-package.svg';
import { ReactComponent as NonCovrzyFile } from '../../assets/images/PoliciesIconBlue.svg';
import CustomLabel from '../../common/CustomLabel';
import CustomInput from '../../common/CustomInput';
import FileUpload from './FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { ONLY_ALPHABET } from '../../constants/main';
import CustomModal from '../../common/CustomModal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IReduxState } from '../../utils/types';
import {
    AddNonCoverzyPoliciyAction,
    ClearPoliciesStateAction,
    GetNonCoverzyPoliciesAction,
} from '../../Redux/Actions/PoliciesActions';
import NonCovrzyPoliciesCard from './NonCovrzyPoliciesCard';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPackageBySubIndustryAction } from '../../Redux/Actions/DashboardAction';
import { GetActivePlansAction } from '../../Redux/Actions/ClaimActions';
import CustomLoader from '../../common/Loader/CustomLoader';
import ShoppingCovered from '../../common/ShopingCovered';
import CustomCurrencyInput from '../../common/CustomCurrencyInput';
import CustomTooltip from '../../common/CustomTooltip';
import CheckFill from '../../assets/images/CheckFill-PurpleBg.svg';
import moment from 'moment';
import { dateConverter, MinDate } from '../../Helper/commonFunction';
import CanvasSideBar from '../../common/CanvasSideBar';
import { GetPurchasedPoliciesAction } from '../../Redux/Actions/PurchasesAction';
import PurchasedPoliciesCard from './PurchasedPoliciesCard';
import { policyIconMap, policyNameMap } from '../../utils/policyMap';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';

const Policies = () => {
    const { sendGAEvent } = useGAEvent(GACategories.PurchasedPolicies);

    const [file, setFile] = useState<File | any>(null);
    // const [show, setShow] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const [showPolicyData, setShowPolicyData] = useState<any>({});
    const { loading, success, non_covrzy_policies } = useSelector(
        (state: IReduxState) => state.Policies,
    );
    const DashboardState = useSelector((state: IReduxState) => state.Dashboard);
    const { purchasedPolicies, loading: loadingPurchasedPolicies } =
        useSelector((state: IReduxState) => state.Purchases);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { policyType } = useParams();

    useEffect(() => {
        dispatch(GetNonCoverzyPoliciesAction());
        dispatch(GetPackageBySubIndustryAction());
        dispatch(GetActivePlansAction());
        dispatch(
            GetPurchasedPoliciesAction({
                status: ['initiated', 'active'],
            }),
        );
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(GetNonCoverzyPoliciesAction());
            setFile(null);
            NonCoverzyPoliciyFormik.resetForm();
            dispatch(ClearPoliciesStateAction());
        }
    }, [success]);

    // const handleClose = () => setShow(false);
    const handleClose = () => setShowPolicy(false);
    // const handleShow = (data: Object | any) => {
    //     setShow(true);
    //     setShowPolicyData(data)
    // }

    const handleShowPolicy = (data: Object | any) => {
        setShowPolicy(true);
        setShowPolicyData(data);
    };

    const handleChange = (file: any) => setFile(file);

    const NonCoverzyPoliciySchema = yup.object().shape({
        policy_name: yup
            .string()
            .trim()
            .required('Please Enter Policy Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        policy_coverage_amount: yup
            .string()
            .required('Please Enter Coverage Amount'),
        policy_start_date: yup
            .date()
            .max(new Date(), 'MaxError')
            .required('Please Select Start Date'),
        policy_end_date: yup
            .date()
            .min(yup.ref('policy_start_date'), 'MinError')
            .required('Please Select End Date'),
    });

    const NonCoverzyPoliciyFormik = useFormik({
        initialValues: {
            policy_name: '',
            policy_coverage_amount: '',
            policy_start_date: moment().toDate(),
            policy_end_date: MinDate(moment().toDate().toString()),
        },
        validationSchema: NonCoverzyPoliciySchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('policy_name', values.policy_name.trim());
            formData.append(
                'policy_coverage_amount',
                values.policy_coverage_amount,
            );
            formData.append(
                'policy_start_date',
                moment(values.policy_start_date).format('YYYY-MM-DD'),
            );
            formData.append(
                'policy_end_date',
                moment(values.policy_end_date).format('YYYY-MM-DD'),
            );
            formData.append('policy', file);

            dispatch(AddNonCoverzyPoliciyAction(formData));
        },
    });

    const changeTabRoute = (path: string) => navigate(path);

    const modalBody = (
        <Form onSubmit={(e) => NonCoverzyPoliciyFormik.handleSubmit(e)}>
            <Row>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Policy Name *" />
                        <CustomInput
                            type="text"
                            placeholder="Enter Policy Name"
                            name="policy_name"
                            onChange={NonCoverzyPoliciyFormik.handleChange}
                            value={NonCoverzyPoliciyFormik.values.policy_name}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_name &&
                            NonCoverzyPoliciyFormik.touched.policy_name && (
                                <span className="text-error">
                                    {NonCoverzyPoliciyFormik.errors.policy_name}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel
                            label="Coverage Amount *"
                            tooltip={
                                <CustomTooltip message="You can enter till 100 cr" />
                            }
                        />
                        <CustomCurrencyInput
                            name="policy_coverage_amount"
                            placeholder="Enter Coverage amount"
                            onChange={(value: string) =>
                                NonCoverzyPoliciyFormik.setFieldValue(
                                    'policy_coverage_amount',
                                    value,
                                )
                            }
                            maxLength={10}
                            value={
                                NonCoverzyPoliciyFormik.values
                                    .policy_coverage_amount
                            }
                        />
                        {/* <CustomInput
                        type="number"
                        name="policy_coverage_amount"
                        onChange={NonCoverzyPoliciyFormik.handleChange}
                        value={NonCoverzyPoliciyFormik.values.policy_coverage_amount}
                        placeholder="Enter Coverage amount"

                    /> */}
                        {NonCoverzyPoliciyFormik.errors
                            .policy_coverage_amount &&
                            NonCoverzyPoliciyFormik.touched
                                .policy_coverage_amount && (
                                <span className="text-error">
                                    {
                                        NonCoverzyPoliciyFormik.errors
                                            .policy_coverage_amount
                                    }
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Policy Start Date *" />
                        <CustomInput
                            type="date"
                            maxDate={moment().format('YYYY-MM-DD')}
                            // minDate={new Date().toISOString().split("T")[0]}
                            name="policy_start_date"
                            value={moment(
                                NonCoverzyPoliciyFormik.values
                                    .policy_start_date,
                            ).format('YYYY-MM-DD')}
                            onChange={(e: any) => {
                                NonCoverzyPoliciyFormik.handleChange(e);
                                NonCoverzyPoliciyFormik.setFieldValue(
                                    'policy_end_date',
                                    MinDate(e.target.value),
                                );
                            }}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_start_date &&
                            NonCoverzyPoliciyFormik.touched
                                .policy_start_date && (
                                <span className="text-error">
                                    {NonCoverzyPoliciyFormik?.errors
                                        ?.policy_start_date === 'MaxError'
                                        ? 'Start Date Can Not Be Greater Than Current Date'
                                        : 'Please Enter Date'}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Policy End Date *" />
                        <CustomInput
                            type="date"
                            name="policy_end_date"
                            minDate={MinDate(
                                NonCoverzyPoliciyFormik.values.policy_start_date.toString(),
                            )}
                            value={moment(
                                NonCoverzyPoliciyFormik.values.policy_end_date,
                            ).format('YYYY-MM-DD')}
                            onChange={NonCoverzyPoliciyFormik.handleChange}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_end_date &&
                            NonCoverzyPoliciyFormik.touched.policy_end_date && (
                                <span className="text-error">
                                    {NonCoverzyPoliciyFormik?.errors
                                        ?.policy_end_date === 'MinError'
                                        ? 'End Date Can Not Be Less Than Start Date'
                                        : 'Please Enter Date'}
                                </span>
                            )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );

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
            <CustomModal
                show={file?.name}
                onHide={() => setFile(null)}
                headerTitle="Non-Covrzy Policies"
                body={modalBody}
                size="lg"
                customButtonTitle="Cancel"
                onClickCustomButton={() => setFile(null)}
                onClickOrangeButton={NonCoverzyPoliciyFormik.handleSubmit}
                orangeButtonTitle={
                    loading ? (
                        <div className="d-flex justify-content-center gap-2">
                            <Spinner
                                animation="border"
                                style={{ width: 23, height: 23 }}
                            />
                            <span>Please wait...</span>
                        </div>
                    ) : (
                        'Submit'
                    )
                }
            />

            <div>
                <div className="db-main-title">
                    <h2>Your Policies</h2>
                </div>
                <div className="support-tab">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey={policyType}
                    >
                        <Nav className="mb-5" variant="pills">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="purchase"
                                    onClick={() =>
                                        changeTabRoute(
                                            '/user/policies/purchase',
                                        )
                                    }
                                >
                                    Purchased Policies
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="non-covrzy"
                                    onClick={() =>
                                        changeTabRoute(
                                            '/user/policies/non-covrzy',
                                        )
                                    }
                                >
                                    Non-Covrzy Policies
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="purchase">
                                {loadingPurchasedPolicies ? (
                                    <CustomLoader />
                                ) : purchasedPolicies.length !== 0 ? (
                                    <div className="purchase-card">
                                        {purchasedPolicies.some(
                                            (el) => el.status === 'initiated',
                                        ) && (
                                                <div className="db-main-title">
                                                    <h2>Pending Policies</h2>
                                                </div>
                                            )}
                                        <Row>
                                            {purchasedPolicies
                                                .filter((el) => {
                                                    return (
                                                        el.status ===
                                                        'initiated'
                                                    );
                                                })
                                                .flatMap((purchasedPolicy) => {
                                                    return purchasedPolicy.policies.map(
                                                        (policy) => (
                                                            <Col
                                                                xl={4}
                                                                lg="6"
                                                                md={6}
                                                                key={policy.id}
                                                            >
                                                                <PurchasedPoliciesCard
                                                                    insurerName={
                                                                        policy.insurer
                                                                    }
                                                                    sumAmount={
                                                                        policy.sumInsured
                                                                    }
                                                                    title={
                                                                        policyNameMap.get(
                                                                            policy.coverName,
                                                                        )!
                                                                    }
                                                                    image={
                                                                        // process
                                                                        //     .env
                                                                        //     .REACT_APP_IMAGE_BASE_URL +
                                                                        policyIconMap.get(
                                                                            policy.coverName,
                                                                        )!
                                                                    }
                                                                    startDate={
                                                                        purchasedPolicy.startDate
                                                                    }
                                                                    onClick={() => {
                                                                        sendGAEvent(
                                                                            GAActions.ViewDetailsClicked,
                                                                        );
                                                                        navigate(
                                                                            `/user/purchases/policies/${policy.id}`,
                                                                        );
                                                                    }}
                                                                    buttonTitle={
                                                                        'View Details'
                                                                    }
                                                                    endDate={
                                                                        purchasedPolicy.endDate
                                                                    }
                                                                    pending={
                                                                        true
                                                                    }
                                                                />
                                                            </Col>
                                                        ),
                                                    );
                                                })}
                                        </Row>

                                        <div className="db-main-title">
                                            <h2>Active Policies</h2>
                                        </div>
                                        <Row>
                                            {purchasedPolicies
                                                .filter((el) => {
                                                    return (
                                                        el.status === 'active'
                                                    );
                                                })
                                                .flatMap((purchasedPolicy) => {
                                                    return purchasedPolicy.policies.map(
                                                        (policy) => (
                                                            <Col
                                                                xl={4}
                                                                lg="6"
                                                                md={6}
                                                                key={policy.id}
                                                            >
                                                                <PurchasedPoliciesCard
                                                                    insurerName={
                                                                        policy.insurer
                                                                    }
                                                                    sumAmount={
                                                                        policy.sumInsured
                                                                    }
                                                                    title={
                                                                        policyNameMap.get(
                                                                            policy.coverName,
                                                                        )!
                                                                    }
                                                                    image={
                                                                        // process
                                                                        //     .env
                                                                        //     .REACT_APP_IMAGE_BASE_URL +
                                                                        policyIconMap.get(
                                                                            policy.coverName,
                                                                        )!
                                                                    }
                                                                    startDate={
                                                                        purchasedPolicy.startDate
                                                                    }
                                                                    onClick={() => {
                                                                        sendGAEvent(
                                                                            GAActions.ViewDetailsClicked,
                                                                        );
                                                                        navigate(
                                                                            `/user/purchases/policies/${policy.id}`,
                                                                        );
                                                                    }}
                                                                    buttonTitle={
                                                                        'View Details'
                                                                    }
                                                                    endDate={
                                                                        purchasedPolicy.endDate
                                                                    }
                                                                />
                                                            </Col>
                                                        ),
                                                    );
                                                })}
                                        </Row>
                                    </div>
                                ) : (
                                    <ShopingCovered
                                        shopingTitle="You have no policies available to display."
                                        buttonTitle="Start Shopping"
                                        onClick={() => {
                                            handleSmeNavigate('/')
                                        }

                                        }
                                    />
                                )}
                            </Tab.Pane>

                            <Tab.Pane eventKey="non-covrzy">
                                <Row>
                                    {loading ? (
                                        <CustomLoader />
                                    ) : non_covrzy_policies.length !== 0 ? (
                                        non_covrzy_policies.map(
                                            (policy: any) => (
                                                <Col
                                                    xl={4}
                                                    lg={6}
                                                    md={6}
                                                    key={policy?.id}
                                                >
                                                    <NonCovrzyPoliciesCard
                                                        id={policy?.id}
                                                        title={
                                                            policy?.policy_name
                                                        }
                                                        image={
                                                            <NonCovrzyFile />
                                                        }
                                                        startDate={dateConverter(
                                                            policy?.policy_start_date,
                                                        )}
                                                        endDate={dateConverter(
                                                            policy?.policy_end_date,
                                                        )}
                                                        amount={
                                                            policy?.policy_coverage_amount
                                                        }
                                                        insurerName={
                                                            policy?.user
                                                                ?.company?.[0]
                                                                ?.insurer
                                                        }
                                                    />
                                                </Col>
                                            ),
                                        )
                                    ) : (
                                        <ShopingCovered shopingTitle="You have no Non-Covrzy policies available to display." />
                                    )}

                                    <div className="non-policies-title mt-4">
                                        <h3>Non-Covrzy Policies</h3>
                                        <p>
                                            <span>
                                                Have a non-Covrzy policy?
                                            </span>{' '}
                                            Upload it here to manage all your
                                            policies in one place or transfer it
                                            to Covrzy.{' '}
                                        </p>
                                    </div>
                                    <FileUpload
                                        file={file}
                                        // fileTypes={['doc']}
                                        onChange={handleChange}
                                    // fileTypeError={'Only doc file is supported'}
                                    />
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>

                {/* <div className="db-recommended">
                    <h2>Recommended Packages</h2>
                </div>
                {DashboardState.loading ? (
                    <CustomLoader />
                ) : (
                    <div className="pi-card-wrp db-card-wrp">
                        {DashboardState.package_list.length === 0 ? (
                            <ShoppingCovered shopingTitle="No Packages Found" />
                        ) : (
                            <Row>
                                {DashboardState.package_list
                                    ?.slice(0, 3)
                                    ?.map((obj: any) => (
                                        <Col lg={4} md={6} key={obj?.id}>
                                            <Cards
                                                // onClick={AddCoverageHandler}
                                                onClick={() =>
                                                    changeTabRoute(
                                                        '/user/dashboard',
                                                    )
                                                }
                                                // packageStatus={packageStatus}
                                                onLinkClick={() =>
                                                    handleShowPolicy(obj)
                                                }
                                                desc={obj?.package_defination}
                                                // desc={obj?.package_type}
                                                title={obj?.package_name}
                                                // image={StartupPackage}
                                                image={
                                                    process.env
                                                        .REACT_APP_IMAGE_BASE_URL +
                                                    obj?.icon
                                                }
                                                // hoverImage={StartupPackageOrange}
                                                // content={obj?.content}
                                                buttonTitle={'Add Coverage'}
                                                // buttonTitle={packageStatus && packageCount === 2 ? "Remove" : "Add Coverage"}
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
                        {DashboardState?.policies_list.length === 0 ? (
                            <ShoppingCovered shopingTitle="No Policies Found" />
                        ) : (
                            <Row>
                                {DashboardState?.policies_list?.map(
                                    (obj: any, i: number) => (
                                        <Col lg={4} md={6} key={obj?.id}>
                                            <Cards
                                                onClick={() =>
                                                    changeTabRoute(
                                                        '/user/dashboard',
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
                                    ),
                                )}
                            </Row>
                        )}
                    </div>
                )} */}

                {/* {DashboardState?.additional_policies_list.length !== 0 && (
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
                                    {DashboardState?.additional_policies_list?.map(
                                        (obj: any, i: number) => (
                                            <Col lg={4} md={6} key={obj?.id}>
                                                <Cards
                                                    onClick={() =>
                                                        changeTabRoute(
                                                            '/user/dashboard',
                                                        )
                                                    }
                                                    onLinkClick={() =>
                                                        handleShowPolicy(obj)
                                                    }
                                                    title={obj?.policy_name}
                                                    image={
                                                        process.env
                                                            .REACT_APP_IMAGE_BASE_URL +
                                                        obj?.icon
                                                    }
                                                    desc={
                                                        obj?.policy_defination
                                                    }
                                                    // desc={obj?.description}
                                                    // image={Liability}
                                                    // hoverImage={LiabilityOrange}
                                                    buttonTitle={'Buy Policy'}
                                                />
                                            </Col>
                                        ),
                                    )}
                                </Row>
                                {/* } */}
                {/* </div>
                        )}
                    </>
                )} */}

                {/* {showPolicy && (
                    <CanvasSideBar
                        show={showPolicy}
                        image={StartupPackage}
                        checkImage={CheckFill}
                        onHide={handleClose}
                        content={showPolicyData}
                        // buttonTitle={"View More"}
                        buttonTitle={
                            showPolicyData?.policy_name
                                ? 'Buy Policy'
                                : 'Add Coverage'
                        }
                        onClick={() => navigate(`/user/dashboard`)}
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

                {/* {show &&
                    <CanvasSideBar
                        show={show}
                        image={CommercialCrime}
                        checkImage={CheckFill}
                        onHide={handleClose}
                        buttonTitle={'Initiate a claim'}
                        claim_amount={showPolicyData?.policy?.claim_amount}
                        startDate={dateConverter(showPolicyData?.start_date)}
                        endDate={dateConverter(showPolicyData?.end_date)}
                        title={showPolicyData?.policy?.policy_name}
                        description={showPolicyData?.policy?.description}
                        coverage_amount={showPolicyData?.policy?.coverage_amount}
                        policy_cons={JSON.parse(showPolicyData?.policy?.policy_cons)}
                        policy_prons={JSON.parse(showPolicyData?.policy?.policy_prons)}
                        onClick={() => navigate(`/user/claims/activePolicy/${showPolicyData?.purchased_policy_id}`)}
                    // onClick={AddCoverageHandler}
                    />} */}
                {/* <div className="pi-card-wrp db-card-wrp">
                    <Row>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(1) }} packageStatus={packageStatus} onLinkClick={handleShow} title="Startup Package" image={StartupPackage} hoverImage={StartupPackageOrange} content="The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits." buttonTitle={packageStatus && packageCount === 1 ? "Remove" : "Add Coverage"} /></Col>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(2) }} packageStatus={packageStatus} onLinkClick={handleShow} title="Commercial Crime" image={Liability} hoverImage={LiabilityOrange} content="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners." buttonTitle={packageStatus && packageCount === 2 ? "Remove" : "Add Coverage"} /></Col>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(3) }} packageStatus={packageStatus} onLinkClick={handleShow} title="Business Insurance" image={BMI} hoverImage={BMIOrange} content="A one-two punch of insurance happiness. Your executives want their assets protected, and your company needs protection from alleged sexual harassment or discrimination suits." buttonTitle={packageStatus && packageCount === 3 ? "Remove" : "Add Coverage"} /></Col>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(1) }} packageStatus={packageStatus} title="Startup Package" image={StartupPackage} hoverImage={StartupPackageOrange} content="The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits." buttonTitle={packageStatus && packageCount === 1 ? "Remove" : "Add Coverage"} /></Col>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(2) }} packageStatus={packageStatus} title="Commercial Crime" image={Liability} hoverImage={LiabilityOrange} content="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners." buttonTitle={packageStatus && packageCount === 2 ? "Remove" : "Add Coverage"} /></Col>
                        <Col lg={4} md={6}><Cards onClick={() => { setPackageStatus(!packageStatus); setPackageCount(3) }} packageStatus={packageStatus} title="Business Insurance" image={BMI} hoverImage={BMIOrange} content="A one-two punch of insurance happiness. Your executives want their assets protected, and your company needs protection from alleged sexual harassment or discrimination suits." buttonTitle={packageStatus && packageCount === 3 ? "Remove" : "Add Coverage"} /></Col>
                    </Row>
                </div> */}
                {/* <div className="coverzy-policies-card">
                    <Row>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Startup Package" image={StartupPackage} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="90,000" />
                        </Col>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Commercial Crime" image={CommercialCrime} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="70,000" />
                        </Col>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Tech Errors Insurance" image={TechInsurance} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="90,000" />
                        </Col>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Startup Package" image={StartupPackage} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="90,000" />
                        </Col>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Commercial Crime" image={CommercialCrime} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="70,000" />
                        </Col>
                        <Col xl={4} lg={6} md={6}>
                            <PoliciesCard title="Tech Errors Insurance" image={TechInsurance} startDate="8th Nov, 2021" endDate="8th Nov, 2022" amount="90,000" />
                        </Col>
                    </Row>
                </div> */}
                {
                    // <Offcanvas className="policies-canvas" show={show} onHide={handleClose} placement={"end"}>
                    //     <Offcanvas.Header closeButton></Offcanvas.Header>
                    //     <div className="policies-step" id="policies-step-one">
                    //         <div className="pi-package-img mb-4">
                    //             <img src={CoverzyOrangeLogo} alt='' />
                    //         </div>
                    //         <div className="policies-step-title">
                    //             <h4>Let Shotwell help you out.</h4>
                    //             <p>Answer just a few questions about your business to help us determine what coverages are best for you.</p>
                    //         </div>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='Continue' />
                    //             <OrangeButton buttonName='Skip for now' />
                    //         </div>
                    //     </div>
                    //     <div className="policies-step" id="policies-step-two">
                    //         <div className="po-head-title">Company Website</div>
                    //         <div className="policies-step-title">
                    //             <h4>Do you have a company website?</h4>
                    //             <p>Knowing your company website helps us look up publicly available information about your business and prepopulate this information to make your application process much easier.</p>
                    //         </div>
                    //         <Form.Group className="form-group" controlId="formBasicEmail">
                    //             <CustomLabel label="Company website" />
                    //             <CustomInput type="text" name="name" placeholder="Enter Company website" />
                    //         </Form.Group>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='Continue' />
                    //             <TextButton buttonTitle='Back' />
                    //         </div>
                    //     </div>
                    //     <div className="policies-step" id="policies-step-three">
                    //         <div className="po-head-title">Your Company Profile</div>
                    //         <div className="policies-step-title">
                    //             <h4>Tell us a little bit more about your company.</h4>
                    //             <p>In order to find the best insurance fit, we need to know your company name and industry.</p>
                    //         </div>
                    //         <Form.Group className="form-group" controlId="formBasicEmail">
                    //             <CustomSelect data={['Industry name, description, NAICS code...', 'Private', 'Public']} />
                    //         </Form.Group>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='Continue' />
                    //             <TextButton buttonTitle='Back' />
                    //         </div>
                    //     </div>
                    //     <div className="policies-step" id="policies-step-four">
                    //         <div className="po-head-title">Fundraising</div>
                    //         <div className="policies-step-title">
                    //             <h4>Has your company raised funding?</h4>
                    //             <p>In order to find the best insurance fit, we need to know your company name and industry.</p>
                    //         </div>
                    //         <div className="pi-radio-wrp mb-4">
                    //             <CustomRadio type="radio" label="Yes" name="one02" checked />
                    //             <CustomRadio type="radio" label="No" name="one02" />
                    //         </div>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='Continue' />
                    //             <TextButton buttonTitle='Back' />
                    //         </div>
                    //     </div>
                    //     <div className="policies-step" id="policies-step-five">
                    //         <div className="po-head-title">Estimated total revenue</div>
                    //         <div className="policies-step-title">
                    //             <h4>Is your estimated total revenue for 2022 greater than $20 million?</h4>
                    //             <p>If so, awesome! If not, don’t worry. We have the perfect fit for you either way!</p>
                    //         </div>
                    //         <div className="pi-radio-wrp mb-4">
                    //             <CustomRadio type="radio" label="Yes" name="one02" checked />
                    //             <CustomRadio type="radio" label="No" name="one02" />
                    //         </div>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='Continue' />
                    //             <TextButton buttonTitle='Back' />
                    //         </div>
                    //     </div>
                    //     <div className="policies-step" id="policies-step-six">
                    //         <div className="po-head-title">Number of W-2 employees</div>
                    //         <div className="policies-step-title">
                    //             <h4>How many W-2 employees do you have?</h4>
                    //             <p>A W-2 employee is someone whose employer deducts taxes from their paychecks and submits this information to the government.</p>
                    //             <p>We've pre-filled some information for you from our data providers. Please review the information and make any relevant changes.</p>
                    //         </div>
                    //         <div className="pi-radio-wrp mb-4 poli-employees">
                    //             <CustomRadio type="radio" label="My company doesn't have any W-2 employees" name="one04" checked />
                    //             <CustomRadio type="radio" label="Between 1 and 40" name="one04" />
                    //             <CustomRadio type="radio" label="More than 40" name="one04" />
                    //             <CustomRadio type="radio" label="More than 60" name="one04" />
                    //             <CustomRadio type="radio" label="More than 100" name="one04" />
                    //         </div>
                    //         <div className="pi-step-btn" style={{ justifyContent: 'flex-start', columnGap: '15px' }}>
                    //             <CustomButton buttonTitle='View recommendations' />
                    //             <TextButton buttonTitle='Back' />
                    //         </div>
                    //     </div>
                    // </Offcanvas>
                }
            </div>
        </Fragment>
    );
};

export default Policies;

import { Fragment, useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import StartupPackage from '../../assets/images/startup-package.svg';
// import download from '../../assets/images/download.svg';
// import CustomLabel from "../../common/CustomLabel";
// import CustomSelect from "../../common/CustomSelect";
import CustomRadio from '../../common/CustomRadio';
// import CustomInput from "../../common/CustomInput";
// import RupeeSign from '../../assets/images/rupee-sign-solid.svg';
import CustomTooltip from '../../common/CustomTooltip';
import CustomButton from '../../common/Buttons/CustomButton';
// import { Nav } from "react-bootstrap";
// import CustomDateRangePicker from "../../common/DateRangePicker";
import { useDispatch, useSelector } from 'react-redux';
import {
    ClearStateAction,
    CrateOrderIdAction,
    // CrateOrderIdAction,
    GetCompanyProfileStateAction,
    // GetPackageWithPlanAction,
    GetSinglePolicyPlanAction,
    PurchaseCoverageAction,
    SendCustomizeCoverageAction,
    // VerifyPaymentAction
} from '../../Redux/Actions/DashboardAction';
import { IReduxState } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import { COMPLETE_PAYMENT } from '../../constants/main';
import CustomLoader from '../../common/Loader/CustomLoader';
import { NumberFormat } from '../../common/NumberFormat';
import CustomInput from '../../common/CustomInput';
import CustomModal from '../../common/CustomModal';
import success from '../../assets/images/success.gif';
import { MinDate, phonesRegx } from '../../Helper/commonFunction';
import { GetPackageDetailsAction } from '../../Redux/Actions/HomepageActions';
import CustomSelect from '../../common/CustomSelect';
import CustomPhoneInput from '../../common/PhoneInput';
import { useCalendlyEventListener } from 'react-calendly';
import CalendlyPopup from './calendlyPopup';

const policyLimitAmount = [
    { id: 1, amount: '1 Crore' },
    { id: 2, amount: '2 Crore' },
    { id: 3, amount: '3 Crore' },
    { id: 4, amount: '4 Crore' },
    { id: 5, amount: '5 Crore' },
    { id: 6, amount: 'More then 5 Crore' },
];

const ComplatePayment = () => {
    const [showModal, setShowModal] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isConfirmMeeting, setIsConfirmMeeting] = useState(false);
    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [countryCode, setCountryCode] = useState<string>('91');
    const [showError, setShowError] = useState<string>('');
    const [finalizePolicy, setFinalizePolicy] = useState<any>([]);
    const [dateState, setDateState] = useState({
        start: moment().toDate(),
        end: new Date(MinDate(moment().toDate().toString())),
    });
    const [selectdPlan, setSelectedPlan] = useState({
        plan_type: 'platinum',
        amount: 0,
    });
    const [selectOption, setSelectOption] = useState({
        meetOption: 'schedule-meeting',
        phone_number: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, planType }: any = useParams();
    const {
        loading,
        req_loading,
        is_getData,
        // view_package_plan,
        orderCreatedData,
        is_paymentSuccess,
        view_single_policy,
        is_profile_completed,
        // customizeRequest,
        is_purchaed,
    } = useSelector((state: IReduxState) => state.Dashboard);
    const {
        package_details,
        // package_details_addOn,
        loading: packageLoading,
    } = useSelector((state: IReduxState) => state.Homepage);

    const handleCallback = (e: any) => {
        const tempDate = { ...dateState };
        if (e.target.name === 'start_date') {
            tempDate.start = moment(e.target.value).toDate();
            tempDate.end = new Date(MinDate(e.target.value));
        } else if (e.target.name === 'end_date') {
            tempDate.end = moment(e.target.value).toDate();
        }
        setDateState(tempDate);
    };

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    useEffect(() => {
        dispatch(setPageHeaderTitle(COMPLETE_PAYMENT));
        dispatch(GetCompanyProfileStateAction());
        if (planType === 'package') {
            // dispatch(GetPackageWithPlanAction(id ? id : ''))
            dispatch(GetPackageDetailsAction(id));
        } else if (planType === 'policy') {
            dispatch(GetSinglePolicyPlanAction(id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            is_getData === 'failed' ||
            ((!loading || !packageLoading) && is_profile_completed === 'no')
        ) {
            handleNavigate('/user/dashboard');
        }
    }, [is_getData, is_profile_completed]);

    // useEffect(() => {
    //     if (customizeRequest !== '') {
    //         setShowModal(true)
    //         // // setTimeout(() => {
    //         // dispatch(ClearStateAction())
    //         // navigate('/user/dashboard')
    //         // // }, 1000)
    //     }
    // }, [customizeRequest])

    useEffect(() => {
        if (is_purchaed !== '') {
            setShowModal(true);
        }
    }, [is_purchaed]);

    useEffect(() => {
        if (
            planType === 'package' &&
            package_details?.packages_policy?.length !== 0
        ) {
            const tempArray: any = [];
            package_details?.packages_policy?.map((item: object | any) => {
                tempArray.push({
                    policy_id: item?.policy_id?.id,
                    amount: '1 Crore',
                });
            });
            setFinalizePolicy(tempArray);
        } else {
            setFinalizePolicy([{ policy_id: id, amount: '1 Crore' }]);
        }
    }, [package_details?.packages_policy, planType]);

    useEffect(() => {
        // if (planType === 'package' && view_package_plan?.platinum_plan) {
        //     setSelectedPlan({ ...selectdPlan, amount: view_package_plan?.platinum_plan })
        // } else
        if (planType === 'policy' && view_single_policy?.policy_amount) {
            setSelectedPlan({
                plan_type: 'none',
                amount: view_single_policy?.policy_amount,
            });
        }
        // }, [view_package_plan, view_single_policy])
    }, [view_single_policy, planType]);

    useEffect(() => {
        if (is_paymentSuccess) {
            dispatch(ClearStateAction());
            handleNavigate('/user/payment');
        }
    }, [is_paymentSuccess]);

    useEffect(() => {
        if (orderCreatedData?.id) {
            setShowModal(true);
            // const payload = {
            //     razorpay_order_id: orderCreatedData?.id,
            //     razorpay_payment_id: `pay${Math.round(Math.random() * 10005165111)}`,
            //     razorpay_signature: `SD_${Math.round(Math.random() * 10565874540)}`,
            // }
            // dispatch(VerifyPaymentAction(payload))
        }
    }, [orderCreatedData]);

    useCalendlyEventListener({
        // onProfilePageViewed: () => console.log("onProfilePageViewed"),
        // onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        // onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => {
            const payload: any = {
                start_date: dateState?.start,
                end_date: dateState?.end,
                finalize_policy: finalizePolicy,
            };

            if (planType === 'package') payload.package_id = id;
            else payload.policy_id = view_single_policy?.id;

            if (selectOption.meetOption === 'schedule-meeting') {
                payload.meeting_type = selectOption.meetOption;
                setIsOpenModal(true);
            }
            dispatch(CrateOrderIdAction(payload));
            setIsConfirmMeeting(true);
            // console.log('onEventScheduled', e.data.payload)
        },
    });

    const changePackagePlanHanlder = (
        e: React.FormEvent<HTMLInputElement>,
        planType: string,
    ) => {
        setSelectedPlan({
            plan_type: planType,
            amount: Number(e.currentTarget.value),
        });
    };

    const changeMeetingOptionHanlder = (meetingType: string) => {
        setSelectOption({ meetOption: meetingType, phone_number: '' });
    };

    const submitPayment = () => {
        const payload: any = {
            start_date: dateState?.start,
            end_date: dateState?.end,
            currency: 'INR',
            // amount: selectdPlan?.amount + packageExCharges?.fees + packageExCharges?.taxes,
            amount:
                Number(selectdPlan?.amount) +
                Number(selectdPlan?.amount) * 0.18,
            plan_type: selectdPlan?.plan_type,
            taxes: Number(selectdPlan?.amount) * 0.18,
        };
        if (planType === 'package') {
            // payload.package_id = view_package_plan?.package_id?.id
        } else if (planType === 'policy') {
            payload.policy_id = view_single_policy?.id;
        }
        dispatch(PurchaseCoverageAction(payload));
        // dispatch(CrateOrderIdAction(payload))
        // setShowModal(true)
    };

    const validatePhoneNumber = (phone: string) => {
        var re = phonesRegx[countryCode];
        return re.test(phone);
    };

    const submitFinalizeCoverage = () => {
        const payload: any = {
            start_date: dateState?.start,
            end_date: dateState?.end,
            finalize_policy: finalizePolicy,
        };
        if (planType === 'package') payload.package_id = id;
        else payload.policy_id = view_single_policy?.id;

        if (selectOption.meetOption === 'schedule-meeting') {
            payload.meetingType = selectOption.meetOption;
            setIsOpenModal(true);
        } else if (selectOption.meetOption === 'request-callback') {
            if (validatePhoneNumber(selectOption.phone_number)) {
                payload.meeting_type = selectOption.meetOption;
                payload.phone_number = Number(selectOption.phone_number);

                setShowFinalizeModal(false);
                // setShowModal(true)
                dispatch(CrateOrderIdAction(payload));
            } else {
                setShowError('Please Enter Valid Phone Number');
            }
        }
    };

    const handleChangePolicyLimit = (
        e: React.FormEvent<HTMLInputElement>,
        id: number,
    ) => {
        const temp = [...finalizePolicy];
        const findObject = temp.findIndex(
            (item: object | any) => item.policy_id === id,
        );
        temp[findObject].amount = e.currentTarget.value;
        setFinalizePolicy(temp);
    };

    const closeModalHandler = () => {
        setShowModal(false);
        dispatch(ClearStateAction());
        handleNavigate('/user/dashboard');
    };

    const closeFinalizeModal = () => {
        setShowFinalizeModal(false);
    };

    const onModalClose = () => {
        if (isConfirmMeeting) {
            handleNavigate('/user/dashboard');
        }
        setIsOpenModal(false);
    };

    const modalBody = (
        <Fragment>
            <div>
                <div className="d-flex justify-content-center p-2">
                    <img src={success} alt="success" />
                </div>
                <p
                    className="bill-box-sub-title text-body mt-2"
                    style={{ textAlign: 'center', padding: '8px 48px' }}
                >
                    {/* {is_purchaed} */}
                    We got your request and we will get in touch within 2
                    business days
                </p>
            </div>
        </Fragment>
    );

    const FinalizeModalBody = (
        <Fragment>
            <div
                className="package-box"
                onClick={() => changeMeetingOptionHanlder('schedule-meeting')}
            >
                <div className="radio-select">
                    <CustomRadio
                        type="radio"
                        name="meeting"
                        onChange={() =>
                            changeMeetingOptionHanlder('schedule-meeting')
                        }
                        value={'schedule-meeting'}
                        defaultChecked={
                            selectOption.meetOption === 'schedule-meeting'
                        }
                        checked={selectOption.meetOption === 'schedule-meeting'}
                    />
                </div>
                <div className="package-box-desc">
                    <div className="package-box-title">
                        <h3>Schedule a meeting using calendly</h3>
                    </div>
                </div>
            </div>
            <div
                className="package-box mb-0"
                onClick={() => changeMeetingOptionHanlder('request-callback')}
            >
                <div className="radio-select">
                    <CustomRadio
                        type="radio"
                        name="meeting"
                        onChange={() =>
                            changeMeetingOptionHanlder('request-callback')
                        }
                        value={'request-callback'}
                        defaultChecked={
                            selectOption.meetOption === 'request-callback'
                        }
                        checked={selectOption.meetOption === 'request-callback'}
                    />
                </div>
                <div className="package-box-desc">
                    <div className="package-box-title">
                        <h3>Request a call back</h3>
                    </div>
                    {selectOption.meetOption === 'request-callback' && (
                        <div className="package-box-title p-2">
                            <Form.Group className="form-group d-block">
                                <CustomPhoneInput
                                    country={'in'}
                                    placeholder=""
                                    value={selectOption.phone_number}
                                    onChange={(phone: any, country: any) => {
                                        setShowError('');
                                        setCountryCode(country?.dialCode);
                                        setSelectOption({
                                            meetOption: 'request-callback',
                                            phone_number: phone,
                                        });
                                    }}
                                />
                                {showError !== '' && (
                                    <span
                                        className="text-error"
                                        style={{ fontSize: 14 }}
                                    >
                                        {showError}
                                    </span>
                                )}
                            </Form.Group>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );

    return (
        <Fragment>
            <CustomModal
                show={showModal}
                size="md"
                // onHide={closeModalHandler}
                // headerTitle=''
                body={modalBody}
                customButtonTitle="Close"
                onClickCustomButton={closeModalHandler}
            />

            <CustomModal
                show={showFinalizeModal}
                size="lg"
                titleFontSize={26}
                onHide={closeFinalizeModal}
                headerTitle="Schedule a call with our expert before we share the price"
                body={FinalizeModalBody}
                customButtonTitle="Submit"
                onClickCustomButton={submitFinalizeCoverage}
            />

            {/* <InlineWidget url="https://calendly.com/covrzy/30min" /> */}

            {/* {selectOption.meetOption === 'schedule-meeting' && <PopupWidget
                url="https://calendly.com/covrzy/30min"
                rootElement={document.getElementById("root") as HTMLElement}
                // text="Click here to schedule!"
                // textColor="#ffffff"
                // color="#00a2ff"
                utm={{}}
                prefill={{}}
                onModalClose={() => setIsOpenModal(false)}
                open={isOpenModal}
            />} */}

            <CalendlyPopup isOpen={isOpenModal} onModalClose={onModalClose} />

            {loading || packageLoading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <div className="payment-download">
                    <Row className="align-items-center">
                        <Col lg={10}>
                            <div className="payment-name">
                                <div className="payment-name-img">
                                    <span>
                                        <img
                                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${planType === 'package'
                                                    ? package_details?.icon
                                                    : view_single_policy?.icon
                                                }`}
                                            alt=""
                                            width="80%"
                                        />
                                    </span>
                                </div>
                                <div className="payment-name-desc">
                                    <h2>
                                        Your{' '}
                                        <span>
                                            {planType === 'package'
                                                ? // view_package_plan?.package_id?.package_name :
                                                package_details?.package_name
                                                : planType === 'policy'
                                                    ? view_single_policy?.policy_name
                                                    : ''}
                                        </span>
                                    </h2>
                                    <p>Quote expires in 45 days</p>
                                </div>
                            </div>
                        </Col>
                        {/* <Col lg={6}>
                        <div className="download-item">
                            <p><img src={download} alt="" />Generate quote</p>
                            <p><img src={download} alt="" />Generate specimen policy</p>
                            <p><img src={download} alt="" />Download application</p>
                        </div>

                    </Col> */}
                    </Row>
                    <div className="db-line"></div>
                    <div className="bill-wrp">
                        <Row>
                            <Col lg={6}>
                                <div className="bill-box">
                                    <h2 className="bill-box-title">
                                        When do you want your coverage to begin?
                                    </h2>
                                    {/* <CustomDateRangePicker
                                        start={dateState?.start}
                                        end={dateState?.end}
                                        handleCallback={handleCallback}
                                        minDate={moment().toDate()}
                                        maxDate={moment(dateState?.start.toDate().toISOString()).months(12).toDate()}
                                    /> */}
                                    <Row className="mb-2 justify-content-center">
                                        <Col lg={5}>
                                            <CustomInput
                                                type="date"
                                                minDate={moment().format(
                                                    'YYYY-MM-DD',
                                                )}
                                                // minDate={new Date().toISOString().split("T")[0]}
                                                name="start_date"
                                                // value={dateState?.start.toISOString().split("T")[0]}
                                                value={moment(
                                                    dateState?.start,
                                                ).format('YYYY-MM-DD')}
                                                onChange={handleCallback}
                                            />
                                        </Col>
                                        <Col lg={1}>
                                            <p
                                                className="d-flex justify-content-center"
                                                style={{ fontSize: 26 }}
                                            >
                                                -
                                            </p>
                                        </Col>
                                        <Col lg={5}>
                                            <CustomInput
                                                type="date"
                                                // maxDate={moment(dateState?.start.toDate().toISOString()).toDate().toISOString().split("T")[0]}
                                                minDate={MinDate(
                                                    dateState?.start.toString(),
                                                )}
                                                name="end_date"
                                                value={moment(
                                                    dateState?.end,
                                                ).format('YYYY-MM-DD')}
                                                onChange={handleCallback}
                                            />
                                        </Col>
                                    </Row>
                                    {/* {planType === 'package' && <> */}
                                    {/* <h2 className="bill-box-title">Please select from below plan:</h2> */}
                                    <h2 className="bill-box-title">
                                        Please select coverage for below
                                        policies:
                                    </h2>
                                    <div className="package-box box-style">
                                        <ol style={{ marginLeft: 20 }}>
                                            {planType === 'package' ? (
                                                package_details?.packages_policy?.map(
                                                    (obj: object | any) => (
                                                        <li
                                                            className="mb-3"
                                                            key={
                                                                obj?.packages_policy_id
                                                            }
                                                        >
                                                            <Row>
                                                                <Col
                                                                    md={7}
                                                                    sm={12}
                                                                    xs={12}
                                                                    className="my-auto pb-1"
                                                                >
                                                                    {
                                                                        obj
                                                                            ?.policy_id
                                                                            ?.policy_name
                                                                    }
                                                                </Col>
                                                                <Col
                                                                    md={5}
                                                                    sm={12}
                                                                    xs={12}
                                                                >
                                                                    <CustomSelect
                                                                        // selected={}
                                                                        name="name"
                                                                        onChange={(
                                                                            e: React.FormEvent<HTMLInputElement>,
                                                                        ) =>
                                                                            handleChangePolicyLimit(
                                                                                e,
                                                                                obj
                                                                                    ?.policy_id
                                                                                    ?.id,
                                                                            )
                                                                        }
                                                                        data={
                                                                            policyLimitAmount
                                                                        }
                                                                        value_key="amount"
                                                                        title_key="amount"
                                                                    // title='Select covarage limt'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </li>
                                                    ),
                                                )
                                            ) : (
                                                <li className="mb-3">
                                                    <Row>
                                                        <Col
                                                            md={7}
                                                            sm={12}
                                                            xs={12}
                                                            className="my-auto pb-1"
                                                        >
                                                            {
                                                                view_single_policy?.policy_name
                                                            }
                                                        </Col>
                                                        <Col
                                                            md={5}
                                                            sm={12}
                                                            xs={12}
                                                        >
                                                            <CustomSelect
                                                                // selected={companyFormik.values.company_type}
                                                                name="name"
                                                                onChange={(
                                                                    e: React.FormEvent<HTMLInputElement>,
                                                                ) =>
                                                                    handleChangePolicyLimit(
                                                                        e,
                                                                        id,
                                                                    )
                                                                }
                                                                data={
                                                                    policyLimitAmount
                                                                }
                                                                value_key="amount"
                                                                title_key="amount"
                                                            // title='Select covarage limt'
                                                            />
                                                        </Col>
                                                    </Row>
                                                </li>
                                            )}
                                            { }
                                        </ol>
                                        <div className="d-flex justify-content-center">
                                            <CustomButton
                                                buttonTitle={
                                                    'Finalize Coverage'
                                                }
                                                onClick={() =>
                                                    setShowFinalizeModal(true)
                                                }
                                            // buttonTitle={req_loading ?
                                            //     <div className="d-flex justify-content-center gap-2">
                                            //         <Spinner
                                            //             animation="border"
                                            //             style={{ width: 23, height: 23 }}
                                            //         />
                                            //         <span>Please wait...</span>
                                            //     </div> :
                                            //     'Finalize Coverage'}
                                            // onClick={() => dispatch(SendCustomizeCoverageAction(id as string))}
                                            />
                                        </div>
                                    </div>

                                    {/*  ....................Not Used now........................................... */}
                                    {false && (
                                        <>
                                            <div className="package-box">
                                                <div className="radio-select">
                                                    <CustomRadio
                                                        type="radio"
                                                        name="amount"
                                                        onChange={(
                                                            e: React.FormEvent<HTMLInputElement>,
                                                        ) =>
                                                            changePackagePlanHanlder(
                                                                e,
                                                                'platinum',
                                                            )
                                                        }
                                                        // value={view_package_plan?.platinum_plan}
                                                        defaultChecked={
                                                            selectdPlan?.plan_type ===
                                                            'platinum'
                                                        }
                                                    />
                                                </div>
                                                <div className="package-box-desc">
                                                    <div className="package-box-title">
                                                        <h3>Platinum Plan</h3>
                                                        {/* <span>{NumberFormat(view_package_plan?.platinum_plan)}</span> */}
                                                    </div>
                                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem Ipsum has been the industry's standard dummy.</p> */}
                                                    {/* <Form.Group className="form-group" controlId="formBasicEmail">
                                            <CustomLabel label="Select Your Package" />
                                            <CustomSelect data={['Select Package', 'Private', 'Public']} />
                                        </Form.Group> */}
                                                </div>
                                            </div>
                                            <div className="package-box">
                                                <div className="radio-select">
                                                    <CustomRadio
                                                        type="radio"
                                                        name="amount"
                                                        onChange={(
                                                            e: React.FormEvent<HTMLInputElement>,
                                                        ) =>
                                                            changePackagePlanHanlder(
                                                                e,
                                                                'silver',
                                                            )
                                                        }
                                                        // value={view_package_plan?.silver_plan}
                                                        checked={
                                                            selectdPlan?.plan_type ===
                                                            'silver'
                                                        }
                                                    />
                                                </div>
                                                <div className="package-box-desc">
                                                    <div className="package-box-title">
                                                        <h3>Silver Plan</h3>
                                                        {/* <span>{NumberFormat(view_package_plan?.silver_plan)}</span> */}
                                                    </div>
                                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem Ipsum has been the industry's standard dummy.</p> */}
                                                    {/* <Form.Group className="form-group" controlId="formBasicEmail">
                                            <CustomLabel label="Select Your Package" />
                                            <CustomSelect data={['Select Package', 'Private', 'Public']} />
                                        </Form.Group> */}
                                                </div>
                                            </div>
                                            <div className="package-box">
                                                <div className="radio-select">
                                                    <CustomRadio
                                                        type="radio"
                                                        name="amount"
                                                        onChange={(
                                                            e: React.FormEvent<HTMLInputElement>,
                                                        ) =>
                                                            changePackagePlanHanlder(
                                                                e,
                                                                'gold',
                                                            )
                                                        }
                                                        // value={view_package_plan?.gold_plan}
                                                        checked={
                                                            selectdPlan?.plan_type ===
                                                            'gold'
                                                        }
                                                    />
                                                </div>
                                                <div className="package-box-desc">
                                                    <div className="package-box-title">
                                                        <h3>Gold Plan</h3>
                                                        {/* <span>{NumberFormat(view_package_plan?.gold_plan)}</span> */}
                                                    </div>
                                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem Ipsum has been the industry's standard dummy.</p> */}
                                                    {/* <Form.Group className="form-group" controlId="formBasicEmail">
                                            <CustomLabel label="Select Your Package" />
                                            <CustomSelect data={['Select Package', 'Private', 'Public']} />
                                        </Form.Group> */}
                                                </div>
                                            </div>
                                            <div className="package-box">
                                                <div className="radio-select">
                                                    <CustomRadio
                                                        type="radio"
                                                        name="amount"
                                                        onChange={(
                                                            e: React.FormEvent<HTMLInputElement>,
                                                        ) =>
                                                            changePackagePlanHanlder(
                                                                e,
                                                                'premium',
                                                            )
                                                        }
                                                        // value={view_package_plan?.premium_plan}
                                                        defaultChecked={
                                                            selectdPlan?.plan_type ===
                                                            'premium'
                                                        }
                                                    />
                                                </div>
                                                <div className="package-box-desc">
                                                    <div className="package-box-title">
                                                        <h3>Premium Plan</h3>
                                                        {/* <span>{NumberFormat(view_package_plan?.premium_plan)}</span> */}
                                                    </div>
                                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem Ipsum has been the industry's standard dummy.</p> */}
                                                    {/* <Form.Group className="form-group" controlId="formBasicEmail">
                                            <CustomLabel label="Select Your Package" />
                                            <CustomSelect data={['Select Package', 'Private', 'Public']} />
                                        </Form.Group> */}
                                                </div>
                                            </div>

                                            <div className="package-box">
                                                <div className="radio-select">
                                                    <CustomRadio
                                                        type="radio"
                                                        name="amount"
                                                        onChange={(
                                                            e: React.FormEvent<HTMLInputElement>,
                                                        ) =>
                                                            changePackagePlanHanlder(
                                                                e,
                                                                'custom',
                                                            )
                                                        }
                                                        value={0}
                                                        defaultChecked={
                                                            selectdPlan?.plan_type ===
                                                            'custom'
                                                        }
                                                    />
                                                </div>
                                                <div className="package-box-desc">
                                                    <h2 className="bill-box-title mb-0">
                                                        Customized your coverage
                                                    </h2>
                                                    {selectdPlan?.plan_type ===
                                                        'custom' && (
                                                            <div className="mt-3">
                                                                <p className="bill-box-sub-title">
                                                                    Want to
                                                                    customize? Click
                                                                    below & Support
                                                                    team reach you
                                                                    out.
                                                                    {/* Covers the loss of money, securities, or tangible property, directly caused by cybers, such as employee theft, robbery, forgery, and certain types of computer fraud. */}
                                                                </p>
                                                                <div className="bill-limit">
                                                                    <Row>
                                                                        <Col lg={6}>
                                                                            <CustomButton
                                                                                buttonTitle={
                                                                                    req_loading ? (
                                                                                        <div className="d-flex justify-content-center gap-2">
                                                                                            <Spinner
                                                                                                animation="border"
                                                                                                style={{
                                                                                                    width: 23,
                                                                                                    height: 23,
                                                                                                }}
                                                                                            />
                                                                                            <span>
                                                                                                Please
                                                                                                wait...
                                                                                            </span>
                                                                                        </div>
                                                                                    ) : (
                                                                                        'Click Here'
                                                                                    )
                                                                                }
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        SendCustomizeCoverageAction(
                                                                                            id as string,
                                                                                        ),
                                                                                    )
                                                                                }
                                                                            />
                                                                            {/* <Form.Group className="form-group" controlId="formBasicEmail">
                                                        <CustomLabel label="Limit" />
                                                        <CustomSelect data={['1,00,000', '1,50,000', '2,00,000']} />
                                                        <img src={RupeeSign} alt="" />
                                                    </Form.Group> */}
                                                                        </Col>
                                                                        {/* <Col lg={6}>
                                                    <Form.Group className="form-group" controlId="formBasicEmail">
                                                        <CustomLabel label="Retention" />
                                                        <CustomSelect data={['5000', '6000', '7000']} />
                                                        <img src={RupeeSign} alt="" />
                                                    </Form.Group>
                                                </Col> */}
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {/* <hr />
                                        <h2 className="bill-box-title">Here are customized your coverage</h2>
                                        <p className="bill-box-sub-title">Covers the loss of money, securities, or tangible property, directly caused by cybers, such as employee theft, robbery, forgery, and certain types of computer fraud.</p>
                                        <div className="bill-limit">
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group className="form-group" controlId="formBasicEmail">
                                                        <CustomLabel label="Limit" />
                                                        <CustomSelect data={['1,00,000', '1,50,000', '2,00,000']} />
                                                        <img src={RupeeSign} alt="" />
                                                    </Form.Group>
                                                </Col> */}
                                    {/* <Col lg={6}>
                                                    <Form.Group className="form-group" controlId="formBasicEmail">
                                                        <CustomLabel label="Retention" />
                                                        <CustomSelect data={['5000', '6000', '7000']} />
                                                        <img src={RupeeSign} alt="" />
                                                    </Form.Group>
                                                </Col> */}
                                    {/* </Row>
                                        </div> */}
                                    {/* <strong>Premium:<span>1,321.00</span></strong> */}
                                    {/*  ....................Not Used upto........................................... */}

                                    {/* </>} */}
                                </div>
                            </Col>
                            {false &&
                                selectdPlan?.plan_type !== 'custom' &&
                                planType !== 'package' && (
                                    <Col lg={6}>
                                        <div className="bill-box">
                                            <h3 className="bill-credit-title">
                                                COVERAGES
                                            </h3>
                                            <div className="bill-credit">
                                                <p>
                                                    {
                                                        // planType === 'package' ?
                                                        // view_package_plan?.package_id?.package_name :
                                                        planType === 'policy'
                                                            ? view_single_policy?.policy_name
                                                            : ''
                                                    }
                                                </p>
                                                <span>
                                                    {NumberFormat(
                                                        selectdPlan?.amount,
                                                    )}
                                                </span>
                                            </div>
                                            <hr />
                                            {/* <h3 className="bill-credit-title">CREDITS</h3>
                                <div className="bill-credit"><em>Have a partner code?</em></div>
                                <Form.Group className="form-group" controlId="formBasicEmail">
                                    <CustomInput type="text" name="name" placeholder="Enter partner code" />
                                    <span className="apply-code">Apply Code</span>
                                </Form.Group> */}
                                            {/* <hr /> */}
                                            <h3 className="bill-credit-title">
                                                SUBTOTAL
                                            </h3>
                                            <div className="bill-credit">
                                                <p>
                                                    Taxes{' '}
                                                    <CustomTooltip message="18% GST on premium" />
                                                </p>
                                                <span>
                                                    {NumberFormat(
                                                        selectdPlan?.amount *
                                                        0.18,
                                                    )}
                                                </span>
                                            </div>
                                            {/* <div className="bill-credit">
                                        <p>Fees <CustomTooltip message="Fees" /></p>
                                        <span>{NumberFormat(packageExCharges?.fees)}</span>
                                    </div> */}
                                            <hr />
                                            <div className="bill-credit">
                                                <strong>Total Amount</strong>
                                                {/* <span>{NumberFormat(selectdPlan?.amount + packageExCharges?.fees + packageExCharges?.taxes)}</span> */}
                                                <span>
                                                    {NumberFormat(
                                                        Number(
                                                            selectdPlan?.amount,
                                                        ) +
                                                        Number(
                                                            selectdPlan?.amount,
                                                        ) *
                                                        0.18,
                                                    )}
                                                </span>
                                            </div>
                                            <CustomButton
                                                buttonTitle={
                                                    req_loading ? (
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Spinner
                                                                animation="border"
                                                                style={{
                                                                    width: 23,
                                                                    height: 23,
                                                                }}
                                                            />
                                                            <span>
                                                                Please wait...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        'Purchase'
                                                    )
                                                }
                                                onClick={submitPayment}
                                            />
                                            {/* <div className="bill-notes">You can pay your total premium with your bank debit card or a credit card, or you can apply for premium financing. Preview a financing quote <Nav.Link href="#">here.</Nav.Link></div> */}
                                        </div>
                                    </Col>
                                )}
                        </Row>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default ComplatePayment;

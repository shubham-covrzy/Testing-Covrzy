import { Col, Form, Row, Spinner } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import OrangeButton from '../../common/Buttons/OrangeButton';
import verified from '../../assets/images/check.png';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { IReduxState } from '../../utils/types';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import {
    EMAIL,
    EMAIL_REG,
    ONLY_ALPHABET,
    PASSWORD,
    PASSWORD_REG,
    PHONE,
} from '../../constants/main';
import {
    ClearEmailVerifyStateAction,
    GetOtpReqAction,
    GET_OTP_REQ_FAILED,
    VerifyOtpAction,
} from '../../Redux/Actions/EmailVerifyAction';
import { ToastAction } from '../../Redux/Actions/ToastAction';
import {
    ClearSignUpStateAction,
    SavePersonalDetailsAction,
} from '../../Redux/Actions/AuthActions';
import 'react-phone-input-2/lib/style.css';
import { ProfileObject } from '.';
import { useNavigate } from 'react-router-dom';
import CustomPhoneInput from '../../common/PhoneInput';
import { phonesRegx } from '../../Helper/commonFunction';

interface PersonalDetailProps {
    profile: ProfileObject;
    setProfile: Function;
}

const PersonalDetail = (props: PersonalDetailProps) => {
    const { profile, setProfile } = props;
    const [countryCode, setCountryCode] = useState<string>('91');
    const [emailOtp, setEmailOtp] = useState<string>('');
    const [timer, setTimer] = useState<number>(60);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const EmailVerifyState = useSelector(
        (state: IReduxState) => state.EmailVerify,
    );
    const { loading } = useSelector((state: IReduxState) => state.Auth);

    useEffect(() => {
        if (EmailVerifyState?.getOtp) {
            const counter = setInterval(() => {
                if (timer > 0) setTimer(timer - 1);
                else {
                    dispatch({ type: GET_OTP_REQ_FAILED });
                    setTimer(60);
                }
            }, 1000);

            return () => {
                clearInterval(counter);
            };
        }
        if (EmailVerifyState?.emailVerified) {
            setEmailOtp('');
        }
    }, [
        EmailVerifyState.getOtp,
        EmailVerifyState.emailVerified,
        timer,
        dispatch,
    ]);

    const sendOtpReqHandler = () => {
        const emailId = signInFormik.values.email;
        if (emailId !== '' && !EmailVerifyState?.getOtp) {
            dispatch(GetOtpReqAction({ email_address: emailId }));
        }
    };

    const varifyOtpHandler = () => {
        const emailId = signInFormik.values.email;
        if (emailId !== '' && emailOtp !== '') {
            dispatch(
                VerifyOtpAction({
                    email_address: emailId,
                    otp: emailOtp.trim(),
                }),
            );
        }
    };

    const signInValidationSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .max(255)
            .required('Please Enter Your Email')
            .matches(EMAIL_REG, EMAIL),
        company_name: yup
            .string()
            .trim()
            .required('Please Enter Your Company Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        first_name: yup
            .string()
            .trim()
            .required('Please Enter Your First Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        last_name: yup
            .string()
            .trim()
            .required('Please Enter Your Last Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        job_title: yup
            .string()
            .trim()
            .required('Please Enter Your Designation')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        phone_number: yup
            .string()
            .required('Please Enter Your Phone Number')
            .matches(phonesRegx[countryCode], PHONE),
        password: yup
            .string()
            .required('Please Enter Your Password')
            .matches(PASSWORD_REG, PASSWORD),
    });

    const signInFormik = useFormik({
        initialValues: {
            company_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            job_title: '',
            phone_number: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            if (EmailVerifyState?.emailVerified) {
                const payload = {
                    company_name: values.company_name,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password,
                    job_title: values.job_title,
                    phone_number: values?.phone_number,
                    profile: profile?.profileImg,
                };
                const formData = new FormData();
                formData.append('profile', profile?.profileImg);
                formData.append('company_name', values.company_name.trim());
                formData.append('first_name', values.first_name.trim());
                formData.append('last_name', values.last_name.trim());
                formData.append('email', values.email.trim());
                formData.append('password', values.password.trim());
                formData.append('phone_number', values.phone_number.trim());
                formData.append('job_title', values.job_title.trim());

                dispatch(
                    SavePersonalDetailsAction({
                        data: formData,
                        jsonData: payload,
                    }),
                );
            } else {
                dispatch(
                    ToastAction({
                        show: true,
                        message: 'Email not Verified',
                        severity: 'danger',
                    }),
                );
            }
        },
    });

    const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const tempData = { ...profile };
        if (e.currentTarget.name === 'first_name')
            tempData.firstName = e.currentTarget.value;
        if (e.currentTarget.name === 'last_name')
            tempData.lastName = e.currentTarget.value;

        setProfile({ ...tempData });
    };

    return (
        <>
            <div className="pi-step-form" id="pi-step-one">
                <h2 className="pi-content-title">Personal Details</h2>
                {/* <Form onSubmit={(e) => signInFormik.handleSubmit(e)}> */}
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="First Name *" />
                            <CustomInput
                                type="text"
                                name="first_name"
                                placeholder="Enter Your First Name"
                                maxLength={12}
                                onChange={(
                                    e: React.FormEvent<HTMLInputElement>,
                                ) => {
                                    changeNameHandler(e);
                                    signInFormik.handleChange(e);
                                }}
                                onBlur={signInFormik.handleBlur}
                            />
                            {signInFormik.errors.first_name &&
                                signInFormik.touched.first_name && (
                                    <span className="text-error">
                                        {signInFormik.errors.first_name}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Last Name *" />
                            <CustomInput
                                type="text"
                                name="last_name"
                                placeholder="Enter Your Last Name"
                                maxLength={12}
                                onChange={(
                                    e: React.FormEvent<HTMLInputElement>,
                                ) => {
                                    changeNameHandler(e);
                                    signInFormik.handleChange(e);
                                }}
                                onBlur={signInFormik.handleBlur}
                            />
                            {signInFormik.errors.last_name &&
                                signInFormik.touched.last_name && (
                                    <span className="text-error">
                                        {signInFormik.errors.last_name}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Email *" />
                            <CustomInput
                                type="text"
                                name="email"
                                disabled={
                                    EmailVerifyState?.emailVerified ||
                                    EmailVerifyState?.getOtp
                                }
                                placeholder="Enter Your Email Address"
                                onChange={signInFormik.handleChange}
                                onBlur={signInFormik.handleBlur}
                            />
                            {EmailVerifyState?.emailVerified ? (
                                <span className="verified-icon">
                                    <img src={verified} alt="verified" />
                                </span>
                            ) : (
                                <span
                                    className="pi-get-otp-btn"
                                    onClick={sendOtpReqHandler}
                                >
                                    {EmailVerifyState?.getOtpLoading ? (
                                        <Spinner
                                            animation="border"
                                            style={{ width: 14, height: 14 }}
                                        />
                                    ) : EmailVerifyState?.getOtp ? (
                                        `${timer}s`
                                    ) : (
                                        'Get OTP'
                                    )}
                                </span>
                            )}
                            {signInFormik.errors.email &&
                                signInFormik.touched.email && (
                                    <span className="text-error">
                                        {signInFormik.errors.email}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="OTP" />
                            <CustomInput
                                type="text"
                                disabled={
                                    EmailVerifyState?.emailVerified ||
                                    !EmailVerifyState?.getOtp
                                }
                                placeholder="Enter Your OTP"
                                value={emailOtp}
                                onChange={(
                                    e: React.FormEvent<HTMLInputElement>,
                                ) => setEmailOtp(e.currentTarget.value)}
                            />
                            {!EmailVerifyState?.emailVerified &&
                                EmailVerifyState?.getOtp && (
                                    <span
                                        className="pi-get-otp-btn"
                                        onClick={varifyOtpHandler}
                                    >
                                        {EmailVerifyState?.verifyOtpLoading ? (
                                            <Spinner
                                                animation="border"
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                }}
                                            />
                                        ) : (
                                            'Verify'
                                        )}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Phone Number *" />
                            {/* <CustomInput
                                type="number"
                                name="phone_number"
                                placeholder="Enter Phone Number"
                                onChange={signInFormik.handleChange}
                                onBlur={signInFormik.handleBlur}
                            /> */}
                            <CustomPhoneInput
                                country={'in'}
                                placeholder=""
                                value={signInFormik.values.phone_number}
                                onChange={(phone: any, country: any) => {
                                    setCountryCode(country?.dialCode);
                                    signInFormik.setFieldValue(
                                        'phone_number',
                                        phone,
                                    );
                                }}
                            />
                            {signInFormik.errors.phone_number &&
                                signInFormik.touched.phone_number && (
                                    <span className="text-error">
                                        {signInFormik.errors.phone_number}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Company Name *" />
                            <CustomInput
                                type="text"
                                name="company_name"
                                placeholder="Enter Company Name"
                                onChange={signInFormik.handleChange}
                                onBlur={signInFormik.handleBlur}
                            />
                            {signInFormik.errors.company_name &&
                                signInFormik.touched.company_name && (
                                    <span className="text-error">
                                        {signInFormik.errors.company_name}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Designation *" />
                            <CustomInput
                                type="text"
                                name="job_title"
                                placeholder="Enter Your Designation"
                                onChange={signInFormik.handleChange}
                                onBlur={signInFormik.handleBlur}
                            />
                            {signInFormik.errors.job_title &&
                                signInFormik.touched.job_title && (
                                    <span className="text-error">
                                        {signInFormik.errors.job_title}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Password *" />
                            <CustomInput
                                type="password"
                                name="password"
                                placeholder="Enter Your password"
                                onChange={signInFormik.handleChange}
                                onBlur={signInFormik.handleBlur}
                            />
                            {signInFormik.errors.password &&
                                signInFormik.touched.password && (
                                    <span className="text-error">
                                        {signInFormik.errors.password}
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton
                        buttonTitle="Back"
                        onClick={() => {
                            navigate(-1);
                            dispatch(ClearEmailVerifyStateAction());
                            dispatch(ClearSignUpStateAction());
                        }}
                    />
                    <OrangeButton
                        type="submit"
                        buttonName={
                            loading ? (
                                <div className="d-flex justify-content-center gap-2">
                                    <Spinner
                                        animation="border"
                                        style={{ width: 23, height: 23 }}
                                    />
                                    <span>Please wait...</span>
                                </div>
                            ) : (
                                'Save and Continue'
                            )
                        }
                        onClick={signInFormik.handleSubmit}
                    />
                </div>
                {/* </Form> */}
            </div>
        </>
    );
};

export default PersonalDetail;

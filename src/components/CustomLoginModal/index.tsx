import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Modal, Spinner } from 'react-bootstrap';
import styles from './styles.module.scss';
import modalLogo from '../../assets/images/modal-logo.png';
import icontroke from '../../assets/images/Icon-stroke.png';
import OtpInput from 'react-otp-input';
import CustomPhoneInput from '../../common/PhoneInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';
import CustomLabel from '../../common/CustomLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearEditPhoneNumber,
    editPhoneNumber,
    resendOtpPhoneLogin,
    sendOtpPhoneLogin,
    verifyOtpPhoneLogin,
} from '../../Redux/Actions/LoginActions';
import { IReduxState } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { VerifyPhoneLogin } from '../../Redux/Actions/AuthActions';
import { PencilSquare } from 'react-bootstrap-icons';
import { TOAST_SHOW } from '../../Redux/Actions/ToastAction';

interface CustomLoginModalProps {
    showLoginModal: boolean;
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
    navigationAllowed?: boolean;
}

const LoginResendSection = () => {
    const dispatch = useDispatch();

    const [seconds, setSeconds] = useState(50);

    const LoginDetails = useSelector(
        (state: IReduxState) => state.LoginDetails,
    );

    const handleResendOTPClick = () => {
        setSeconds(50);
        dispatch(
            resendOtpPhoneLogin({ mobile: LoginDetails?.mobile ?? '' }),
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <div className={styles.inputText}>
            <p className={styles.textinputBox}>
                <span className={styles.textInput}>
                    Did not receive OTP?
                </span>{' '}
                <span
                    className={
                        seconds === 0
                            ? styles.resendOTPAllowed
                            : styles.resendOTPBlocked
                    }
                    onClick={handleResendOTPClick}
                >
                    Resend OTP
                </span>
                <span className={styles.textInput}>
                    (00:
                    {seconds < 10 ? `0${seconds}` : seconds})
                </span>
            </p>
        </div>
    );
};

const CustomLoginModal: React.FC<CustomLoginModalProps> = ({
    showLoginModal,
    setShowLoginModal,
    navigationAllowed = true,
}) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const LoginDetails = useSelector(
        (state: IReduxState) => state.LoginDetails,
    );

    const AuthState = useSelector((state: IReduxState) => state.Auth);

    const { editMobileNumber = false } = LoginDetails;

    // change to 0 , 1 , 2
    const [step, setStep] = useState(0);
    const [signUpData, setSignUpData] = useState<{
        first_name: string;
        last_name: string;
        email: string;
    } | null>(null);

    const [mobileNumber, setMobileNumber] = useState('');
    const [OTP, setOTP] = useState('');
    const [submitCount, setSubmitCount] = useState(0);

    const [countryCode, setCountryCode] = useState<string>('91');

    const signInValidationSchema = yup.object().shape({
        mobile: yup
            .string()
            .required('Please Enter Your Phone Number')
            .matches(phonesRegx[countryCode], PHONE),
    });

    const signInFormik = useFormik({
        initialValues: {
            mobile: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: async (values) => {
            dispatch(sendOtpPhoneLogin(values));
        },
    });

    const signUpValiationSchema = yup.object().shape({
        first_name: yup.string().required('Please Enter First Name'),
        last_name: yup.string().required('Please Enter Last Name'),
        email: yup.string().email().required('Please Enter Email'),
    });

    const signUpFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
        },
        validationSchema: signUpValiationSchema,
        onSubmit: async (values) => {
            setSignUpData(values);
            dispatch(clearEditPhoneNumber());
            setStep(1);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        signUpFormik.setFieldValue(name, value);
    };

    const handleOtpVerification = () => {
        const regex = /^\d{4}$/;

        if (regex.test(OTP)) {
            const mainPayload = {
                otp: OTP,
                mobile: LoginDetails?.mobile ?? '',
                requestId: LoginDetails?.request_id ?? '',
                ...(LoginDetails?.isNewUser ? signUpData : {}),
            };

            const verifyPhoneLoginPayload = {
                navigate,
                shouldNavigate: navigationAllowed,
            };

            const dispatchPayload = {
                dispatch,
                actionTrigger: VerifyPhoneLogin,
            };

            const finalPayload = {
                mainPayload,
                verifyPhoneLoginPayload,
                dispatchPayload,
            };

            dispatch(verifyOtpPhoneLogin(finalPayload));
        } else {
            dispatch({
                type: TOAST_SHOW,
                payload: {
                    message: 'Invalid OTP format.',
                    severity: 'danger',
                    show: true,
                },
            });
        }
    };

    const handlePhoneNumberEditClick = () => {
        dispatch(editPhoneNumber());
    };

    useEffect(() => {
        if (
            LoginDetails?.editMobileNumber &&
            !LoginDetails?.request_id
        ) {
            setStep(0);
        } else if (!LoginDetails.loading && LoginDetails?.request_id) {
            if (LoginDetails?.isNewUser) {
                if (signUpData && !editMobileNumber) {
                    setStep(1);
                } else {
                    setStep(2);
                }
            } else {
                setStep(1);
            }
        }
    }, [LoginDetails]);

    useEffect(() => {
        if (
            step === 1 &&
            OTP.length === 4 &&
            !LoginDetails.loading &&
            LoginDetails?.request_id
        ) {
            handleOtpVerification();
        }
    }, [OTP]);

    /**
     * This useEffect hook is triggered whenever the AuthState changes.
     * It checks if the user is logged in and if so, it closes the login modal.
     */
    useEffect(() => {
        // Check if the user is logged in
        if (AuthState?.isLogin) {
            // Close the login modal
            setShowLoginModal(false);
        }
    }, [AuthState]);

    return (
        <Modal
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            centered
            className={styles.loginPopUp}
        >
            <div className={styles.login_modal}>
                {step !== 2 && (
                    <div className={styles.modelTop}>
                        <div className={styles.modalBoxLogo}>
                            <img src={modalLogo} alt="modalLogo" />
                        </div>
                    </div>
                )}
                {step === 0 && (
                    <div className={styles.formData}>
                        <div className={styles.modalHeading}>
                            <h2>
                                Let’s get started
                            </h2>
                        </div>
                        <div>
                            {/* <input type="number" className={styles.formControl} id="exampleNumberInput" placeholder="+91 Enter a number"></input> */}
                            <Form onSubmit={signInFormik.handleSubmit}>
                                <Form.Group className="form-group">
                                    <CustomLabel
                                        label="Phone Number *"
                                    />
                                    <CustomPhoneInput
                                        country={'in'}
                                        placeholder=""
                                        value={signInFormik.values.mobile}
                                        onChange={(
                                            phone: any,
                                            country: any,
                                        ) => {
                                            setCountryCode(country?.dialCode);
                                            signInFormik.setFieldValue(
                                                'mobile',
                                                phone,
                                            );
                                        }}
                                        onKeyDown={(event: any) => {
                                            if (event.keyCode === 13) {
                                                signInFormik.submitForm();
                                            }
                                        }}
                                    />
                                    {signInFormik.errors.mobile &&
                                        signInFormik.touched.mobile && (
                                            <span
                                                className={
                                                    styles.modaltextError
                                                }
                                            >
                                                {signInFormik.errors.mobile}
                                            </span>
                                        )}
                                </Form.Group>
                                <div className={styles.inputText}>
                                    <p>
                                        <span>
                                            <img
                                                src={icontroke}
                                                alt="icontroke"
                                            />{' '}
                                            We do not spam.
                                        </span>{' '}
                                        We keep your data safe & secure
                                    </p>
                                </div>
                                <div className={styles.modalButton}>
                                    <button
                                        type="submit"
                                        disabled={LoginDetails?.loading}
                                    >
                                        <span>
                                            {LoginDetails?.loading ? (
                                                <Spinner
                                                    animation="border"
                                                    style={{
                                                        width: 23,
                                                        height: 23,
                                                    }}
                                                />
                                            ) : (
                                                "Continue"
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className={styles.formData}>
                        <div className={styles.modalHeading}>
                            <h2>
                                Enter verification code
                            </h2>
                            <h3>
                                OTP has been sent to{' '}
                                {LoginDetails?.mobile
                                    ? '+' + LoginDetails?.mobile
                                    : ''}
                                <PencilSquare
                                    onClick={handlePhoneNumberEditClick}
                                />
                            </h3>
                        </div>
                        <div>
                            {/* <input type="number" className={styles.formControl} id="exampleNumberInput" placeholder="+91 Enter a number"></input> */}
                            <Form>
                                <InputGroup className={styles.otpWrp}>
                                    <OtpInput
                                        inputStyle={styles.otpInput}
                                        value={OTP}
                                        onChange={setOTP}
                                        numInputs={4}
                                        renderSeparator={<span> </span>}
                                        renderInput={(props: any) => (
                                            <input {...props} />
                                        )}
                                    />
                                </InputGroup>
                            </Form>
                            <LoginResendSection />
                            <div className={styles.modalButton}>
                                <button
                                    onClick={handleOtpVerification}
                                    disabled={LoginDetails?.loading}
                                >
                                    {LoginDetails?.loading ? (
                                        <Spinner
                                            animation="border"
                                            style={{
                                                width: 23,
                                                height: 23,
                                            }}
                                        />
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div
                        className={`${styles.formData} ${styles.lastScreenForm}`}
                    >
                        <div className={styles.lastHeading}>
                            <h4>
                                Thank you for choosing Covrzy!
                            </h4>
                            <h5>
                                Let’s know you better
                            </h5>
                        </div>
                        <div>
                            {/* <input type="number" className={styles.formControl} id="exampleNumberInput" placeholder="+91 Enter a number"></input> */}
                            <Form onSubmit={signUpFormik.handleSubmit}>
                                <div className={styles.maininputBox}>
                                    <InputGroup className={styles.lastPopop}>
                                        <Form.Control
                                            placeholder="First Name"
                                            type="text"
                                            name="first_name"
                                            value={
                                                signUpFormik.values.first_name
                                            }
                                            onChange={handleChange}
                                        />
                                        {signUpFormik.errors.first_name &&
                                            signUpFormik.touched.first_name && (
                                                <span
                                                    className={
                                                        styles.modaltextError
                                                    }
                                                >
                                                    {
                                                        signUpFormik.errors
                                                            .first_name
                                                    }
                                                </span>
                                            )}
                                    </InputGroup>
                                    <InputGroup className={styles.lastPopop}>
                                        <Form.Control
                                            placeholder="Last Name"
                                            type="text"
                                            name="last_name"
                                            value={
                                                signUpFormik.values.last_name
                                            }
                                            onChange={handleChange}
                                        />
                                        {signUpFormik.errors.last_name &&
                                            signUpFormik.touched.last_name && (
                                                <span
                                                    className={
                                                        styles.modaltextError
                                                    }
                                                >
                                                    {
                                                        signUpFormik.errors
                                                            .last_name
                                                    }
                                                </span>
                                            )}
                                    </InputGroup>
                                </div>
                                <div className={styles.emailInput}>
                                    <InputGroup className={styles.lastPopop}>
                                        <Form.Control
                                            placeholder="Your Email Address"
                                            type="text"
                                            name="email"
                                            value={signUpFormik.values.email}
                                            onChange={handleChange}
                                        />
                                        {signUpFormik.errors.email &&
                                            signUpFormik.touched.email && (
                                                <span
                                                    className={
                                                        styles.modaltextError
                                                    }
                                                >
                                                    {signUpFormik.errors.email}
                                                </span>
                                            )}
                                    </InputGroup>
                                </div>

                                <div className={styles.inputText}>
                                    <p>
                                        <span>
                                            <img
                                                src={icontroke}
                                                alt="icontroke"
                                            />{' '}
                                            We do not spam.
                                        </span>{' '}
                                        We keep your data safe & secure
                                    </p>
                                </div>
                                <div className={styles.modalButton}>
                                    <button type="submit">
                                        <span>
                                            {LoginDetails?.loading ? (
                                                <Spinner
                                                    animation="border"
                                                    style={{
                                                        width: 23,
                                                        height: 23,
                                                    }}
                                                />
                                            ) : (
                                                'Continue'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CustomLoginModal;

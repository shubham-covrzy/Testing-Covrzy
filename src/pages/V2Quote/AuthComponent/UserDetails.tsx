import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row } from 'react-bootstrap';
import CustomLabel from '../../../common/CustomLabel';
import CustomInput from '../../../common/CustomInput';
import { SaveAboutUserAction } from '../../../Redux/Actions/CustomerInformationAction';
import { UpdateUserProfileAction } from '../../../Redux/Actions/UserProfileAction';
import { IReduxState } from '../../../utils/types';
import ArrowBack from '../../../assets/images/arrow-left.svg';
import CustomButton from '../../../common/Buttons/CustomButton';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';
import { DecryptData } from '../../../common/CryptoJSToken';
import { isObjectEmpty } from '../../../Helper/commonFunction';

interface UserDetailsProps {
    indexCount: number;
    setIndexCount: any;
    buttonClicks: boolean;
    setButtonClicks: any;
    setSubmitButtonClicks: any;
}

function UserDetails(props: UserDetailsProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [changed, setChanged] = useState(false);

    const CustomerInformation = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );

    const { recommendationResponse } = useSelector(
        (state: IReduxState) => state.Recommendations,
    );

    const { paymentRetry } = useSelector((state: IReduxState) => state.Payment);

    const { aboutUser } = CustomerInformation;
    const userDetails = useSelector((state: IReduxState) => state.Auth);
    const userData = DecryptData(userDetails.user);

    const userSession = useSelector((state: IReduxState) => state.UserSession);

    useEffect(() => {
        if (Object.keys(recommendationResponse).length !== 0 && !paymentRetry) {
            if (isObjectEmpty(userSession)) {
                navigate('/') // navigate('/quote/insurance-packages')
            }
        }
    }, [paymentRetry, recommendationResponse]);

    const isButtonDisabled =
        firstNameError ||
        lastNameError ||
        emailError ||
        !changed ||
        !firstName ||
        !lastName ||
        !email;

    useEffect(() => {
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        if (userData.first_name && userData.last_name && userData.email) {
            setChanged(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(aboutUser).length !== 0) {
            setFirstName(aboutUser.firstName);
            setLastName(aboutUser.lastName);
            setEmail(aboutUser.email);
            setChanged(true);
        }
    }, [aboutUser]);

    useEffect(() => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        if (props.buttonClicks) {
            checkValidation();
            if (!lastNameError && !firstNameError && !emailError && changed) {
                props.setIndexCount(props.indexCount + 1);
                setChanged(false);

                dispatch(SaveAboutUserAction(data));
                const formData = new FormData();

                formData.append('first_name', data.firstName);

                formData.append('last_name', data.lastName);
                formData.append('email', data.email);

                dispatch(UpdateUserProfileAction(formData));
                dispatch(
                    UpdateUserSessionAction({
                        id: userSession.id,
                        userSessionData: {
                            userData: data,
                        },
                    }),
                );
            }

            props.setButtonClicks(false);
        }
    }, [props.buttonClicks]);

    const emailErrorHandleCheck = (email: string) => {
        return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    };

    const handleChange = (email: string) => {
        if (!emailErrorHandleCheck(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };
    const checkValidation = () => {
        if (email.length === 0) {
            setEmailError(true);
        }
        if (firstName.length === 0) {
            setFirstNameError(true);
        }
        if (lastName.length === 0) {
            setLastNameError(true);
        }
    };

    return (
        <section>
            <div className="quote-login-auth-box">
                <h6>Let's start with you</h6>
                <Row className="quote-login-items">
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="First Name*" />
                            <CustomInput
                                required={true}
                                placeholder="Enter your First Name"
                                name="firstName"
                                value={firstName}
                                onChange={(e: any) => {
                                    const value = e.target.value;
                                    setFirstName(value);
                                    setFirstNameError(value.length === 0);
                                    setChanged(true);
                                }}
                            />
                            {firstNameError && (
                                <span style={{ color: 'red', padding: '3px' }}>
                                    Please enter your first name
                                </span>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Last Name *" />
                            <CustomInput
                                required={true}
                                placeholder="Enter your Last Name"
                                value={lastName}
                                name="lastName"
                                onChange={(e: any) => {
                                    const value = e.target.value;
                                    setLastName(value);
                                    setLastNameError(value.length === 0);
                                    setChanged(true);
                                }}
                            />
                            {lastNameError && (
                                <span style={{ color: 'red', padding: '3px' }}>
                                    Please enter your second name
                                </span>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Email* " />
                            <CustomInput
                                placeholder="Enter your Email "
                                name="email"
                                value={email}
                                onChange={(e: any) => {
                                    const value = e.target.value;
                                    setEmail(value);
                                    handleChange(value);
                                    setChanged(true);
                                }}
                            />
                            {emailError && (
                                <span style={{ color: 'red', padding: '3px' }}>
                                    Please enter your email
                                </span>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                {props.indexCount !== 0 && (
                    <div
                        className="footer-back-button"
                        onClick={() => {
                            props.indexCount === 0
                                ? navigate('/') // navigate('/quote/insurance-packages')
                                : props.setIndexCount(
                                      (prevCount: number) => prevCount - 1,
                                  );
                        }}
                    >
                        <img
                            src={ArrowBack}
                            alt=""
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}

                <div className="footer-buttons">
                    {props.indexCount !== 2 && (
                        <div
                            className="footer-back-button"
                            onClick={() => {
                                props.indexCount === 0
                                    ? navigate('/') // navigate('/quote/insurance-packages')
                                    : props.setIndexCount(
                                          (prevCount: number) => prevCount - 1,
                                      );
                            }}
                        >
                            <img
                                src={ArrowBack}
                                alt=""
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    )}

                    {props.indexCount !== 3 && (
                        <CustomButton
                            disabled={isButtonDisabled}
                            type="Submit"
                            buttonTitle="Next"
                            onClick={() => {
                                props.setButtonClicks(true);
                                if (props.indexCount === 1) {
                                    props.setSubmitButtonClicks(true);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default UserDetails;

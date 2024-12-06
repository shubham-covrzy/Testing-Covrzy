import React, { useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import verified from '../../assets/images/check.png';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import profileIcon from '../../assets/images/profile.svg';
import camera from '../../assets/images/camera.svg';
import { IReduxState } from '../../utils/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DecryptData, EncryptData } from '../../common/CryptoJSToken';
import {
    ClearResponseAction,
    GetUserProfileAction,
    UpdateUserProfileAction,
} from '../../Redux/Actions/UserProfileAction';
import { UpdateUserStateAction } from '../../Redux/Actions/AuthActions';
import CustomPhoneInput from '../../common/PhoneInput';
import CustomLoader from '../../common/Loader/CustomLoader';
import ImageCropPopup from '../../common/ImageCropPopup';
import { ToastAction } from '../../Redux/Actions/ToastAction';
import close from '../../assets/images/CloseWhite.svg';
import OrangeButton from '../../common/Buttons/OrangeButton';
import {
    ONLY_ALPHABET,
    PASSWORD,
    PASSWORD_REG,
    PHONE,
} from '../../constants/main';
import { phonesRegx } from '../../Helper/commonFunction';
import {
    GET_OTP_REQ_FAILED,
    GetOtpReqAction,
    VerifyOtpAction,
} from '../../Redux/Actions/EmailVerifyAction';
// import { phonesRegx, ValidatePhoneNumber } from "../../Helper/commonFunction";

const EditProfile = () => {
    const [profileImg, setProfileImg] = useState<any>({});
    const [profileImgUrl, setProfileImgUrl] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [croppedImage, setCroppedImage] = useState<any>(null);
    const [removeProfileStatus, setRemoveProfileStatus] = useState(true);
    const [croppedProfile, setCroppedProfile] = useState<any>({});
    const [countryCode, setCountryCode] = useState<string>('91');
    const { user } = useSelector((state: IReduxState) => state.Auth);
    const { loading, userProfile, success } = useSelector(
        (state: IReduxState) => state.UserProfile,
    );
    const userData = DecryptData(user);
    const [timer, setTimer] = useState<number>(60);
    const [emailOtp, setEmailOtp] = useState<string>('');
    const dispatch = useDispatch();
    const EmailVerifyState = useSelector(
        (state: IReduxState) => state.EmailVerify,
    );

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
        EmailVerifyState?.emailVerified,
        EmailVerifyState?.getOtp,
        dispatch,
        timer,
    ]);

    useEffect(() => {
        //dispatch(setPageHeaderTitle(''))
        dispatch(GetUserProfileAction());

        if (Object.keys(userData).length !== 0) {
            cancelHandler();
            // const {
            //     first_name,
            //     last_name,
            //     email,
            //     job_title,
            //     phone_number
            // } = userData;

            // editProfileFormik.setValues({
            //     first_name: first_name,
            //     last_name: last_name,
            //     email: email,
            //     job_title: job_title,
            //     phone_number: phone_number,
            // })
        }
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(userProfile).length !== 0) {
            const EncodeData = EncryptData(userProfile);
            dispatch(UpdateUserStateAction(EncodeData));
        }
    }, [userProfile]);

    useEffect(() => {
        if (success) dispatch(GetUserProfileAction());

        return () => {
            dispatch(ClearResponseAction());
        };
    }, [success, dispatch]);

    useEffect(() => {
        // const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL
        // let url = ''
        // setProfileFromUserData()
        // if (userData && userData?.profile) {
        //     const url = baseUrl + userData?.profile
        //     setProfileImgUrl(url)
        // }
        if (profileImg?.name) {
            // url = URL?.createObjectURL(profileImg)
            setShowModal(true);
        }
        // setProfileImgUrl(url)
    }, [profileImg]);

    useEffect(() => {
        async function blobImage() {
            if (croppedImage) {
                const blob = await fetch(croppedImage.getAttribute('src')).then(
                    (res) => res.blob(),
                );
                setRemoveProfileStatus(false);
                setCroppedProfile(blob);
            }
        }
        blobImage();
    }, [croppedImage]);

    const signInValidationSchema = yup.object().shape({
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
        password: yup
            .string()
            .trim()
            .required('Please Enter New Password')
            .matches(PASSWORD_REG, PASSWORD),
        phone_number: yup
            .string()
            .required('Please Enter Your Phone Number')
            .matches(phonesRegx[countryCode], PHONE),
    });

    const editProfileFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            job_title: '',
            password: '',
            phone_number: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: () => {},
    });

    const handleSubmit = () => {
        const values = editProfileFormik.values;

        const formData = new FormData();
        formData.append(
            'profile',
            croppedProfile?.type
                ? croppedProfile
                : profileImgUrl !== ''
                ? ''
                : userData?.profile,
        );

        if (EmailVerifyState?.emailVerified) {
            formData.append('email', values.email);
        }

        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('password', values.password);
        formData.append('phone_number', values.phone_number);
        formData.append('job_title', values.job_title);

        dispatch(UpdateUserProfileAction(formData));
    };

    const onChangeImage = (e: any) => {
        const file = e.target.files[0];
        if (file?.type === 'image/png' || file?.type === 'image/jpeg')
            setProfileImg(file);
        else
            dispatch(
                ToastAction({
                    show: true,
                    message: 'Only image file is supported',
                    severity: 'danger',
                }),
            );
    };

    const setProfileFromUserData = () => {
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
        if (userData && userData?.profile) {
            setCroppedProfile({});
            setCroppedImage(null);
            setRemoveProfileStatus(false);
            const url = baseUrl + userData?.profile;
            setProfileImgUrl(url);
        } else {
            setProfileImgUrl('');
            setRemoveProfileStatus(true);
            setCroppedProfile({});
        }
    };

    const cancelHandler = () => {
        const { first_name, last_name, email, job_title, phone_number } =
            userData;

        editProfileFormik.setValues({
            first_name: first_name,
            last_name: last_name,
            email: email,
            job_title: job_title,
            password: '',
            phone_number: phone_number,
        });

        setProfileFromUserData();
    };

    const clearProfileHandler = () => {
        if (croppedProfile?.type || profileImgUrl !== '') {
            // setTimeout(() => {
            setCroppedProfile({});
            // setProfileImg({})
            // setCroppedImage(null)
            setRemoveProfileStatus(true);
            setProfileImgUrl(profileIcon);
            // }, 500);
        }
    };

    const sendOtpReqHandler = () => {
        const emailId = editProfileFormik.values.email;
        if (emailId !== '' && !EmailVerifyState?.getOtp) {
            dispatch(GetOtpReqAction({ email_address: emailId }));
        }
    };

    const varifyOtpHandler = () => {
        const emailId = editProfileFormik.values.email;
        if (emailId !== '' && emailOtp !== '') {
            dispatch(
                VerifyOtpAction({
                    email_address: emailId,
                    otp: emailOtp.trim(),
                }),
            );
        }
    };

    return (
        <>
            <ImageCropPopup
                show={showModal}
                image={profileImg?.name && URL?.createObjectURL(profileImg)}
                setCroppedImage={setCroppedImage}
                setPopupVisible={setShowModal}
            />

            <div className="db-main-title">
                <h2>Update Your Profile</h2>
            </div>
            {loading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <>
                    {/* // <Form onSubmit={(e) => editProfileFormik.handleSubmit(e)}> */}
                    <Row className="custom-flex">
                        <Col lg={8}>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group
                                        className="form-group"
                                        controlId="formBasicEmail"
                                    >
                                        <CustomLabel label="First Name *" />
                                        <CustomInput
                                            type="text"
                                            placeholder="Enter First Name"
                                            name="first_name"
                                            maxLength={12}
                                            value={
                                                editProfileFormik.values
                                                    .first_name ?? ''
                                            }
                                            onChange={
                                                editProfileFormik.handleChange
                                            }
                                            onBlur={
                                                editProfileFormik.handleBlur
                                            }
                                        />
                                        {editProfileFormik.errors.first_name &&
                                            editProfileFormik.touched
                                                .first_name && (
                                                <span className="text-error">
                                                    {
                                                        editProfileFormik.errors
                                                            .first_name
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group
                                        className="form-group"
                                        controlId="formBasicEmail"
                                    >
                                        <CustomLabel label="Last Name *" />
                                        <CustomInput
                                            type="text"
                                            placeholder="Enter Last name"
                                            name="last_name"
                                            maxLength={12}
                                            value={
                                                editProfileFormik.values
                                                    .last_name ?? ''
                                            }
                                            onChange={
                                                editProfileFormik.handleChange
                                            }
                                            onBlur={
                                                editProfileFormik.handleBlur
                                            }
                                        />
                                        {editProfileFormik.errors.last_name &&
                                            editProfileFormik.touched
                                                .last_name && (
                                                <span className="text-error">
                                                    {
                                                        editProfileFormik.errors
                                                            .last_name
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group
                                        className="form-group"
                                        controlId="formBasicEmail"
                                    >
                                        <CustomLabel label="Designation *" />
                                        <CustomInput
                                            type="text"
                                            placeholder="Enter Designation"
                                            name="job_title"
                                            value={
                                                editProfileFormik.values
                                                    .job_title ?? ''
                                            }
                                            onChange={
                                                editProfileFormik.handleChange
                                            }
                                            onBlur={
                                                editProfileFormik.handleBlur
                                            }
                                        />
                                        {editProfileFormik.errors.job_title &&
                                            editProfileFormik.touched
                                                .job_title && (
                                                <span className="text-error">
                                                    {
                                                        editProfileFormik.errors
                                                            .job_title
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                {!userData.is_password_saved && (
                                    <Col lg={6}>
                                        <Form.Group
                                            className="form-group"
                                            controlId="formBasicEmail"
                                        >
                                            <CustomLabel label="Password *" />
                                            <CustomInput
                                                type="new-password"
                                                placeholder="Enter Password"
                                                name="password"
                                                value={
                                                    editProfileFormik.values
                                                        .password ?? ''
                                                }
                                                onChange={
                                                    editProfileFormik.handleChange
                                                }
                                                onBlur={
                                                    editProfileFormik.handleBlur
                                                }
                                            />
                                            {editProfileFormik.errors
                                                .password &&
                                                editProfileFormik.touched
                                                    .password && (
                                                    <span className="text-error">
                                                        {
                                                            editProfileFormik
                                                                .errors.password
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                )}
                                <Col lg={6}>
                                    <Form.Group
                                        className="form-group"
                                        controlId="formBasicEmail"
                                    >
                                        <CustomLabel label="Phone Number *" />
                                        <CustomPhoneInput
                                            country={'in'}
                                            placeholder=""
                                            value={
                                                editProfileFormik.values
                                                    .phone_number ?? ''
                                            }
                                            onChange={(
                                                phone: any,
                                                country: any,
                                            ) => {
                                                setCountryCode(
                                                    country?.dialCode,
                                                );
                                                editProfileFormik.setFieldValue(
                                                    'phone_number',
                                                    phone,
                                                );
                                            }}
                                        />
                                        {editProfileFormik.errors
                                            .phone_number &&
                                            editProfileFormik.touched
                                                .phone_number && (
                                                <span className="text-error">
                                                    {
                                                        editProfileFormik.errors
                                                            .phone_number
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                {!!userData.email ? (
                                    <Col lg={6}>
                                        <Form.Group
                                            className="form-group"
                                            controlId="formBasicEmail"
                                        >
                                            <CustomLabel label="Email" />
                                            <CustomInput
                                                type="text"
                                                disabled
                                                placeholder="Enter Email"
                                                value={
                                                    editProfileFormik.values
                                                        .email
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                ) : (
                                    <>
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
                                                    onChange={
                                                        editProfileFormik.handleChange
                                                    }
                                                    onBlur={
                                                        editProfileFormik.handleBlur
                                                    }
                                                />
                                                {EmailVerifyState?.emailVerified ? (
                                                    <span className="verified-icon">
                                                        <img
                                                            src={verified}
                                                            alt="verified"
                                                        />
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="pi-get-otp-btn"
                                                        onClick={
                                                            sendOtpReqHandler
                                                        }
                                                    >
                                                        {EmailVerifyState?.getOtpLoading ? (
                                                            <Spinner
                                                                animation="border"
                                                                style={{
                                                                    width: 14,
                                                                    height: 14,
                                                                }}
                                                            />
                                                        ) : EmailVerifyState?.getOtp ? (
                                                            `${timer}s`
                                                        ) : (
                                                            'Get OTP'
                                                        )}
                                                    </span>
                                                )}
                                                {editProfileFormik.errors
                                                    .email &&
                                                    editProfileFormik.touched
                                                        .email && (
                                                        <span className="text-error">
                                                            {
                                                                editProfileFormik
                                                                    .errors
                                                                    .email
                                                            }
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
                                                    ) =>
                                                        setEmailOtp(
                                                            e.currentTarget
                                                                .value,
                                                        )
                                                    }
                                                />
                                                {!EmailVerifyState?.emailVerified &&
                                                    EmailVerifyState?.getOtp && (
                                                        <span
                                                            className="pi-get-otp-btn"
                                                            onClick={
                                                                varifyOtpHandler
                                                            }
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
                                    </>
                                )}
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col lg={12}>
                                    <div className="pi-profile edit-profile-upload">
                                        <div className="pi-avtar-pic">
                                            <img
                                                src={
                                                    croppedProfile?.type
                                                        ? URL?.createObjectURL(
                                                              croppedProfile,
                                                          )
                                                        : profileImgUrl !== ''
                                                        ? profileImgUrl
                                                        : profileIcon
                                                }
                                                alt="profile"
                                            />
                                            <div className="pi-file-close">
                                                {!removeProfileStatus && (
                                                    <Form.Label htmlFor="input-file">
                                                        <img
                                                            src={close}
                                                            alt="upload profile"
                                                            onClick={() =>
                                                                clearProfileHandler()
                                                            }
                                                        />
                                                    </Form.Label>
                                                )}
                                            </div>
                                            <div className="pi-file-upload">
                                                <CustomInput
                                                    type="file"
                                                    id="input-file"
                                                    name="profile"
                                                    onChange={onChangeImage}
                                                />

                                                <Form.Label htmlFor="input-file">
                                                    <img
                                                        src={camera}
                                                        alt="upload profile"
                                                    />
                                                </Form.Label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <div className="pi-step-btn justify-content-start gap-2">
                        <CustomButton
                            buttonTitle={'Revert Changes'}
                            onClick={cancelHandler}
                        />
                        <OrangeButton
                            // type='submit'
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
                                    'Update profile'
                                )
                            }
                            onClick={handleSubmit}
                        />
                    </div>
                    {/* // </Form> */}
                </>
            )}
        </>
    );
};

export default EditProfile;

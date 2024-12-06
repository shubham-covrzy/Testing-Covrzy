import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import * as yup from 'yup';
import { IReduxState } from '../../utils/types';
import { ChangePasswordAction } from '../../Redux/Actions/UserProfileAction';
import { PASSWORD, PASSWORD_REG } from '../../constants/main';

const ChangePassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown0, setPasswordShown0] = useState(false);
    const { loading } = useSelector((state: IReduxState) => state.UserProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(setPageHeaderTitle(''))
    }, [dispatch]);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const togglePassword0 = () => {
        setPasswordShown0(!passwordShown0);
    };

    const signInValidationSchema = yup.object().shape({
        // current_password: yup.string().trim().required('Please enter your current password'),
        // new_password: yup.string().trim().required('Please enter new password'),
        current_password: yup
            .string()
            .trim()
            .required('Please Enter Your Current Password')
            .matches(PASSWORD_REG, PASSWORD),
        new_password: yup
            .string()
            .trim()
            .required('Please Enter New Password')
            .matches(PASSWORD_REG, PASSWORD),
    });

    const changePasswordFormik = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(
                ChangePasswordAction({
                    current_pass: values.current_password.trim(),
                    new_pass: values.new_password.trim(),
                }),
            );
            resetForm();
        },
    });

    return (
        <>
            <div className="db-main-title">
                <h2>Update Your Password</h2>
            </div>
            <Form onSubmit={(e) => changePasswordFormik.handleSubmit(e)}>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Current Password *" />
                            <CustomInput
                                type={passwordShown ? 'text' : 'password'}
                                name="current_password"
                                value={
                                    changePasswordFormik.values.current_password
                                }
                                onChange={changePasswordFormik.handleChange}
                                onBlur={changePasswordFormik.handleBlur}
                                placeholder="Enter Current Password"
                            />
                            <div
                                className="toggle-icon"
                                onClick={togglePassword}
                            >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            {changePasswordFormik.errors.current_password &&
                                changePasswordFormik.touched
                                    .current_password && (
                                    <span className="text-error">
                                        {
                                            changePasswordFormik.errors
                                                .current_password
                                        }
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="New Password *" />
                            <CustomInput
                                type={passwordShown0 ? 'text' : 'password'}
                                placeholder="Enter New Password"
                                name="new_password"
                                value={changePasswordFormik.values.new_password}
                                onChange={changePasswordFormik.handleChange}
                                onBlur={changePasswordFormik.handleBlur}
                            />
                            <div
                                className="toggle-icon"
                                onClick={togglePassword0}
                            >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            {changePasswordFormik.errors.new_password &&
                                changePasswordFormik.touched.new_password && (
                                    <span className="text-error">
                                        {
                                            changePasswordFormik.errors
                                                .new_password
                                        }
                                    </span>
                                )}
                        </Form.Group>
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton
                        type="submit"
                        buttonTitle={
                            loading ? (
                                <div className="d-flex justify-content-center gap-2">
                                    <Spinner
                                        animation="border"
                                        style={{ width: 23, height: 23 }}
                                    />
                                    <span>Please wait...</span>
                                </div>
                            ) : (
                                'Update password'
                            )
                        }
                        // onClick={changePasswordFormik.handleSubmit}
                    />
                </div>
            </Form>
        </>
    );
};

export default ChangePassword;

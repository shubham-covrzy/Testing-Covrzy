import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { CONFIRM_PASSWORD, PASSWORD, PASSWORD_REG } from '../../constants/main';
import {
    ClearSignUpStateAction,
    ResetPasswordAction,
} from '../../Redux/Actions/AuthActions';
import { IReduxState } from '../../utils/types';
import CustomLoginModal from '../../components/CustomLoginModal';

const ResetPassword = () => {
    const [firstRender, setFirstRender] = useState(false);
    const { loading, redirect } = useSelector(
        (state: IReduxState) => state.Auth,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        setFirstRender(true);
        dispatch(
            ResetPasswordAction({
                token: token as string,
                data: {
                    new_password: '',
                    confirm_password: '',
                    is_validateToken: true,
                },
            }),
        );
    }, [dispatch]);

    useEffect(() => {
        if (!firstRender && redirect === 'success') {
            setShowLoginModal(true)
        } else if (firstRender && redirect === 'failed') {
            setShowLoginModal(true)
        }
        dispatch(ClearSignUpStateAction());
    }, [redirect]);

    const resetPasswordFormik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object().shape({
            // password: yup.string().required('Please enter new password'),
            password: yup
                .string()
                .trim()
                .required('Please Enter New Password')
                .matches(PASSWORD_REG, PASSWORD),
            // confirmPassword: yup.string().required('Please confirm your password'),
            confirmPassword: yup
                .string()
                .trim()
                .required('Please Confirm Your Password'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (values.password === values.confirmPassword) {
                setFirstRender(false);
                dispatch(
                    ResetPasswordAction({
                        token: token as string,
                        data: {
                            is_validateToken: false,
                            new_password: values.password.trim(),
                            confirm_password: values.confirmPassword.trim(),
                        },
                    }),
                );
            } else {
                resetPasswordFormik.setFieldError(
                    'confirmPassword',
                    CONFIRM_PASSWORD,
                );
            }
        },
    });

    return (
        <>
            <section className="login-section">
                <Container>
                    <div className="auth-box mt-5">
                        <h3 className="login-title">Reset Password</h3>
                        <Form
                            onSubmit={(e) =>
                                resetPasswordFormik.handleSubmit(e)
                            }
                        >
                            <Form.Group className="form-group">
                                <Form.Label>New Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={resetPasswordFormik.handleChange}
                                    onBlur={resetPasswordFormik.handleBlur}
                                    placeholder="Enter New Password"
                                />
                                {resetPasswordFormik.errors.password &&
                                    resetPasswordFormik.touched.password && (
                                        <span className="text-error">
                                            {
                                                resetPasswordFormik.errors
                                                    .password
                                            }
                                        </span>
                                    )}
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label>Confirm Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    onChange={resetPasswordFormik.handleChange}
                                    onBlur={resetPasswordFormik.handleBlur}
                                    placeholder="Enter Confirm Password"
                                />
                                {resetPasswordFormik.errors.confirmPassword &&
                                    resetPasswordFormik.touched
                                        .confirmPassword && (
                                        <span className="text-error">
                                            {
                                                resetPasswordFormik.errors
                                                    .confirmPassword
                                            }
                                        </span>
                                    )}
                            </Form.Group>
                            <div className="forgot-link">
                                <Button
                                    className="started-btn"
                                    type="submit"
                                // onClick={() => resetPasswordFormik.handleSubmit()}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center gap-2">
                                            <Spinner
                                                animation="border"
                                                style={{
                                                    width: 23,
                                                    height: 23,
                                                }}
                                            />
                                            <span>Please wait...</span>
                                        </div>
                                    ) : (
                                        'Reset'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </div>
                    {/* <div className="small-desc">
                        <p>Sharing your email address enables us to create a basic profile that will make it easier to return to where you left off. Don’t worry, your privacy is very important to us and we won’t share your email address with anyone. <Nav.Link href="#">Learn more</Nav.Link></p>
                    </div> */}
                </Container>
            </section>
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </>
    );
};

export default ResetPassword;

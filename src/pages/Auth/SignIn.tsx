import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EMAIL, EMAIL_REG, PASSWORD, PASSWORD_REG } from '../../constants/main';
import { useDispatch, useSelector } from 'react-redux';
import {
    ClearSignUpStateAction,
    ForgotPasswordAction,
    LoginAction,
} from '../../Redux/Actions/AuthActions';
import { IReduxState } from '../../utils/types';
import CustomModal from '../../common/CustomModal';
import CustomLabel from '../../common/CustomLabel';
import CustomInput from '../../common/CustomInput';
import MetaTags from '../../common/MetaTag';
import Cookies from 'js-cookie';

const SignIn = () => {
    const [showModal, setShowModal] = useState(false);
    const { loading, redirect } = useSelector(
        (state: IReduxState) => state.Auth,
    );
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (redirect === 'success') {
            setShowModal(false);
            dispatch(ClearSignUpStateAction());
        }
    }, [redirect, dispatch]);

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .max(255)
                .required('Please Enter Your Email')
                .matches(EMAIL_REG, EMAIL),
            password: showModal
                ? yup.string().optional()
                : yup
                    .string()
                    .required('Please Enter Your Password')
                    .matches(PASSWORD_REG, PASSWORD),
            // password: showModal ? yup.string().optional() : yup.string().required('Please enter your password')
        }),
        onSubmit: (values) => {
            if (showModal)
                dispatch(ForgotPasswordAction({ email: values.email }));
            else dispatch(LoginAction(values));
        },
    });

    const closeModalHandler = () => {
        setShowModal(!showModal);
        loginFormik.resetForm();
    };

    const modalBody = (
        <Form onSubmit={(e) => loginFormik.handleSubmit(e)}>
            <Row>
                <Col lg={12}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Email *" />
                        <CustomInput
                            type="email"
                            placeholder="Enter your Email"
                            name="email"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.email}
                        />
                        {loginFormik.errors.email &&
                            loginFormik.touched.email && (
                                <span className="text-error">
                                    {loginFormik.errors.email}
                                </span>
                            )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );

    return (
        <>
            <MetaTags
                title="Login"
                description="You can login to your Covrzy account to view your policies and manage them."
                url="https://covrzy.com/sign-in"
            />

            <CustomModal
                show={showModal}
                size="md"
                onHide={closeModalHandler}
                headerTitle="Forgot Password"
                body={modalBody}
                customButtonTitle="Cancel"
                onClickCustomButton={closeModalHandler}
                onClickOrangeButton={loginFormik.handleSubmit}
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

            <section className="login-section">
                <Container>
                    <div className="auth-box">
                        <h3 className="login-title">Login</h3>
                        <Form onSubmit={(e) => loginFormik.handleSubmit(e)}>
                            <Form.Group className="form-group">
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    placeholder="Enter email"
                                    value={loginFormik.values.email}
                                />
                                {loginFormik.errors.email &&
                                    loginFormik.touched.email && (
                                        <span className="text-error">
                                            {loginFormik.errors.email}
                                        </span>
                                    )}
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    placeholder="Enter password"
                                    value={loginFormik.values.password}
                                />
                                {loginFormik.errors.password &&
                                    loginFormik.touched.password && (
                                        <span className="text-error">
                                            {loginFormik.errors.password}
                                        </span>
                                    )}
                            </Form.Group>
                            <div className="forgot-link">
                                <Button
                                    type="submit"
                                    className="started-btn"
                                // onClick={() => loginFormik.handleSubmit()}
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
                                        'Login'
                                    )}
                                </Button>
                                <Link to="#" onClick={closeModalHandler}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="dont-have-accont">
                                {' '}
                                Don't have an account?{' '}
                                <Link
                                    to="/user/user-detail"
                                    onClick={() => {
                                        localStorage.clear(); Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
                                    }}
                                >
                                    Sign up here
                                </Link>
                            </div>
                        </Form>
                    </div>
                    <div className="small-desc">
                        <p>
                            Sharing your email address enables us to create a
                            basic profile that will make it easier to return to
                            where you left off. Don’t worry, your privacy is
                            very important to us and we won’t share your email
                            address with anyone.{' '}
                            <Link to="/privacy-policy">Learn more</Link>
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default SignIn;

import React, { useState } from 'react';
import { Col, Form, Modal, Row, Button } from 'react-bootstrap';
import {
    Formik,
    Field,
    Form as FormikForm,
    ErrorMessage,
    FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import axios from '../../axiosConfig';
import styles from './styles.module.scss';
import QuoteIcon from '../../assets/images/common_quote.svg';
import icontroke from '../../assets/images/IconStroke.svg';
import checkImageUI from '../../assets/images/7df413f1d97bdeee449af26b8b2deab4.gif';
import CustomPhoneInput from '../../common/PhoneInput';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';
import CustomLabel from '../../common/CustomLabel';
import CustomSelect from '../../common/CustomSelect';

interface CustomQuoteModalProps {
    show: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    source: string;
}

const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
    show = false,
    setShowModal = () => {},
    source= ""
}) => {
    const [view, setView] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<string>('91');

    const toggleView = () => {
        setView(!view);
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().trim().required('Full name is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(phonesRegx[countryCode], PHONE),
        company_name: Yup.string().trim().required('Company name is required'),
        industry: Yup.string().required('Industry is required'),
    });

    const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
        try {
            // Add source to the request payload
            const payload = {
                ...values,
                source: source ? source : 'Home Page',
            };

            // POST request using Axios
            await axios.post(`${process.env.REACT_APP_BASE_URL}get-quote/save`, payload);
            toggleView(); // Switch to thank you view
        } catch (error) {
            console.error('Error submitting the form', error);
        } finally {
            setSubmitting(false); // Stop form submission state
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => setShowModal(false)}
            centered
            className={`${styles.customQuoteModalContainer} ${
                view ? styles.thankYouContainer : ''
            }`}
        >
            {view ? (
                <>
                    <div className="text-center">
                        <img
                            className={styles.checkImagegif}
                            src={checkImageUI}
                            alt="Check"
                        />
                        <h4>Thanks for sharing your details</h4>
                        <h5>We’ll reach out to you soon</h5>
                        <Button onClick={() => setShowModal(false)}>
                            Back to home
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <img
                        className={styles.customQuoteImage}
                        src={QuoteIcon}
                        alt="Quote"
                    />
                    <h5>
                        Hi there!
                        <br />
                        Please share the following details and our experts will
                        reach out to you soon
                    </h5>
                    <Formik
                        initialValues={{
                            name: '',
                            phone: '',
                            company_name: '',
                            industry: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit} // Use the handleSubmit function
                    >
                        {({ setFieldValue, errors, touched, values }) => (
                            <FormikForm className={styles.customQuoteform}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group
                                            className={styles.customQuote_mb}
                                            controlId="formBasicFullName"
                                        >
                                            <CustomLabel label="Full Name" />
                                            <span className={styles.error}>
                                                *
                                            </span>
                                            <Field
                                                name="name"
                                                as={Form.Control}
                                                type="text"
                                                placeholder="Eg: Nisha Prasad"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className={styles.error}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group
                                            className={styles.customQuote_mb}
                                            controlId="formBasicPhoneNumber"
                                        >
                                            <CustomLabel label="Phone Number" />
                                            <span className={styles.error}>
                                                *
                                            </span>
                                            <CustomPhoneInput
                                                country={'in'}
                                                placeholder="+91 "
                                                value={values.phone}
                                                onChange={(
                                                    phone: any,
                                                    country: any,
                                                ) => {
                                                    setCountryCode(
                                                        country?.dialCode,
                                                    );
                                                    setFieldValue(
                                                        'phone',
                                                        phone,
                                                    );
                                                }}
                                                onKeyDown={(event: any) => {
                                                    if (event.keyCode === 13) {
                                                        setFieldValue(
                                                            'phone',
                                                            values.phone,
                                                        );
                                                    }
                                                }}
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className={styles.error}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group
                                            className={styles.customQuote_mb}
                                            controlId="formBasicCompanyName"
                                        >
                                            <CustomLabel label="Company Name" />
                                            <span className={styles.error}>
                                                *
                                            </span>
                                            <Field
                                                name="company_name"
                                                as={Form.Control}
                                                type="text"
                                                placeholder="Eg: Covrzy"
                                            />
                                            <ErrorMessage
                                                name="company_name"
                                                component="div"
                                                className={styles.error}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group
                                            className={styles.customQuote_mb}
                                            controlId="formBasicIndustry"
                                        >
                                            <CustomLabel label="Select Industry" />
                                            <span className={styles.error}>
                                                *
                                            </span>
                                            <CustomSelect
                                                name="industry"
                                                value={values.industry}
                                                onChange={(e: any) =>
                                                    setFieldValue(
                                                        'industry',
                                                        e.target.value,
                                                    )
                                                }
                                                data={['Edtech', 'Fintech', 'E-commerce', 'IT Company', 'Saas', 'Small Business', 'Startup', 'Others']}
                                                value_key="id"
                                                title_key="industry"
                                                title="Select industry"
                                            />
                                            <ErrorMessage
                                                name="industry"
                                                component="div"
                                                className={styles.error}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <div className={styles.inputText}>
                                    <p>
                                        <span>
                                            <img
                                                src={icontroke}
                                                alt="Icon Stroke"
                                            />{' '}
                                            We do not spam.
                                        </span>{' '}
                                        We keep your data safe & secure
                                    </p>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </>
            )}
        </Modal>
    );
};

export default CustomQuoteModal;

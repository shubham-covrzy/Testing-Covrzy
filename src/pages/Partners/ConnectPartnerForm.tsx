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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import styles from './connectPartnerFrom.module.scss';
import QuoteIcon from '../../assets/images/partnerconnectIcon.png';
import icontroke from '../../assets/images/IconStroke.svg';
import CustomPhoneInput from '../../common/PhoneInput';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';
import CustomLabel from '../../common/CustomLabel';
import { Clock, XLg } from 'react-bootstrap-icons';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { MultiSelect } from './CustomSelectBox';

const animatedComponents = makeAnimated();

const colourOptions = [
    { value: 'fire_and_stock_insurance', label: 'Fire and Stock Insurance' },
    { value: 'group_health_insurance', label: 'Group Health Insurance' },
    { value: 'directors_and_officers_insurance', label: 'Directors and Officers Insurance' },
    { value: 'commercial_general_liability_insurance', label: 'Commercial General Liability Insurance' },
    { value: 'travel_insurance', label: 'Travel Insurance' },
    { value: 'marine_insurance', label: 'Marine Insurance' },
    { value: 'others', label: 'Others' },
];


interface CustomQuoteModalProps {
    show: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    openCustomMsgSuccessFun: () => void;
    openCustomMsgFailFun: () => void;

}

const ConnectPartnerForm: React.FC<CustomQuoteModalProps> = ({
    show = false,
    setShowModal = () => { },
    openCustomMsgSuccessFun,
    openCustomMsgFailFun
}) => {
    const [showTiming, setShowTiming] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const clockFormat = 'h:mm a';

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().trim().required('Full name is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(phonesRegx['91'], PHONE),
        company_name: Yup.string().trim().required('Company name is required'),
        industry: Yup.array()
            .of(
                Yup.object().shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
            )
            .min(1, 'At least one product must be selected'),
        date: Yup.string().required('Preferred date is required'),
        time: Yup.string().required('Preferred time is required'),
    });

    const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
        try {
            // Send the form data to the backend
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}partner/send-email`, values);

            if (response.data.success) {
                openCustomMsgSuccessFun();
            } else {
                openCustomMsgFailFun();//Success msg
            }
        } catch (error) {
            console.error('Error sending form data:', error);
            openCustomMsgFailFun(); // failure msg
        } finally {

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            // Reset form state and modal visibility
            setSubmitting(false); // formik
            setShowModal(false); // first modal
            setShowTiming(false); // second modal
        }
    };


    return (
        <Modal
            show={show}
            onHide={() => setShowModal(false)}
            centered
            className={`${styles.customQuoteModalContainer} ${isMobile ? styles.mobileModal : ''
                }`}

        >
            {isMobile && (
                <Button
                    className={styles.closeIcon}
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                    }}
                >
                    <XLg color="#0F172A" size={24} />
                </Button>
            )}
            <img className={styles.customQuoteImage} src={QuoteIcon} alt="Quote" />
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
                    industry: [],
                    date: '',
                    time: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, submitForm }) => (
                    <FormikForm className={styles.customQuoteform}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className={styles.customQuote_mb}>
                                    <CustomLabel label="Your Name" />
                                    <span className={styles.error}>*</span>
                                    <Field
                                        name="name"
                                        as={Form.Control}
                                        type="text"
                                        placeholder="eg: Nisha"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className={styles.error}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className={styles.customQuote_mb}>
                                    <CustomLabel label="Company Name" />
                                    <span className={styles.error}>*</span>
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
                                <Form.Group className={styles.customQuote_mb}>
                                    <CustomLabel label="Your Phone Number" />
                                    <span className={styles.error}>*</span>
                                    <CustomPhoneInput
                                        country={'in'}
                                        placeholder="+91 "
                                        value={values.phone}
                                        onChange={(phone: any) => {
                                            setFieldValue('phone', phone);
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
                                <Form.Group className={styles.customQuote_mb}>
                                    <CustomLabel label="Select Product Interested" />
                                    <span className={styles.error}>*</span>
                                    <MultiSelect
                                        options={colourOptions}
                                        onChange={(selectedOptions) =>
                                            setFieldValue('industry', selectedOptions)
                                        }
                                    />
                                    <ErrorMessage
                                        name="industry"
                                        component="div"
                                        className={styles.error}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            variant="primary"
                            onClick={() => setShowTiming(true)}
                            type="button"
                        >
                            Continue
                        </Button>
                        <div className={styles.inputText}>
                            <p>
                                <span>
                                    <img src={icontroke} alt="Icon Stroke" /> We do not spam.
                                </span>{' '}
                                We keep your data safe & secure
                            </p>
                        </div>

                        {/* Timing Modal */}
                        {
                            showTiming && (<div className={styles.layoutPartnership} >
                                <div className={`${styles.formPopop} ${isMobile ? styles.mobileModalTimer : ''
                                    }`}
                                >


                                    <Button className={styles.closeIcon} onClick={() => setShowTiming(false)}>
                                        <XLg />
                                    </Button>
                                    <div className={styles.formModel}>
                                        <div>
                                            <div className={styles.formBox}>
                                                <p>Thank you for choosing Covrzy!</p>
                                                <h2>We will get back to you at your preferred time</h2>
                                            </div>

                                            <div className={styles.formlabel}>
                                                <div className={styles.formGroup}>
                                                    <Field
                                                        id="date"
                                                        className="form-control"
                                                        name="date"
                                                        type="date"
                                                    />
                                                    <label>
                                                        Preferred Date
                                                        <span className="gl-form-asterisk"></span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="date"
                                                        component="div"
                                                        className={styles.error}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <TimePicker
                                                        name="time"
                                                        showSecond={false}
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                'time',
                                                                value ? value.format(clockFormat) : ''
                                                            )
                                                        }
                                                        format={clockFormat}
                                                        use12Hours
                                                        value={
                                                            values.time
                                                                ? moment(values.time, clockFormat)
                                                                : undefined
                                                        }
                                                        className={styles.timePicker}
                                                        popupClassName={styles.timePickerPopUp}
                                                        placeholder="hh:mm am"
                                                        inputIcon={!values.time && <TimerClock />
                                                        }
                                                        clearIcon={values.time && <XLg />}
                                                    />
                                                    <label>
                                                        Preferred Time
                                                        <span className="gl-form-asterisk"></span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="time"
                                                        component="div"
                                                        className={styles.error}
                                                    />
                                                </div>
                                            </div>

                                            <div className={styles.formbottomBtn}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        submitForm();
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.inputText}>
                                            <p>
                                                <span>
                                                    <img src={icontroke} alt="Icon Stroke" /> We do not spam.
                                                </span>{' '}
                                                We keep your data safe & secure
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>)
                        }
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
};
const TimerClock = () => {
    return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_224_8602)">
            <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0V0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" fill="#0F172A" />
            <path d="M7.99964 4C7.82283 4 7.65326 4.07024 7.52823 4.19526C7.40321 4.32029 7.33297 4.48985 7.33297 4.66667V7.54999L5.08564 8.95799C4.93535 9.05188 4.82851 9.20162 4.78863 9.37428C4.74875 9.54694 4.77909 9.72837 4.87297 9.87866C4.96686 10.0289 5.1166 10.1358 5.28926 10.1757C5.46192 10.2155 5.64335 10.1852 5.79364 10.0913L8.35364 8.49133C8.45036 8.43072 8.52991 8.3463 8.58465 8.24615C8.6394 8.14599 8.66751 8.03346 8.66631 7.91933V4.66667C8.66631 4.48985 8.59607 4.32029 8.47104 4.19526C8.34602 4.07024 8.17645 4 7.99964 4Z" fill="#374957" />
        </g>
        <defs>
            <clipPath id="clip0_224_8602">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>)
}

export default ConnectPartnerForm;

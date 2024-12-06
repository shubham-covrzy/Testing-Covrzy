import React, { Fragment, useEffect, useState } from 'react';
import { Form, Nav, Spinner } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import PhoneSolid from '../../assets/images/phone-solid.svg';
import CommentsSolid from '../../assets/images/comments-solid.svg';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CustomLabel from '../../common/CustomLabel';
import CustomInput from '../../common/CustomInput';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomSelect from '../../common/CustomSelect';
import CustomTextArea from '../../common/CustomTextArea';
import { Accordion } from 'react-bootstrap';
import AccordionItem from '../../common/AccordionItem';
import { useDispatch, useSelector } from 'react-redux';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import { ONLY_ALPHABET, PHONE, SUPPORT } from '../../constants/main';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CustomPhoneInput from '../../common/PhoneInput';
import { IReduxState } from '../../utils/types';
import { DecryptData } from '../../common/CryptoJSToken';
import {
    AddSupportMailAction,
    CLEAR_SUPPORT_RESPONSE,
    SupportMail,
} from '../../Redux/Actions/SupportAction';
import { phonesRegx } from '../../Helper/commonFunction';
import MetaTags from '../../common/MetaTag';

const questionsList = [
    { id: 1, label: 'Need help with active policies' },
    {
        id: 2,
        label: 'Looking for other types insurance which is not listed on the platform',
    },
    { id: 3, label: 'Need help with claims' },
    { id: 4, label: 'Need help with downloading invoice or failed payment' },
    { id: 5, label: 'My question is not listed' },
];

const FAQList = [
    {
        id: 1,
        key: '0',
        label: 'About Covrzy',
        content:
            "At Covrzy,  we're simplifying business insurance for small businesses and startups. Insurance is a complicated subject in India, especially when it comes to liability insurance, it gets further complicated. Our platform recommends core coverages for small businesses n startups. Also enabling them to get tailor made quotations at the best price.",
    },
    {
        id: 2,
        key: '1',
        label: 'Who are the insurer’s we are working with?',
        content:
            'We only collaborate with top-notch insurers in the field. Our partnership process involves extensive research, including an analysis of their past claims settlement ratios and financial stability.',
    },
    {
        id: 3,
        key: '2',
        label: 'Which types of businesses do we offer insurance coverage for?',
        content:
            'We offer custom insurance solutions for all types of small businesses and startups. Recognizing that each business is unique, we tailor our coverage to meet their specific needs.',
    },
    {
        id: 4,
        key: '3',
        label: 'Why should I buy from Covrzy?',
        content:
            'With Covrzy, managing your policy is a breeze. You can renew your policy as it comes due, start a claim through our platform, have an expert evaluate your coverage for potential gaps, and more — all of it can be accessed from our online platform.',
    },
    {
        id: 5,
        key: '4',
        label: 'Can I upload other business insurance on Covrzy Platform?',
        content:
            'Yes, you can upload and access other business insurance through our platform.',
    },
    {
        id: 6,
        key: '5',
        label: 'Do I need pay you something to use your platform?',
        content:
            "No, we don't charge our customers. Our revenue comes from commissions paid to us by insurance companies.",
    },
    {
        id: 7,
        key: '6',
        label: 'How do I make payment for the policy?',
        content:
            'You can use an online link to pay for the insurance purchased through Covrzy.',
    },
    {
        id: 8,
        key: '7',
        label: 'How do I file a claim?',
        content:
            '  Please raise a concern, and we will reach out to you for further assistance.',
    },
];

const Support = () => {
    const [showField, setShowField] = useState(false);
    const [countryCode, setCountryCode] = useState<string>('91');
    const [isPhoneEnter, setIsPhoneEnter] = useState<boolean>(false);
    const { user } = useSelector((state: IReduxState) => state.Auth);
    const { loading, success } = useSelector(
        (state: IReduxState) => state.Support,
    );
    const dispatch = useDispatch();
    const userData = DecryptData(user);

    useEffect(() => {
        //dispatch(setPageHeaderTitle(SUPPORT))
        // supportFormik.setFieldValue('email', userData?.email)
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            supportFormik.resetForm();
        }

        return () => {
            dispatch({ type: CLEAR_SUPPORT_RESPONSE });
        };
    }, [success]);

    const validationSchema: any = yup.object().shape({
        question: !showField
            ? yup.string().required('Please Select Your Question')
            : yup.string().optional(),
        other: showField
            ? yup.string().trim().required('Please Enter Your Question')
            : yup.string().optional(),
        name: yup
            .string()
            .trim()
            .required('Please Enter Your Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        message: yup.string().trim().required('Please Enter Your Message'),
        phone_number: isPhoneEnter
            ? yup.string().matches(phonesRegx[countryCode], PHONE)
            : yup.string().optional(),
        // phone_number: yup.string().optional(),
    });

    const supportFormik = useFormik({
        initialValues: {
            question: '',
            other: '',
            name: '',
            email: '',
            phone_number: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            let payload: SupportMail | any = {
                question: values.question,
                Name: values.name.trim(),
                email_address: values.email,
                // phone_no: values.phone_number,
                message: values.message.trim(),
            };
            if (showField) {
                payload.question = values.other.trim();
            }
            if (
                values.phone_number !== '' &&
                values.phone_number !== countryCode
            ) {
                payload.phone_no = values.phone_number;
            }
            dispatch(AddSupportMailAction(payload));
        },
    });

    useEffect(() => {
        if (supportFormik.values.question === questionsList[4].label) {
            setShowField(true);
        } else {
            setShowField(false);
            supportFormik.setFieldValue('other', '');
        }
    }, [supportFormik.values.question]);

    useEffect(() => {
        if (supportFormik.values.email === '')
            supportFormik.setFieldValue('email', userData?.email);
    }, [supportFormik.values]);

    const contectInfo = (
        <div className="support-calling">
            <div className="support-info">
                <span>
                    <img src={PhoneSolid} alt="" />
                </span>
                <p>
                    Call:&nbsp;{' '}
                    <a href="tel:9354963947" target={'_blank'} rel="noreferrer">
                        9354963947
                    </a>
                </p>
            </div>
            <div className="support-info">
                <span>
                    <img src={CommentsSolid} alt="" />
                </span>
                <p>
                    Mail To:&nbsp;{' '}
                    <a
                        href="mailto:hello@covrzy.com"
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        hello@covrzy.com
                    </a>
                </p>
            </div>
        </div>
    );

    return (
        <Fragment>
            <MetaTags
                title="Support"
                description="At Covrzy, we are determined to help and support businesses. Please talk to us for any queries or clarifications regarding business insurance."
                url="https://covrzy.com/user/support/concern"
            />

            <div className="db-main-title">
                <h2>Support</h2>
            </div>
            <div className="support-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Contact Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">FAQ</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            {contectInfo}
                            <h2 className="support-title">
                                Looking For Something?
                            </h2>
                            <Form
                                onSubmit={(e) => supportFormik.handleSubmit(e)}
                            >
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <CustomLabel label="Question *" />
                                            <CustomSelect
                                                title="Select  Your Question"
                                                selected={
                                                    supportFormik.values
                                                        .question
                                                }
                                                data={questionsList}
                                                value_key="label"
                                                title_key="label"
                                                name="question"
                                                value={
                                                    supportFormik.values
                                                        .question
                                                }
                                                onChange={
                                                    supportFormik.handleChange
                                                }
                                            />
                                            {supportFormik.errors.question &&
                                                supportFormik.touched
                                                    .question && (
                                                    <span className="text-error">
                                                        {
                                                            supportFormik.errors
                                                                .question
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                    {showField && (
                                        <Col md={6}>
                                            <Form.Group className="form-group">
                                                <CustomLabel label="Other Question *" />
                                                <CustomInput
                                                    type="text"
                                                    name="other"
                                                    value={
                                                        supportFormik.values
                                                            .other
                                                    }
                                                    onChange={
                                                        supportFormik.handleChange
                                                    }
                                                    onBlur={
                                                        supportFormik.handleBlur
                                                    }
                                                    placeholder="Enter Your Question"
                                                />
                                                {supportFormik.errors.other &&
                                                    supportFormik.touched
                                                        .other && (
                                                        <span className="text-error">
                                                            {
                                                                supportFormik
                                                                    .errors
                                                                    .other
                                                            }
                                                        </span>
                                                    )}
                                            </Form.Group>
                                        </Col>
                                    )}
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <CustomLabel label="Name *" />
                                            <CustomInput
                                                type="text"
                                                name="name"
                                                value={
                                                    supportFormik.values.name
                                                }
                                                onChange={
                                                    supportFormik.handleChange
                                                }
                                                onBlur={
                                                    supportFormik.handleBlur
                                                }
                                                placeholder="Enter Your Name"
                                            />
                                            {supportFormik.errors.name &&
                                                supportFormik.touched.name && (
                                                    <span className="text-error">
                                                        {
                                                            supportFormik.errors
                                                                .name
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <CustomLabel label="Work Email Address" />
                                            <CustomInput
                                                type="text"
                                                name="email"
                                                disabled
                                                value={
                                                    supportFormik.values.email
                                                }
                                                onChange={
                                                    supportFormik.handleChange
                                                }
                                                onBlur={
                                                    supportFormik.handleBlur
                                                }
                                                placeholder="Enter Work Email Address"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <CustomLabel label="Phone Number (optional)" />
                                            <CustomPhoneInput
                                                country={'in'}
                                                placeholder=""
                                                value={
                                                    supportFormik.values
                                                        .phone_number
                                                }
                                                onChange={(
                                                    phone: any,
                                                    country: any,
                                                ) => {
                                                    if (
                                                        phone.length ===
                                                            country?.dialCode
                                                                ?.length ||
                                                        phone === ''
                                                    ) {
                                                        supportFormik.setFieldTouched(
                                                            'phone_number',
                                                            undefined,
                                                        );
                                                        supportFormik.setFieldError(
                                                            'phone_number',
                                                            undefined,
                                                        );
                                                        setIsPhoneEnter(false);
                                                    } else
                                                        setIsPhoneEnter(true);
                                                    setCountryCode(
                                                        country?.dialCode,
                                                    );
                                                    supportFormik.setFieldValue(
                                                        'phone_number',
                                                        phone,
                                                    );
                                                }}
                                            />
                                            {supportFormik.errors
                                                .phone_number &&
                                                supportFormik.touched
                                                    .phone_number && (
                                                    <span className="text-error">
                                                        {
                                                            supportFormik.errors
                                                                .phone_number
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={showField ? 6 : 12}>
                                        <Form.Group className="form-group">
                                            <CustomLabel label="Send us a Message *" />
                                            <CustomTextArea
                                                rows={showField ? 2 : 4}
                                                placeholder="Enter a Message"
                                                name="message"
                                                value={
                                                    supportFormik.values.message
                                                }
                                                onChange={
                                                    supportFormik.handleChange
                                                }
                                                onBlur={
                                                    supportFormik.handleBlur
                                                }
                                            />
                                            {supportFormik.errors.message &&
                                                supportFormik.touched
                                                    .message && (
                                                    <span className="text-error">
                                                        {
                                                            supportFormik.errors
                                                                .message
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="pi-step-btn send-btn">
                                    <OrangeButton
                                        type="submit"
                                        buttonName={
                                            loading ? (
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
                                                'Send'
                                            )
                                        }
                                        // onClick={supportFormik.handleSubmit}
                                    />
                                </div>
                            </Form>
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                            {contectInfo}
                            <h2 className="support-title">About COVRZY</h2>
                            <Accordion>
                                <Row className="justify-content-center gap-2">
                                    {FAQList.map((item) => (
                                        <Col md={9} key={item.id}>
                                            <AccordionItem
                                                className="mt-0"
                                                eventKey={item.key}
                                                AccordionHeader={item.label}
                                                AccordionContent={item.content}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </Fragment>
    );
};

export default Support;

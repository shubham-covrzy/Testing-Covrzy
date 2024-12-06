import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import style from './style.module.scss';
import CustomLabel from '../../common/CustomLabel';
import CustomInput from '../../common/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EMAIL_REG, ONLY_ALPHABET, PHONE } from '../../constants/main';
import { phonesRegx } from '../../Helper/commonFunction';
import { SaveRequestCallBackAction } from '../../Redux/Actions/SupportAction';
import CustomPhoneInput from '../../common/PhoneInput';
import CustomTextArea from '../../common/CustomTextArea';
import { IReduxState } from '../../utils/types';
import { DecryptData } from '../../common/CryptoJSToken';

interface CallBackModalProps {
    open?: boolean;
    onClose: () => void;
    // resumeOnclick: () => void;
}

function CallbackModal(props: CallBackModalProps) {
    const dispatch = useDispatch();

    const [countryCode, setCountryCode] = useState<string>('91');
    const [isPhoneEnter, setIsPhoneEnter] = useState<boolean>(false);
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState<boolean>(false);

    const { callback_success } = useSelector(
        (state: IReduxState) => state.Support,
    );

    const userDetails = useSelector((state: IReduxState) => state.Auth);
    const userData = DecryptData(userDetails.user);

    useEffect(() => {
        if (
            userData.first_name &&
            userData.last_name &&
            userData.phone_number
        ) {
            setChanged(true);
        }
    }, []);
    useEffect(() => {
        setOpen(props.open || false); // Set modal visibility based on prop
    }, [props.open]);

    useEffect(() => {
        if (callback_success) {
            setOpen(false); // Close modal when callback is successful
        }
    }, [callback_success]);

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required('Please Enter Your Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        phone_number: isPhoneEnter
            ? yup.string().matches(phonesRegx[countryCode], PHONE)
            : yup
                  .string()
                  .required('Please Enter Your Phone Number')
                  .matches(phonesRegx, 'Invalid phone number'),
        company_name: yup
            .string()
            .trim()
            .required('Please Enter Your Company Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        message: yup.string().trim().optional(),
    });

    const requestCallbackFormik = useFormik({
        initialValues: {
            name:
                userData.first_name && userData.last_name
                    ? `${userData.first_name} ${userData.last_name}`
                    : '',
            phone_number: userData.phone_number ? userData.phone_number : '',
            company_name: '',

            message: '',
        },
        validationSchema: validationSchema,
        initialTouched: {
            phone_number: !!userData.phone_number,
        },
        onSubmit: (values) => {
            let payload = {
                name: values.name.trim(),
                phone: values.phone_number,
                message: values.message.trim(),
                companyName: values.company_name.trim(),
            };

            dispatch(SaveRequestCallBackAction(payload));
        },
    });
    return (
        <Modal show={props.open} onHide={props.onClose}>
            <div className={style.main}>
                <h4>Request a call back</h4>
                <div className={style.body}>
                    <Form onSubmit={requestCallbackFormik.handleSubmit}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Name *" />
                            <CustomInput
                                type="text"
                                name="name"
                                value={requestCallbackFormik.values.name}
                                onChange={requestCallbackFormik.handleChange}
                                onBlur={requestCallbackFormik.handleBlur}
                            />
                            {requestCallbackFormik.touched.name &&
                            requestCallbackFormik.errors.name ? (
                                <div className="text-error">
                                    {requestCallbackFormik.errors.name}
                                </div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="form-group">
                            <CustomLabel label="Phone Number *" />

                            <CustomPhoneInput
                                country={'in'}
                                placeholder=""
                                value={
                                    requestCallbackFormik.values.phone_number
                                }
                                onChange={(phone: any, country: any) => {
                                    if (
                                        phone.length ===
                                            country?.dialCode?.length ||
                                        phone === ''
                                    ) {
                                        requestCallbackFormik.setFieldTouched(
                                            'phone_number',
                                            undefined,
                                        );
                                        requestCallbackFormik.setFieldError(
                                            'phone_number',
                                            undefined,
                                        );
                                        setIsPhoneEnter(false);
                                    } else setIsPhoneEnter(true);
                                    setCountryCode(country?.dialCode);
                                    requestCallbackFormik.setFieldValue(
                                        'phone_number',
                                        phone,
                                    );
                                }}
                            />
                            {requestCallbackFormik.touched.phone_number &&
                                requestCallbackFormik.errors.phone_number && (
                                    <div className="text-error">
                                        {typeof requestCallbackFormik.errors
                                            .phone_number === 'string'
                                            ? requestCallbackFormik.errors
                                                  .phone_number
                                            : 'Invalid phone number'}
                                    </div>
                                )}
                        </Form.Group>
                        <Form.Group className="form-group">
                            <CustomLabel label=" Company Name *" />
                            <CustomInput
                                type="text"
                                name="company_name"
                                value={
                                    requestCallbackFormik.values.company_name
                                }
                                onChange={requestCallbackFormik.handleChange}
                                onBlur={requestCallbackFormik.handleBlur}
                            />
                            {requestCallbackFormik.touched.company_name &&
                            requestCallbackFormik.errors.company_name ? (
                                <div className="text-error">
                                    {requestCallbackFormik.errors.company_name}
                                </div>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <CustomLabel label="Customer Message (optional)" />
                            <CustomTextArea
                                name="message"
                                value={requestCallbackFormik.values.message}
                                onChange={requestCallbackFormik.handleChange}
                                onBlur={requestCallbackFormik.handleBlur}
                            />
                            {requestCallbackFormik.touched.message &&
                            requestCallbackFormik.errors.message ? (
                                <div className="text-error">
                                    {requestCallbackFormik.errors.message}
                                </div>
                            ) : null}
                        </Form.Group>
                        <div className={style.footer}>
                            <button className="orange-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default CallbackModal;

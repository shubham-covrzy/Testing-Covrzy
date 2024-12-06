import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './styles.module.scss';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { Clock, XLg } from 'react-bootstrap-icons';
import moment from 'moment';
import axios from '../../axiosConfig';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm } from 'formik';
import { TOAST_SHOW } from '../../Redux/Actions/ToastAction';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';
import CustomPhoneInput from '../../common/PhoneInput';
import { useDispatch } from 'react-redux';

interface RequestCallbackFormModalProps {
    show: boolean;
    onHide: () => void;
}

const RequestCallbackFormModal: React.FC<RequestCallbackFormModalProps> = ({
    show,
    onHide,
}) => {
    const [countryCode, setCountryCode] = React.useState<string>('91');
    const [submittingResponse, setSubmittingResponse] = React.useState(false);
    const dispatch = useDispatch();

    const handleFormSubmission: any = async (
        values: any,
        { resetForm }: { resetForm: () => void },
    ) => {
        setSubmittingResponse(true);

        const { firstName, lastName, phone, date, time } = values;

        const payload = {
            name: firstName + ' ' + lastName,
            phone: phone,
            date: date,
            time: time,
        };

        try {
            await axios.post('v1/callback-requests', payload);

            dispatch({
                type: TOAST_SHOW,
                payload: {
                    message: 'Request registered successfully.',
                    severity: 'success',
                    show: true,
                },
            });
            setSubmittingResponse(false);
            resetForm();
            onHide();
        } catch {
            dispatch({
                type: TOAST_SHOW,
                payload: {
                    message: 'Something went wrong. Please try again.',
                    severity: 'danger',
                    show: true,
                },
            });
            setSubmittingResponse(false);
        }
    };

    const callbackValidationSchema = Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .required('Please enter your first name.'),
        lastName: Yup.string().trim().required('Please enter your last name.'),
        phone: Yup.string()
            .required('Please enter your phone number.')
            .matches(phonesRegx[countryCode], PHONE),
        date: Yup.string().required('Please enter your preferred date.'),
        time: Yup.string().required('Please enter your preferred time.'),
    });

    const clockFormat = 'h:mm a';

    const CustomFormControl = React.forwardRef(
        ({ setFieldValue, values, name }: any, ref: any) => {
            function onCustomFormControlChange(value: any) {
                if (value && value.format(clockFormat)) {
                    setFieldValue(name, value.format(clockFormat));
                } else {
                    setFieldValue(name, '');
                }
            }

            return (
                <TimePicker
                    name={name}
                    showSecond={false}
                    onChange={onCustomFormControlChange}
                    format={clockFormat}
                    use12Hours
                    value={
                        (values[name] &&
                            moment(values[name], clockFormat)) ||
                        undefined
                    }
                    className={styles.timePicker}
                    popupClassName={styles.timePickerPopUp}
                    placeholder="hh:mm am"
                    inputIcon={!values[name] && <Clock />}
                    clearIcon={values[name] && <XLg />}
                />
            );
        }
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            className={styles.formPopop}
        >
            <Button className={styles.closeIcon} onClick={onHide}>
                <XLg />
            </Button>
            <div className={styles.formModel}>
                <div>
                    <div className={styles.formBox}>
                        <p>Thank you for choosing Covrzy!</p>
                        <h2>We will get back to you at your preferred time</h2>
                    </div>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            phone: '',
                            date: '',
                            time: '',                
                        }}
                        validationSchema={callbackValidationSchema}
                        onSubmit={handleFormSubmission}
                    >
                        {({ setFieldValue, errors, values }) => (
                            <FormikForm>
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
                                        {errors?.date && (
                                            <p className="text-danger">
                                                {errors?.date}
                                            </p>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <CustomFormControl
                                            name="time"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />
                                        <label>
                                            Preferred Time
                                            <span className="gl-form-asterisk"></span>
                                        </label>
                                        {errors?.time && (
                                            <p className="text-danger">
                                                {errors?.time}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div className={styles.formgroupBox}>
                                        <div>
                                            <Field
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                className="form-control"
                                            />
                                            {errors?.firstName && (
                                                <p className="text-danger">
                                                    {errors?.firstName?.toString()}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Field
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                className="form-control"
                                            />
                                            {errors?.lastName && (
                                                <p className="text-danger">
                                                    {errors?.lastName?.toString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div className={styles.lastFrom}>
                                        <label>Phone Number</label>
                                        <CustomPhoneInput
                                            country={'in'}
                                            placeholder="+91"
                                            value={values.phone}
                                            onChange={(phone: any, country: any) => {
                                                setCountryCode(country?.dialCode);
                                                setFieldValue('phone', phone);
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
                                        {errors?.phone && (
                                            <p className="text-danger">
                                                {errors?.phone?.toString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.formbottomBtn}>
                                    <button
                                        type="submit"
                                        disabled={submittingResponse}
                                    >
                                        {submittingResponse
                                            ? 'Submitting...'
                                            : 'Continue'}
                                    </button>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default RequestCallbackFormModal;

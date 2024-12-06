import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomCurrencyInput from '../../common/CustomCurrencyInput';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import CustomRadio from '../../common/CustomRadio';
import { ADDITIONAL, ONLY_ALPHABET } from '../../constants/main';
import { MinDate } from '../../Helper/commonFunction';
import {
    SignUpBackScreenAction,
    SubmitSignUpDetailsAction,
} from '../../Redux/Actions/AuthActions';
import { IReduxState } from '../../utils/types';

const AdditionalDetail = () => {
    const [showField, setShowField] = useState(false);
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(AuthState.additional_details).length !== 0) {
            const {
                number_of_employee,
                previous_policy,
                policy_name,
                policy_start_date,
                policy_end_date,
                policy_coverage_amount,
                policy_insurer,
            } = AuthState.additional_details;

            additionalFormik.setValues({
                number_of_employee: number_of_employee,
                previous_policy: !previous_policy ? 'yes' : 'no',
                policy_name: policy_name,
                policy_start_date: policy_start_date,
                policy_end_date: policy_end_date,
                policy_coverage_amount: policy_coverage_amount,
                policy_insurer: policy_insurer,
            });
        }
    }, []);

    const companyValidationSchema = yup.object().shape({
        number_of_employee: yup
            .string()
            .trim()
            .required('Please Enter No. of Employee'),
        policy_name: showField
            ? yup
                  .string()
                  .trim()
                  .required('Please Enter Policy Name')
                  .matches(
                      ONLY_ALPHABET,
                      'Only alphabets and spaces are allowed',
                  )
            : yup.string().optional(),
        policy_start_date: showField
            ? yup.string().trim().required('Please Enter Policy Start Date')
            : yup.string().optional(),
        policy_end_date: showField
            ? yup.string().trim().required('Please Enter Policy End Date')
            : yup.string().optional(),
        policy_coverage_amount: showField
            ? yup
                  .string()
                  .trim()
                  .required('Please Enter Policy Coverage Amount')
            : yup.string().optional(),
        policy_insurer: showField
            ? yup
                  .string()
                  .trim()
                  .required('Please Enter Insurer Name')
                  .matches(
                      ONLY_ALPHABET,
                      'Only alphabets and spaces are allowed',
                  )
            : yup.string().optional(),
    });

    const additionalFormik = useFormik({
        initialValues: {
            number_of_employee: '',
            previous_policy: 'no',
            policy_name: '',
            policy_start_date: '',
            policy_end_date: '',
            policy_coverage_amount: '',
            policy_insurer: '',
        },
        validationSchema: companyValidationSchema,
        onSubmit: (values) => {
            const payload: any = {
                completed_step: ADDITIONAL,
                personalDetails: { id: AuthState?.personalDetails.id },
                companyDetails: {
                    ...AuthState.company_details,
                    id: AuthState.personalDetails.company_id,
                    is_profileCompleted: true,
                },
                additionalDetails: {
                    number_of_employee: Number(values.number_of_employee),
                    previous_policy:
                        values.previous_policy !== 'yes' ? true : false,
                },
            };

            if (showField) {
                payload.additionalDetails.policy_name =
                    values.policy_name.trim();
                payload.additionalDetails.policy_start_date =
                    values.policy_start_date.trim();
                payload.additionalDetails.policy_end_date =
                    values.policy_end_date.trim();
                payload.additionalDetails.policy_insurer =
                    values.policy_insurer.trim();
                payload.additionalDetails.policy_coverage_amount = Number(
                    values.policy_coverage_amount,
                );
            }

            dispatch(SubmitSignUpDetailsAction(payload));
        },
    });

    useEffect(() => {
        if (additionalFormik?.values?.previous_policy === 'no') {
            setShowField(true);
        } else setShowField(false);
        // additionalFormik.setValues({
        //     ...additionalFormik.values,
        //     policy_name: '',
        //     policy_start_date: '',
        //     policy_end_date: '',
        //     policy_coverage_amount: '',
        // })
    }, [additionalFormik?.values?.previous_policy]);

    return (
        <>
            <div className="pi-step-form" id="pi-step-four">
                <h2 className="pi-content-title">Additional Details</h2>
                <Form onSubmit={(e) => additionalFormik.handleSubmit(e)}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="form-group">
                                <CustomLabel label="No. of Employees *" />
                                <CustomInput
                                    type="number"
                                    name="number_of_employee"
                                    onChange={(e: any) => {
                                        if (e.target.value >= 0)
                                            additionalFormik.handleChange(e);
                                    }}
                                    placeholder="Enter No. of Employees"
                                    value={
                                        additionalFormik.values
                                            .number_of_employee
                                    }
                                />
                                {additionalFormik.errors.number_of_employee &&
                                    additionalFormik.touched
                                        .number_of_employee && (
                                        <span className="text-error">
                                            {
                                                additionalFormik.errors
                                                    .number_of_employee
                                            }
                                        </span>
                                    )}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="form-group">
                                <CustomLabel label="Are you purchasing business insurance for the first time?" />
                                <div className="pi-radio-wrp">
                                    <CustomRadio
                                        type="radio"
                                        label="Yes"
                                        name="previous_policy"
                                        onChange={additionalFormik.handleChange}
                                        value={'yes'}
                                        checked={
                                            additionalFormik.values
                                                .previous_policy === 'yes'
                                        }
                                        defaultChecked={
                                            additionalFormik.values
                                                .previous_policy === 'yes'
                                        }
                                    />
                                    <CustomRadio
                                        type="radio"
                                        label="No"
                                        name="previous_policy"
                                        value={'no'}
                                        onChange={additionalFormik.handleChange}
                                        checked={
                                            additionalFormik.values
                                                .previous_policy === 'no'
                                        }
                                        defaultChecked={
                                            additionalFormik.values
                                                .previous_policy === 'no'
                                        }
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        {showField && (
                            <>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Policy Name *" />
                                        <CustomInput
                                            disabled={!showField}
                                            type="text"
                                            placeholder="Enter Policy Name"
                                            name="policy_name"
                                            onChange={
                                                additionalFormik.handleChange
                                            }
                                            value={
                                                additionalFormik.values
                                                    .policy_name
                                            }
                                        />
                                        {additionalFormik.errors.policy_name &&
                                            additionalFormik.touched
                                                .policy_name && (
                                                <span className="text-error">
                                                    {
                                                        additionalFormik.errors
                                                            .policy_name
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Coverage Amount *" />
                                        <CustomCurrencyInput
                                            disabled={!showField}
                                            name="policy_coverage_amount"
                                            placeholder="Enter Coverage Amount"
                                            onChange={(value: string) =>
                                                additionalFormik.setFieldValue(
                                                    'policy_coverage_amount',
                                                    value,
                                                )
                                            }
                                            value={
                                                additionalFormik.values
                                                    .policy_coverage_amount
                                            }
                                        />
                                        {/* <CustomInput
                                    disabled={!showField}
                                    type="text"
                                    name="policy_coverage_amount"
                                    onChange={(e: any) => {
                                        if (e.target.value !== '') {
                                            additionalFormik.setFieldValue(
                                                'policy_coverage_amount',
                                                NumberFormat(Number(e.target.value.slice(e.target.value.includes('₹') ? 1 : 0)))
                                            )
                                            // additionalFormik.handleChange(e)
                                        }
                                    }}
                                    // value={NumberFormat(Number(additionalFormik.values.policy_coverage_amount)).toString()}
                                    value={additionalFormik.values.policy_coverage_amount}
                                    placeholder="Enter Coverage amount"

                                /> */}
                                        {additionalFormik.errors
                                            .policy_coverage_amount &&
                                            additionalFormik.touched
                                                .policy_coverage_amount && (
                                                <span className="text-error">
                                                    {
                                                        additionalFormik.errors
                                                            .policy_coverage_amount
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Policy Start Date *" />
                                        <CustomInput
                                            disabled={!showField}
                                            maxDate={moment().format(
                                                'YYYY-MM-DD',
                                            )}
                                            type="date"
                                            name="policy_start_date"
                                            value={
                                                additionalFormik.values
                                                    .policy_start_date
                                            }
                                            // onChange={additionalFormik.handleChange}
                                            onChange={(e: any) => {
                                                additionalFormik.handleChange(
                                                    e,
                                                );
                                                additionalFormik.setFieldValue(
                                                    'policy_end_date',
                                                    MinDate(e.target.value),
                                                );
                                            }}
                                            // placeholder="Enter Policy start date"
                                        />
                                        {additionalFormik.errors
                                            .policy_start_date &&
                                            additionalFormik.touched
                                                .policy_start_date && (
                                                <span className="text-error">
                                                    {
                                                        additionalFormik.errors
                                                            .policy_start_date
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Policy End Date *" />
                                        <CustomInput
                                            disabled={!showField}
                                            type="date"
                                            name="policy_end_date"
                                            minDate={MinDate(
                                                additionalFormik.values
                                                    .policy_start_date,
                                            )}
                                            value={
                                                additionalFormik.values
                                                    .policy_end_date
                                            }
                                            onChange={
                                                additionalFormik.handleChange
                                            }
                                            // placeholder="Enter Policy end date"
                                        />
                                        {additionalFormik.errors
                                            .policy_end_date &&
                                            additionalFormik.touched
                                                .policy_end_date && (
                                                <span className="text-error">
                                                    {
                                                        additionalFormik.errors
                                                            .policy_end_date
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Insurer Name *" />
                                        <CustomInput
                                            type="text"
                                            placeholder="Enter Insurer Name"
                                            value={
                                                additionalFormik.values
                                                    .policy_insurer
                                            }
                                            name="policy_insurer"
                                            onChange={
                                                additionalFormik.handleChange
                                            }
                                        />
                                        {additionalFormik.errors
                                            .policy_insurer &&
                                            additionalFormik.touched
                                                .policy_insurer && (
                                                <span className="text-error">
                                                    {
                                                        additionalFormik.errors
                                                            .policy_insurer
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                            </>
                        )}
                    </Row>
                    <div className="pi-step-btn">
                        <CustomButton
                            buttonTitle="Back"
                            onClick={() => dispatch(SignUpBackScreenAction())}
                        />
                        <OrangeButton
                            type="submit"
                            buttonName="Save and Continue"
                            // onClick={() => additionalFormik.handleSubmit()}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
};
export default AdditionalDetail;

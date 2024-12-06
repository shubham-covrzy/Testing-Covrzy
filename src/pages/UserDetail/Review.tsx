// import { useEffect } from "react";
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../common/Buttons/CustomButton';
// import { number } from "yup";
// import CustomButton from "../../common/Buttons/CustomButton";
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import {
    LoginAction,
    SignUpBackScreenAction,
} from '../../Redux/Actions/AuthActions';
// import { ClearSignUpStateAction, SignUpBackScreenAction, SubmitSignUpDetailsAction } from "../../Redux/Actions/AuthActions";
import { IReduxState } from '../../utils/types';

const Review = () => {
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const navigate = useNavigate();
    const {
        personalDetails,
        company_details,
        additional_details,
        company_type,
        sub_industry_list,
        industry_list,
        turnover_list,
        funding_details,
        loading,
        // redirect
    } = AuthState;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (redirect === 'success') {
    //         navigate('/sign-in')

    //         return () => {
    //             dispatch(ClearSignUpStateAction())
    //         }
    //     }
    // }, [redirect])
    // console.log('personalDetails', personalDetails);

    const submitSignUpDetails = () => {
        // navigate('/sign-in')
        const values = {
            email: personalDetails?.email,
            password: personalDetails?.password,
        };
        dispatch(LoginAction(values));
    };
    // const payload = {
    //     personalDetails: { id: personalDetails.id },
    //     companyDetails: {
    //         ...company_details,
    //         id: personalDetails.company_id,
    //         is_profileCompleted: true
    //     },
    //     additionalDetails: additional_details
    // }
    // dispatch(SubmitSignUpDetailsAction(payload))
    // }

    return (
        <>
            <div className="pi-step-form" id="pi-step-five">
                <h2 className="pi-content-title">Review & Submit</h2>
                <Row>
                    {/* <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Business name" />
                            <CustomInput value={user?.company_name} disabled />
                        </Form.Group>
                    </Col> */}
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Name" />
                            <CustomInput
                                value={`${personalDetails?.first_name} ${personalDetails?.last_name}`}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Company Name" />
                            <CustomInput
                                value={personalDetails?.company_name}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Email" />
                            <CustomInput
                                value={personalDetails?.email}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Designation" />
                            <CustomInput
                                value={personalDetails?.job_title}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    {/* <Col lg={6}>
                        <Form.Group className="form-group"  >
                            <CustomLabel label="Mobile" />
                            <CustomInput type="text" name="name" placeholder="Mobile" disabled />
                        </Form.Group>
                    </Col> */}

                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Company Type" />
                            <CustomInput
                                value={
                                    company_type.find(
                                        (item: any) =>
                                            item?.id ===
                                            company_details?.company_type,
                                    )?.company_type
                                }
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Industry" />
                            <CustomInput
                                disabled
                                value={
                                    industry_list.find(
                                        (item: any) =>
                                            item?.id ===
                                            company_details?.industry,
                                    )?.type
                                }
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Sub Industry" />
                            <CustomInput
                                disabled
                                value={
                                    typeof company_details?.subindustry ===
                                    'string'
                                        ? company_details?.subindustry
                                        : sub_industry_list.find(
                                              (item: any) =>
                                                  item?.id ===
                                                  company_details?.subindustry,
                                          )?.type
                                }
                                // value={industry_list.find((item: any) => item?.id === company_details?.industry)?.type === 'Others' ?
                                //     company_details?.subindustry :
                                //     sub_industry_list.find((item: any) => item?.id === company_details?.subindustry)?.type
                                // }
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Turnover" />
                            <CustomInput
                                disabled
                                value={
                                    turnover_list.find(
                                        (item: any) =>
                                            item?.id ===
                                            company_details?.turnover,
                                    )?.turnOver
                                }
                            />
                        </Form.Group>
                    </Col>
                    {company_details?.funding_detail && (
                        <Col lg={6}>
                            <Form.Group className="form-group">
                                <CustomLabel label="Funding Details" />
                                <CustomInput
                                    disabled
                                    value={
                                        funding_details.find(
                                            (item: any) =>
                                                item?.id ===
                                                company_details?.funding_detail,
                                        )?.detail
                                    }
                                />
                            </Form.Group>
                        </Col>
                    )}
                    {/* <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="No. of Employees" />
                            <CustomInput
                                disabled
                                value={additional_details?.number_of_employee}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Purchasing liability insurance for first time" />
                            <CustomInput
                                disabled
                                value={
                                    additional_details?.previous_policy
                                        ? 'Yes'
                                        : 'No'
                                }
                            />
                        </Form.Group>
                    </Col> */}
                </Row>
                <div className="pi-step-btn">
                    <CustomButton
                        // disabled={loading}
                        buttonTitle="Back"
                        onClick={() => dispatch(SignUpBackScreenAction())}
                    />
                    <OrangeButton
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
                                'Submit'
                            )
                        }
                        onClick={submitSignUpDetails}
                    />
                </div>
            </div>
        </>
    );
};
export default Review;

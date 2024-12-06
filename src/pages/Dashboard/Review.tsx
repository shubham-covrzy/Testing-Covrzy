import { useEffect } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import { DecryptData, EncryptData } from '../../common/CryptoJSToken';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import {
    BackScreenAction,
    ClearAddCovrageAction,
} from '../../Redux/Actions/AddCoverage';
import {
    ClearSignUpStateAction,
    SubmitSignUpDetailsAction,
    UpdateUserStateAction,
} from '../../Redux/Actions/AuthActions';
import {
    GetCompanyDataAction,
    GetUserProfileAction,
} from '../../Redux/Actions/UserProfileAction';
import { IReduxState } from '../../utils/types';

const Review = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { planType, id } = useParams()
    const { company_details, additional_details } = useSelector(
        (state: IReduxState) => state.AddCoverage,
    );
    const { companyData, userProfile } = useSelector(
        (state: IReduxState) => state.UserProfile,
    );

    const {
        user,
        company_type,
        sub_industry_list,
        industry_list,
        turnover_list,
        funding_details,
        loading,
        redirect,
    } = useSelector((state: IReduxState) => state.Auth);
    const userData = DecryptData(user);

    useEffect(() => {
        dispatch(GetCompanyDataAction());
    }, []);

    useEffect(() => {
        if (Object.keys(userProfile).length !== 0) {
            const EncodeData = EncryptData(userProfile);
            dispatch(UpdateUserStateAction(EncodeData));
        }
    }, [userProfile]);

    useEffect(() => {
        if (redirect === 'success') {
            dispatch(GetUserProfileAction());
            // navigate(`/user/dashboard/complate-payment/${planType}/${id}`)
            navigate(`/user/dashboard`);
            dispatch(ClearAddCovrageAction());
            dispatch(ClearSignUpStateAction());
        }
    }, [redirect]);

    const submitSignUpDetails = () => {
        // const payload = {
        //     personalDetails: { id: userData.id },
        //     companyDetails: {
        //         ...company_details,
        //         id: userData.company_id,
        //         is_profileCompleted: true,
        //     },
        //     additionalDetails: additional_details
        // }
        // dispatch(SubmitSignUpDetailsAction(payload))
    };

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
                                value={`${userData?.first_name} ${userData?.last_name}`}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Company Name" />
                            <CustomInput
                                value={companyData?.company_name}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Email" />
                            <CustomInput value={userData?.email} disabled />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Designation" />
                            <CustomInput value={userData?.job_title} disabled />
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
                                    industry_list.find(
                                        (item: any) =>
                                            item?.id ===
                                            company_details?.industry,
                                    )?.type === 'Others'
                                        ? company_details?.subindustry
                                        : sub_industry_list.find(
                                              (item: any) =>
                                                  item?.id ===
                                                  company_details?.subindustry,
                                          )?.type
                                }
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
                    <Col lg={6}>
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
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton
                        disabled={loading}
                        buttonTitle="Back"
                        onClick={() => dispatch(BackScreenAction())}
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

import { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import CustomButton from "../../common/Buttons/CustomButton";
import OrangeButton from '../../common/Buttons/OrangeButton';
import { DecryptData } from '../../common/CryptoJSToken';
import CustomInput from '../../common/CustomInput';
import CustomLabel from '../../common/CustomLabel';
import CustomTextArea from '../../common/CustomTextArea';
import CustomPhoneInput from '../../common/PhoneInput';
// import { CLAIMS } from "../../constants/main";
import {
    ClearClaimStateAction,
    UploadClaimProofAction,
} from '../../Redux/Actions/ClaimActions';
// //import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import { ToastAction } from '../../Redux/Actions/ToastAction';
import { GetUserProfileAction } from '../../Redux/Actions/UserProfileAction';
import { IReduxState } from '../../utils/types';
import FileUpload from '../Policies/FileUpload';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';

const UploadProof = () => {
    const [file, setFile] = useState<File | any>(null);
    const [countryCode, setCountryCode] = useState<string>('91');
    const { user } = useSelector((state: IReduxState) => state.Auth);
    const { loading, redirect } = useSelector(
        (state: IReduxState) => state.Claim,
    );
    const { userProfile } = useSelector(
        (state: IReduxState) => state.UserProfile,
    );
    const { activePlanId, policyId, id }: any = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = DecryptData(user);

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    useEffect(() => {
        //dispatch(setPageHeaderTitle(CLAIMS))
        dispatch(GetUserProfileAction());
    }, [dispatch]);

    useEffect(() => {
        if (redirect) {
            handleNavigate('/user/claims');
            dispatch(ClearClaimStateAction());
        }
    }, [redirect, handleNavigate, dispatch]);

    const handleChange = (file: any) => setFile(file);

    const validationSchema = yup.object().shape({
        description: yup
            .string()
            .trim()
            .required('Please Enter Your Description'),
        phone_number: yup
            .string()
            .required('Please Enter Your Phone Number')
            .matches(phonesRegx[countryCode], PHONE),
    });

    const uploadProofFormik = useFormik({
        initialValues: {
            description: '',
            phone_number: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (file) {
                console.log('upload-proof', {
                    policy_id: policyId,
                    package_id: activePlanId,
                    documents: file,
                    email: userProfile?.email,
                    description: values.description,
                    phone_number: values?.phone_number,
                });

                const formData = new FormData();
                // formData.append('user_id', userData?.id)
                Object.keys(file).map((item: any) => {
                    formData.append('documents', file[item]);
                });

                formData.append('description', values.description);
                formData.append('phone', values.phone_number);

                if (!policyId) {
                    formData.append('is_policy', 'true');
                    formData.append('is_package', 'false');
                    formData.append('policy_id', id);
                    formData.append('purchased_policy_id', activePlanId);
                } else {
                    formData.append('is_package', 'true'); //true boolean ma jai sak?  I think to ny jay
                    formData.append('is_policy', 'true');
                    formData.append('policy_id', policyId);
                    formData.append('package_id', id);
                    formData.append('purchased_policy_id', activePlanId);
                }

                dispatch(UploadClaimProofAction(formData));
            } else {
                dispatch(
                    ToastAction({
                        show: true,
                        message: 'Please Upload documents!',
                        severity: 'danger',
                    }),
                );
            }
        },
    });

    return (
        <Fragment>
            <div className="upload-proofs">
                <h3>Upload proofs</h3>
                {/* <p>The insurer expects that you submit these documents as proof for hospitalization. Plum will review these documents before they’re sent to your insurer.</p> */}
            </div>
            <Row className="justify-content-center gap-3">
                <Col lg={8}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Email Address *" />
                        <CustomInput
                            disabled
                            // name='company_name'
                            value={userProfile?.email}
                            // onChange={companyProfileFormik.handleChange}
                            // onBlur={companyProfileFormik.handleBlur}
                            placeholder="Enter Your Email Address"
                        />
                        {/* {companyProfileFormik.errors.company_name &&
                            companyProfileFormik.touched.company_name && (
                                <span className='text-error'>
                                    {companyProfileFormik.errors.company_name}
                                </span>
                            )} */}
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Please share details of what happened along with any photos or attachments you would like to share with us *" />
                        <CustomTextArea
                            rows={3}
                            value={uploadProofFormik.values.description}
                            name={'description'}
                            onChange={uploadProofFormik.handleChange}
                            onBlur={uploadProofFormik.handleBlur}
                        />
                        {uploadProofFormik.errors.description &&
                            uploadProofFormik.touched.description && (
                                <span className="text-error">
                                    {uploadProofFormik.errors.description}
                                </span>
                            )}
                    </Form.Group>
                    <div className="upload-proofs">
                        {/* <h3>Upload proofs</h3> */}
                        {/* <p>The insurer expects that you submit these documents as proof for hospitalization. Plum will review these documents before they’re sent to your insurer.</p> */}
                        <FileUpload
                            multiple
                            file={file}
                            onChange={handleChange}
                        />
                    </div>
                </Col>
                <Col lg={8}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Phone Number *" />
                        <CustomPhoneInput
                            country={'in'}
                            placeholder=""
                            value={uploadProofFormik.values.phone_number}
                            onChange={(phone: any, country: any) => {
                                setCountryCode(country?.dialCode);
                                uploadProofFormik.setFieldValue(
                                    'phone_number',
                                    phone,
                                );
                            }}
                        />
                        {uploadProofFormik.errors.phone_number &&
                            uploadProofFormik.touched.phone_number && (
                                <span className="text-error">
                                    {uploadProofFormik.errors.phone_number}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <div className="pi-step-btn justify-content-end">
                        {/* <CustomButton buttonTitle='Save and come back later' /> */}
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
                            onClick={uploadProofFormik.handleSubmit}
                        />
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};

export default UploadProof;

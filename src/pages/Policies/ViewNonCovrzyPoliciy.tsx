import { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as NonCovrzyFile } from '../../assets/images/PoliciesIconBlue.svg';
import { ONLY_ALPHABET, POLICIES } from '../../constants/main';
//import { setPageHeaderTitle } from "../../Redux/Actions/HeaderTitleAction";
import {
    AddNonCoverzyPoliciyAction,
    ClearPoliciesStateAction,
    DeleteNonCoverzyPolicyDataAction,
    DownloadNonCovrzyAction,
    ViewNonCoverzyPolicyDataAction,
} from '../../Redux/Actions/PoliciesActions';
import { IReduxState } from '../../utils/types';
import CoveredButton from '../../common/Buttons/CoveredButton';
import Downloadicon from '../../assets/images/DownloadWhite.svg';
import TrashSolid from '../../assets/images/TrashWhite.svg';
import EditWhite from '../../assets/images/EditWhite.svg';
import CustomModal from '../../common/CustomModal';
import CustomLabel from '../../common/CustomLabel';
import CustomInput from '../../common/CustomInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FileUpload from './FileUpload';
import CustomButton from '../../common/Buttons/CustomButton';
import { NumberFormat } from '../../common/NumberFormat';
import CustomCurrencyInput from '../../common/CustomCurrencyInput';
import { dateConverter, MinDate } from '../../Helper/commonFunction';
import moment from 'moment';

const ViewNonCovrzyPolicies = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [file, setFile] = useState<File | any>(null);
    const { policyId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { view_policy, loading, success, redirect } = useSelector(
        (state: IReduxState) => state.Policies,
    );
    const base_api = process.env.REACT_APP_IMAGE_BASE_URL;

    useEffect(() => {
        dispatch(ViewNonCoverzyPolicyDataAction(policyId ? policyId : ''));
        //dispatch(setPageHeaderTitle(POLICIES))
    }, [dispatch, policyId]);

    useEffect(() => {
        if (success) {
            dispatch(ViewNonCoverzyPolicyDataAction(policyId ? policyId : ''));
            setFile(null);
            setShowModal(false);
            NonCoverzyPoliciyFormik.resetForm();
            dispatch(ClearPoliciesStateAction());
        }
    }, [success]);

    useEffect(() => {
        if (redirect === 'success') {
            dispatch(ClearPoliciesStateAction());
            navigate('/user/policies/non-covrzy');
        }
    }, [redirect, dispatch, navigate]);

    const policyDownloadHandler = () => {
        dispatch(DownloadNonCovrzyAction(policyId ? policyId : ''));
    };

    const closeModalHandler = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        NonCoverzyPoliciyFormik.resetForm();
    };

    const showUpdatePolicyModal = () => {
        const {
            policy_name,
            policy_coverage_amount,
            policy_end_date,
            policy_start_date,
        } = view_policy;
        NonCoverzyPoliciyFormik.setValues({
            policy_name: policy_name,
            policy_coverage_amount: policy_coverage_amount,
            policy_start_date: new Date(policy_start_date)
                .toISOString()
                .split('T')[0],
            policy_end_date: new Date(policy_end_date)
                .toISOString()
                .split('T')[0],
        });
        setShowModal(true);
    };

    const handleChange = (file: any) => setFile(file);

    const NonCoverzyPoliciySchema = yup.object().shape({
        policy_name: yup
            .string()
            .trim()
            .required('Please Enter Policy Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        policy_coverage_amount: yup
            .string()
            .required('Please Enter Coverage Amount'),
        policy_start_date: yup
            .date()
            .max(new Date(), 'Start Date Can Not Be Greater Than Current Date')
            .required('Please Select Start Date'),
        policy_end_date: yup
            .date()
            .min(
                yup.ref('policy_start_date'),
                'End Date Can Not Be Less Than Start Date',
            )
            .required('Please Select End Date'),
    });

    const NonCoverzyPoliciyFormik = useFormik({
        initialValues: {
            policy_name: '',
            policy_coverage_amount: '',
            policy_start_date: '',
            policy_end_date: '',
        },
        validationSchema: NonCoverzyPoliciySchema,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('id', view_policy?.id);
            formData.append('policy_name', values.policy_name.trim());
            formData.append(
                'policy_coverage_amount',
                values.policy_coverage_amount,
            );
            formData.append(
                'policy_start_date',
                moment(values.policy_start_date).format('YYYY-MM-DD'),
            );
            formData.append(
                'policy_end_date',
                moment(values.policy_end_date).format('YYYY-MM-DD'),
            );
            formData.append('policy', file ? file : view_policy?.policy_doc);

            dispatch(AddNonCoverzyPoliciyAction(formData));
        },
    });

    const getDocFileName = () => {
        if (view_policy?.policy_doc) {
            const file_name_index =
                view_policy?.policy_doc.lastIndexOf('/') + 1;
            return view_policy?.policy_doc.slice(file_name_index);
        }
    };

    const modalBody = (
        <Form onSubmit={(e) => NonCoverzyPoliciyFormik.handleSubmit(e)}>
            <Row>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Policy Name *" />
                        <CustomInput
                            type="text"
                            placeholder="Enter Policy Name"
                            name="policy_name"
                            onChange={NonCoverzyPoliciyFormik.handleChange}
                            value={NonCoverzyPoliciyFormik.values.policy_name}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_name &&
                            NonCoverzyPoliciyFormik.touched.policy_name && (
                                <span className="text-error">
                                    {NonCoverzyPoliciyFormik.errors.policy_name}
                                </span>
                            )}
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Coverage Amount *" />
                        {/* <CustomInput
                        type="number"
                        name="policy_coverage_amount"
                        onChange={NonCoverzyPoliciyFormik.handleChange}
                        value={NonCoverzyPoliciyFormik.values.policy_coverage_amount}
                        placeholder="Enter Coverage amount"

                    /> */}
                        <CustomCurrencyInput
                            name="policy_coverage_amount"
                            placeholder="Enter Coverage amount"
                            onChange={(value: string) =>
                                NonCoverzyPoliciyFormik.setFieldValue(
                                    'policy_coverage_amount',
                                    value,
                                )
                            }
                            value={
                                NonCoverzyPoliciyFormik.values
                                    .policy_coverage_amount
                            }
                        />
                        {NonCoverzyPoliciyFormik.errors
                            .policy_coverage_amount &&
                            NonCoverzyPoliciyFormik.touched
                                .policy_coverage_amount && (
                                <span className="text-error">
                                    {
                                        NonCoverzyPoliciyFormik.errors
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
                            type="date"
                            name="policy_start_date"
                            maxDate={moment().format('YYYY-MM-DD')}
                            value={
                                NonCoverzyPoliciyFormik.values.policy_start_date
                            }
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                NonCoverzyPoliciyFormik.handleChange(e);
                                NonCoverzyPoliciyFormik.setFieldValue(
                                    'policy_end_date',
                                    MinDate(e.currentTarget.value),
                                );
                            }}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_start_date &&
                            NonCoverzyPoliciyFormik.touched
                                .policy_start_date && (
                                <span className="text-error">
                                    {
                                        NonCoverzyPoliciyFormik.errors
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
                            type="date"
                            name="policy_end_date"
                            minDate={MinDate(
                                NonCoverzyPoliciyFormik.values
                                    .policy_start_date,
                            )}
                            value={
                                NonCoverzyPoliciyFormik.values.policy_end_date
                            }
                            onChange={NonCoverzyPoliciyFormik.handleChange}
                        />
                        {NonCoverzyPoliciyFormik.errors.policy_end_date &&
                            NonCoverzyPoliciyFormik.touched.policy_end_date && (
                                <span className="text-error">
                                    {
                                        NonCoverzyPoliciyFormik.errors
                                            .policy_end_date
                                    }
                                </span>
                            )}
                    </Form.Group>
                </Col>
                {getDocFileName() && (
                    <Col lg={12}>
                        <Form.Group className="form-group">
                            <CustomLabel label="Previous File" />
                            <p style={{ paddingLeft: 10 }}>
                                {getDocFileName()}
                            </p>
                        </Form.Group>
                    </Col>
                )}
                <Col lg={12}>
                    <Form.Group className="form-group">
                        <CustomLabel label="Upload New File" />
                        <FileUpload
                            file={file}
                            onChange={handleChange}
                            // fileTypes={['doc']}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );

    return (
        <Fragment>
            <CustomModal
                show={showModal}
                size="lg"
                onHide={closeModalHandler}
                headerTitle="Update Non-Covrzy Policies"
                body={modalBody}
                customButtonTitle="Cancel"
                onClickCustomButton={closeModalHandler}
                onClickOrangeButton={NonCoverzyPoliciyFormik.handleSubmit}
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
                        'Update'
                    )
                }
            />

            <div className="claim-insurance">
                <div className="claim-top">
                    <span>
                        <NonCovrzyFile style={{ fill: '#7743DC' }} />
                    </span>
                    <h2>{view_policy?.policy_name}</h2>
                </div>
                <div className="db-line"></div>
                <div className="use-insurance">
                    <Row>
                        <Col xl={9}>
                            <div className="use-insurance-box">
                                <Row>
                                    {view_policy?.user?.company?.[0]
                                        ?.insurer && (
                                        <Col md={3}>
                                            <div className="use-insurance-box-item">
                                                <strong>Insurer Name</strong>
                                                <span>
                                                    {
                                                        view_policy?.user
                                                            ?.company?.[0]
                                                            ?.insurer
                                                    }
                                                </span>
                                            </div>
                                        </Col>
                                    )}
                                    <Col
                                        md={
                                            view_policy?.user?.company?.[0]
                                                ?.insurer
                                                ? 3
                                                : 4
                                        }
                                    >
                                        <div className="use-insurance-box-item">
                                            <strong>Coverage Amount</strong>
                                            <span>
                                                {NumberFormat(
                                                    view_policy?.policy_coverage_amount,
                                                )}
                                                /year
                                            </span>
                                            {/* <p>for entire family</p> */}
                                        </div>
                                    </Col>
                                    <Col
                                        md={
                                            view_policy?.user?.company?.[0]
                                                ?.insurer
                                                ? 3
                                                : 4
                                        }
                                    >
                                        <div className="use-insurance-box-item">
                                            <strong>Policy Start Date</strong>
                                            <span>
                                                {dateConverter(
                                                    view_policy?.policy_start_date,
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col
                                        md={
                                            view_policy?.user?.company?.[0]
                                                ?.insurer
                                                ? 3
                                                : 4
                                        }
                                    >
                                        <div className="use-insurance-box-item">
                                            <strong>Policy End Date</strong>
                                            <span>
                                                {dateConverter(
                                                    view_policy?.policy_end_date,
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xl={3}>
                            <div className="non-coverd-btns">
                                <CoveredButton
                                    PreImage={Downloadicon}
                                    disabled={!view_policy?.policy_doc}
                                    buttonTitle="Download"
                                    onClick={policyDownloadHandler}
                                />
                                <CoveredButton
                                    PreImage={EditWhite}
                                    buttonTitle="Edit"
                                    onClick={showUpdatePolicyModal}
                                />
                                <CoveredButton
                                    PreImage={
                                        loading ? (
                                            <Spinner
                                                animation="border"
                                                style={{
                                                    width: 23,
                                                    height: 23,
                                                }}
                                            />
                                        ) : (
                                            TrashSolid
                                        )
                                    }
                                    buttonTitle="Delete"
                                    onClick={() => {
                                        setShowDeleteModal(true);
                                    }}
                                />

                                <CustomModal
                                    show={showDeleteModal}
                                    size="md"
                                    onHide={closeModalHandler}
                                    headerTitle="Delete Policy"
                                    body="Are you sure you want to delete this?"
                                    customButtonTitle="Cancel"
                                    onClickCustomButton={closeModalHandler}
                                    onClickOrangeButton={() =>
                                        dispatch(
                                            DeleteNonCoverzyPolicyDataAction(
                                                policyId ? policyId : '',
                                            ),
                                        )
                                    }
                                    orangeButtonTitle="Delete"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <CustomButton
                                buttonTitle="Back"
                                onClick={() =>
                                    navigate('/user/policies/non-covrzy')
                                }
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewNonCovrzyPolicies;

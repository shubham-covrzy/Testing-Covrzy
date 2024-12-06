import { Fragment, useEffect, useState } from 'react';
// import CustomRadio from "../../common/CustomRadio";
// import CustomTooltip from "../../common/CustomTooltip";
// import { SaveBasicInfo } from "../../Redux/Actions/AddCoverage";
import { useFormik } from 'formik';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../common/Buttons/CustomButton';
import OrangeButton from '../../common/Buttons/OrangeButton';
import CustomLabel from '../../common/CustomLabel';
import CustomSelect from '../../common/CustomSelect';
import {
    GetCompanyTypeAction,
    GetFundingDetailsAction,
    GetIndustryListAction,
    GetSubIndustryListAction,
    GetTurnOverListAction,
    SubmitSignUpDetailsAction,
    UpdateSubIndustryListAction,
    // SaveCompanyDetailsAction
} from '../../Redux/Actions/AuthActions';
import { IReduxState } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
// import { AddCompanyDetailsAction } from "../../Redux/Actions/AddCoverage";
import CustomRadio from '../../common/CustomRadio';
import { Typeahead } from 'react-bootstrap-typeahead';
import CustomLoader from '../../common/Loader/CustomLoader';
import { COMPANY } from '../../constants/main';
import { DecryptData } from '../../common/CryptoJSToken';

const CompanyDetailsStep = () => {
    const [showField, setShowField] = useState(false);
    const [subIndustryData, setSubIndustryData] = useState([]);
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const { company_details } = useSelector(
        (state: IReduxState) => state.AddCoverage,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = DecryptData(AuthState.user);

    useEffect(() => {
        dispatch(GetCompanyTypeAction());
        dispatch(GetFundingDetailsAction());
        dispatch(GetTurnOverListAction());
        dispatch(GetIndustryListAction());

        if (company_details && Object.keys(company_details).length !== 0) {
            const {
                company_type,
                industry,
                turnover,
                funding_detail,
                company_raised_fund,
            } = company_details;
            companyFormik.setValues({
                company_type: company_type,
                industry: industry,
                sub_industry: '',
                annual_turnover: turnover,
                funding_amount: funding_detail,
                company_raised_fund: company_raised_fund ? 'yes' : 'no',
            });
        }
    }, [dispatch]);

    useEffect(() => {
        AuthState?.sub_industry_list.length > 0 &&
            setSubIndustryData(AuthState?.sub_industry_list);
    }, [AuthState?.sub_industry_list]);

    useEffect(() => {
        if (company_details?.subindustry) {
            const { subindustry } = company_details;
            companyFormik.setFieldValue('sub_industry', subindustry);
        }
    }, [AuthState.industry_list]);

    const companyValidationSchema = yup.object().shape({
        company_type: yup.string().required('Please select company type'),
        industry: yup.string().required('Please select industry'),
        sub_industry: yup.string().required('Please select sub-industry'),
        annual_turnover: yup.string().required('Please select turnover amount'),
        funding_amount: showField
            ? yup.string().required('Please select funding amount')
            : yup.string().optional(),
    });

    const companyFormik = useFormik({
        initialValues: {
            company_type: '',
            industry: '',
            sub_industry: '',
            annual_turnover: '',
            funding_amount: '',
            company_raised_fund: 'no',
        },
        validationSchema: companyValidationSchema,
        onSubmit: (values, { resetForm }) => {
            // const payload: any = {
            //     company_type: Number(values.company_type),
            //     industry: Number(values.industry),
            //     subindustry: AuthState?.industry_list.find((item: any) => item.type === 'Others')?.id == values.industry ?
            //         values.sub_industry :
            //         Number(values.sub_industry),
            //     turnover: Number(values.annual_turnover),
            //     // funding_detail: Number(values.funding_amount),
            //     is_companyfunded: values.company_raised_fund === 'yes' ? true : false
            // }
            // if (showField) {
            //     payload.funding_detail = Number(values.funding_amount)
            // }
            // dispatch(AddCompanyDetailsAction(payload))

            const payload: any = {
                completed_step: COMPANY,
                personalDetails: { id: userData.id },
                companyDetails: {
                    company_type: Number(values.company_type),
                    industry: Number(values.industry),
                    subindustry:
                        AuthState?.industry_list.find(
                            (item: any) => item.type === 'Others',
                        )?.id == values.industry
                            ? values.sub_industry.trim()
                            : Number(values.sub_industry),
                    turnover: Number(values.annual_turnover),
                    is_companyfunded:
                        values.company_raised_fund === 'yes' ? true : false,
                    id: userData.company_id,
                    is_profileCompleted: false,
                },
            };
            if (showField) {
                payload.companyDetails.funding_detail = Number(
                    values.funding_amount,
                );
            }

            dispatch(SubmitSignUpDetailsAction(payload));
        },
    });

    useEffect(() => {
        if (
            companyFormik.values.industry !== '' &&
            companyFormik.values.industry != company_details?.industry
        ) {
            dispatch(GetSubIndustryListAction(companyFormik.values.industry));
            companyFormik.setFieldValue('sub_industry', '');
        }
    }, [companyFormik.values.industry]);

    useEffect(() => {
        if (companyFormik?.values?.company_raised_fund === 'yes') {
            setShowField(true);
        } else setShowField(false);
    }, [companyFormik?.values?.company_raised_fund]);

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <Fragment>
            <div className="pi-step-form" id="pi-step-three">
                <h2 className="pi-content-title">Company Details</h2>
                {AuthState?.loading ? (
                    <div className="mt-5">
                        <CustomLoader />
                    </div>
                ) : (
                    <Form onSubmit={(e) => companyFormik.handleSubmit(e)}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Company Type *" />
                                    <CustomSelect
                                        selected={
                                            companyFormik.values.company_type
                                        }
                                        name="company_type"
                                        onChange={companyFormik.handleChange}
                                        data={AuthState?.company_type || []}
                                        value_key="id"
                                        title_key="company_type"
                                        title="Select Company Type"
                                    />
                                    {companyFormik.errors.company_type &&
                                        companyFormik.touched.company_type && (
                                            <span className="text-error">
                                                {
                                                    companyFormik.errors
                                                        .company_type
                                                }
                                            </span>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Industry *" />
                                    <CustomSelect
                                        selected={companyFormik.values.industry}
                                        name="industry"
                                        onChange={(e: any) => {
                                            companyFormik.handleChange(e);
                                            dispatch(
                                                GetSubIndustryListAction(
                                                    e.target.value,
                                                ),
                                            );
                                            companyFormik.setFieldValue(
                                                'sub_industry',
                                                '',
                                            );
                                        }}
                                        data={AuthState?.industry_list || []}
                                        value_key="id"
                                        title_key="type"
                                        title="Select Industry"
                                    />
                                    {companyFormik.errors.industry &&
                                        companyFormik.touched.industry && (
                                            <span className="text-error">
                                                {companyFormik.errors.industry}
                                            </span>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Sub Industry *" />
                                    {AuthState?.industry_list.find(
                                        (item: Object | any) =>
                                            item.type === 'Others',
                                    )?.id == companyFormik.values.industry &&
                                        subIndustryData?.length !== 0 ? (
                                        // <Typeahead
                                        //     allowNew
                                        //     defaultInputValue={companyFormik.values.sub_industry}
                                        //     id="custom-selections-example"
                                        //     onChange={(e: any) => {
                                        //         companyFormik.setFieldValue('sub_industry', e[0]?.customOption ? e[0]?.type : e[0]?.id)
                                        //     }}
                                        //     newSelectionPrefix="Add a new sub-category: "
                                        //     labelKey="type"
                                        //     options={subIndustryData}
                                        //     placeholder="Select sub-industry"
                                        // /> :
                                        <Typeahead
                                            allowNew
                                            selected={subIndustryData.filter(
                                                (item: Object | any) =>
                                                    item?.id
                                                        ? item?.id ==
                                                        companyFormik.values
                                                            .sub_industry
                                                        : item?.type ===
                                                        companyFormik.values
                                                            .sub_industry,
                                            )}
                                            id="custom-selections-example"
                                            onChange={(e: any) => {
                                                if (e[0]) {
                                                    const tempData: any = [
                                                        ...subIndustryData,
                                                    ];
                                                    if (
                                                        !tempData.find(
                                                            (
                                                                item:
                                                                    | Object
                                                                    | any,
                                                            ) =>
                                                                item?.type ===
                                                                e[0]?.type.trim(),
                                                        )
                                                    ) {
                                                        tempData.push({
                                                            type: e[0]?.type,
                                                        });
                                                        setSubIndustryData(
                                                            tempData,
                                                        );
                                                        dispatch(
                                                            UpdateSubIndustryListAction(
                                                                tempData,
                                                            ),
                                                        );
                                                    }
                                                }
                                                companyFormik.setFieldValue(
                                                    'sub_industry',
                                                    e[0]?.customOption
                                                        ? e[0]?.type
                                                        : e[0]?.id
                                                            ? e[0]?.id
                                                            : e[0]?.type,
                                                );
                                            }}
                                            newSelectionPrefix="Add a new Sub-Industry: "
                                            labelKey="type"
                                            options={subIndustryData || []}
                                            placeholder="Select Sub-Industry"
                                        />
                                    ) : (
                                        <CustomSelect
                                            selected={
                                                companyFormik.values
                                                    .sub_industry
                                            }
                                            name="sub_industry"
                                            onChange={
                                                companyFormik.handleChange
                                            }
                                            data={subIndustryData || []}
                                            value_key="id"
                                            title_key="type"
                                            title="Select Sub-Industry"
                                        />
                                    )}
                                    {companyFormik.errors.sub_industry &&
                                        companyFormik.touched.sub_industry && (
                                            <span className="text-error">
                                                {
                                                    companyFormik.errors
                                                        .sub_industry
                                                }
                                            </span>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Turnover *" />
                                    <CustomSelect
                                        selected={
                                            companyFormik.values.annual_turnover
                                        }
                                        name="annual_turnover"
                                        onChange={companyFormik.handleChange}
                                        data={AuthState.turnover_list || []}
                                        value_key="id"
                                        title_key="turnOver"
                                        title="Select Turnover Amount"
                                    />
                                    {companyFormik.errors.annual_turnover &&
                                        companyFormik.touched
                                            .annual_turnover && (
                                            <span className="text-error">
                                                {
                                                    companyFormik.errors
                                                        .annual_turnover
                                                }
                                            </span>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Is your company funded?" />
                                    <div className="pi-radio-wrp">
                                        <CustomRadio
                                            type="radio"
                                            label="Yes"
                                            name="company_raised_fund"
                                            onChange={
                                                companyFormik.handleChange
                                            }
                                            value={'yes'}
                                            checked={
                                                companyFormik.values
                                                    .company_raised_fund ===
                                                'yes'
                                            }
                                            defaultChecked={
                                                companyFormik.values
                                                    .company_raised_fund ===
                                                'yes'
                                            }
                                        />
                                        <CustomRadio
                                            type="radio"
                                            label="No"
                                            name="company_raised_fund"
                                            value={'no'}
                                            onChange={
                                                companyFormik.handleChange
                                            }
                                            checked={
                                                companyFormik.values
                                                    .company_raised_fund ===
                                                'no'
                                            }
                                            defaultChecked={
                                                companyFormik.values
                                                    .company_raised_fund ===
                                                'no'
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            {showField && (
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Funding Details *" />
                                        <CustomSelect
                                            selected={
                                                companyFormik.values
                                                    .funding_amount
                                            }
                                            name="funding_amount"
                                            onChange={
                                                companyFormik.handleChange
                                            }
                                            data={
                                                AuthState?.funding_details || []
                                            }
                                            value_key="id"
                                            title_key="detail"
                                            title="Select Funding Details"
                                        />
                                        {companyFormik.errors.funding_amount &&
                                            companyFormik.touched
                                                .funding_amount && (
                                                <span className="text-error">
                                                    {
                                                        companyFormik.errors
                                                            .funding_amount
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>
                        <div className="pi-step-btn">
                            <CustomButton
                                buttonTitle="Back"
                                onClick={() => handleNavigate('/user/dashboard')}
                            />
                            <OrangeButton
                                buttonName="Save and Continue"
                                type="submit"
                            // onClick={companyFormik.handleSubmit}
                            />
                        </div>
                    </Form>
                )}
            </div>

            {/* <div className="db-step-info" id="db-step-two">
                <div className="db-step-title">
                    <h2>Company Details</h2>
                </div>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <CustomLabel label="What does your company do?" />
                            <CustomSelect data={['Industry name, description, NAICS code...', 'Private', 'Public']} />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <div className="db-tooltips">
                                <CustomLabel label="Has your company raised funding?" />
                                <CustomTooltip message="Your Msg here.." />
                            </div>

                            <div className="pi-radio-wrp">
                                <CustomRadio type="radio" label="Yes" name="time" checked />
                                <CustomRadio type="radio" label="No" name="time" />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <CustomLabel label="What is your company's main area of focus?" />
                            <CustomSelect data={['Advertising and Digital Marketing', 'Private', 'Public']} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="pi-step-btn">
                    <CustomButton buttonTitle='Preview' />
                    <OrangeButton buttonName='Save and Continue' onClick={() => dispatch(SaveBasicInfo({ companyLegalName: '', website: '' }))} />
                </div>
            </div> */}
        </Fragment>
    );
};

export default CompanyDetailsStep;

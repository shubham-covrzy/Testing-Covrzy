import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import CustomButton from "../../common/Buttons/CustomButton";
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
    // SaveCompanyDetailsAction,
    UpdateSubIndustryListAction,
} from '../../Redux/Actions/AuthActions';
import { IReduxState } from '../../utils/types';
import CustomRadio from '../../common/CustomRadio';
import { Typeahead } from 'react-bootstrap-typeahead';
import CustomLoader from '../../common/Loader/CustomLoader';
import { COMPANY } from '../../constants/main';

const CompanyDetail = () => {
    const [showField, setShowField] = useState(false);
    const [subIndustryData, setSubIndustryData] = useState([]);
    const AuthState = useSelector((state: IReduxState) => state.Auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCompanyTypeAction());
        dispatch(GetFundingDetailsAction());
        dispatch(GetTurnOverListAction());
        dispatch(GetIndustryListAction());

        if (
            AuthState.company_details &&
            Object.keys(AuthState.company_details).length !== 0
        ) {
            const {
                company_type,
                industry,
                turnover,
                funding_detail,
                company_raised_fund,
            } = AuthState.company_details;
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
        if (AuthState.company_details?.subindustry) {
            const { subindustry } = AuthState.company_details;
            companyFormik.setFieldValue('sub_industry', subindustry);
        }
    }, [AuthState.industry_list]);

    const companyValidationSchema = yup.object().shape({
        company_type: yup.string().required('Please Select Company Type'),
        industry: yup.string().required('Please Select Industry'),
        sub_industry: yup
            .string()
            .trim()
            .required('Please Select Sub-Industry'),
        annual_turnover: yup.string().required('Please Select Turnover Amount'),
        funding_amount: showField
            ? yup.string().required('Please Select Funding Amount')
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
        onSubmit: (values) => {
            const payload: any = {
                completed_step: COMPANY,
                personalDetails: { id: AuthState?.personalDetails.id },
                companyDetails: {
                    company_type: Number(values.company_type),
                    industry: Number(values.industry),
                    subindustry:
                        AuthState?.industry_list.find(
                            (item: any) => item.type === 'Others',
                        )?.id === values.industry
                            ? values.sub_industry.trim()
                            : Number(values.sub_industry),
                    turnover: Number(values.annual_turnover),
                    is_companyfunded:
                        values.company_raised_fund === 'yes' ? true : false,
                    is_profileCompleted: false,
                    id: AuthState?.personalDetails.company_id,
                },
            };

            if (showField) {
                payload.companyDetails.funding_detail = Number(
                    values.funding_amount,
                );
            }

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
            dispatch(SubmitSignUpDetailsAction(payload));
            // dispatch(SaveCompanyDetailsAction(payload))
        },
    });

    useEffect(() => {
        if (
            companyFormik.values.industry !== '' &&
            companyFormik.values.industry != AuthState.company_details?.industry
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
    return (
        <>
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
                                    )?.id === companyFormik.values.industry ? (
                                        // <Typeahead
                                        //     allowNew
                                        //     defaultInputValue={companyFormik.values.sub_industry}
                                        //     id="custom-selections-example"
                                        //     onChange={(e: any) => {
                                        //         companyFormik.setFieldValue('sub_industry', e[0]?.customOption ? e[0]?.type : e[0]?.id)
                                        //     }}
                                        //     newSelectionPrefix="Add a new sub-category: "
                                        //     labelKey="type"
                                        //     options={AuthState?.sub_industry_list || []}
                                        //     placeholder="Select sub-industry"
                                        // /> :
                                        <Typeahead
                                            allowNew
                                            selected={subIndustryData.filter(
                                                (item: Object | any) =>
                                                    item?.id
                                                        ? item?.id ===
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
                                            newSelectionPrefix="Add a new sub-industry: "
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
                                            data={
                                                AuthState?.sub_industry_list ||
                                                []
                                            }
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
                                            // defaultChecked={
                                            //     companyFormik.values
                                            //         .company_raised_fund ===
                                            //     'yes'
                                            // }
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
                                            // defaultChecked={
                                            //     companyFormik.values
                                            //         .company_raised_fund ===
                                            //     'no'
                                            // }
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
                        <div className="pi-step-btn justify-content-end">
                            {/* <CustomButton buttonTitle='Back' /> */}
                            <OrangeButton
                                type="submit"
                                buttonName={
                                    AuthState.loading ? (
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
                                        'Save and Continue'
                                    )
                                }
                                // onClick={companyFormik.handleSubmit}
                            />
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};
export default CompanyDetail;

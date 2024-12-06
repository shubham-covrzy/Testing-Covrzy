import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomLabel from '../../common/CustomLabel';
import CustomSelect from '../../common/CustomSelect';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import CustomRadio from '../../common/CustomRadio';
import CustomInput from '../../common/CustomInput';
import {
    GetCompanyTypeAction,
    GetFundingDetailsAction,
    GetIndustryListAction,
    GetSubIndustryListAction,
    GetTurnOverListAction,
} from '../../Redux/Actions/AuthActions';
import {
    ClearResponseAction,
    GetCompanyDataAction,
    UpdateCompanyDataAction,
} from '../../Redux/Actions/UserProfileAction';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import CustomLoader from '../../common/Loader/CustomLoader';
import { Typeahead } from 'react-bootstrap-typeahead';
import OrangeButton from '../../common/Buttons/OrangeButton';
import { ONLY_ALPHABET } from '../../constants/main';

const EditCompanyProfile = (props: any) => {
    const [showField, setShowField] = useState(false);
    const [subIndustryData, setSubIndustryData] = useState([]);
    const dispatch = useDispatch();
    const {
        industry_list,
        company_type,
        funding_details,
        sub_industry_list,
        turnover_list,
        list_loading,
    } = useSelector((state: IReduxState) => state.Auth);
    const { companyData, loading, redirect } = useSelector(
        (state: IReduxState) => state.UserProfile,
    );

    useEffect(() => {
        dispatch(GetCompanyDataAction());
        dispatch(GetCompanyTypeAction());
        dispatch(GetFundingDetailsAction());
        dispatch(GetTurnOverListAction());
        dispatch(GetIndustryListAction());
        //dispatch(setPageHeaderTitle(''))
    }, [dispatch]);

    useEffect(() => {
        sub_industry_list.length > 0 && setSubIndustryData(sub_industry_list);
    }, [sub_industry_list]);

    useEffect(() => {
        if (redirect === 'success') {
            dispatch(GetCompanyDataAction());
            dispatch(
                GetSubIndustryListAction(companyProfileFormik.values.industry),
            );

            return () => {
                dispatch(ClearResponseAction());
            };
        }
    }, [redirect, dispatch]);

    useEffect(() => {
        if (Object.keys(companyData).length !== 0) {
            setInitialCompanyData();
            // const {
            //     company_name,
            //     company_type,
            //     industry,
            //     turnover,
            //     funding_detail,
            //     is_companyfunded,
            //     number_of_employee,
            //     subindustry,
            //     insurer,
            // } = companyData
            // companyProfileFormik.setValues({
            //     company_name: company_name ? company_name : '',
            //     company_type: company_type ? company_type : '',
            //     industry: industry ? industry : '',
            //     turnover: turnover ? turnover : '',
            //     funding_detail: is_companyfunded ? funding_detail : '',
            //     subindustry: subindustry ? subindustry : '',
            //     is_companyfunded: is_companyfunded ? 'yes' : 'no',
            //     policy_insurer: insurer ? insurer : '',
            //     number_of_employee: number_of_employee ? number_of_employee : ''
            // })
        }
    }, [companyData]);

    useEffect(() => {
        // setSubIndustry()
        if (companyData?.subindustry) {
            const { subindustry } = companyData;
            companyProfileFormik.setFieldValue('subindustry', subindustry);
        }
    }, [industry_list]);

    const signInValidationSchema = yup.object().shape({
        company_name: yup
            .string()
            .trim()
            .required('Please Enter Company Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        company_type: yup.string().required('Please Select Company Type'),
        industry: yup.string().required('Please Select Industry'),
        turnover: yup.string().required('Please Select Turnover Amount'),
        funding_detail: showField
            ? yup.string().required('Please Select Funding Amount')
            : yup.string().optional(),
        subindustry: yup.string().required('Please Select Sub-Industry'),
        policy_insurer: yup
            .string()
            .trim()
            .required('Please Enter Insurer Name')
            .matches(ONLY_ALPHABET, 'Only alphabets and spaces are allowed'),
        number_of_employee: yup
            .string()
            .required('Please Enter No. of Employee'),
    });

    const companyProfileFormik = useFormik({
        initialValues: {
            company_name: '',
            company_type: '',
            industry: '',
            turnover: '',
            funding_detail: '',
            subindustry: '',
            is_companyfunded: 'no',
            policy_insurer: '',
            number_of_employee: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            const payload: any = {
                personalDetails: {
                    id: companyData?.user,
                    company_name: values.company_name.trim(),
                },
                companyDetails: {
                    id: companyData?.id,
                    company_type: Number(values.company_type),
                    industry: Number(values.industry),
                    subindustry:
                        industry_list.find(
                            (item: any) => item.type === 'Others',
                        )?.id === values.industry
                            ? values.subindustry
                            : Number(values.subindustry),
                    turnover: Number(values.turnover),
                    is_companyfunded:
                        values.is_companyfunded === 'yes' ? true : false,
                },
                additionalDetails: {
                    number_of_employee: values.number_of_employee,
                    policy_insurer: values.policy_insurer.trim(),
                },
            };
            if (showField && payload?.companyDetails) {
                payload.companyDetails.funding_detail = Number(
                    values.funding_detail,
                );
            }
            dispatch(UpdateCompanyDataAction(payload));
        },
    });

    useEffect(() => {
        if (companyProfileFormik.values.industry !== '') {
            dispatch(
                GetSubIndustryListAction(companyProfileFormik.values.industry),
            );
        }
    }, [companyProfileFormik.values.industry]);

    useEffect(() => {
        if (companyProfileFormik?.values?.is_companyfunded === 'yes') {
            setShowField(true);
        } else setShowField(false);
    }, [companyProfileFormik?.values?.is_companyfunded]);

    const setInitialCompanyData = () => {
        const {
            company_name,
            company_type,
            industry,
            turnover,
            funding_detail,
            is_companyfunded,
            number_of_employee,
            subindustry,
            insurer,
        } = companyData;
        companyProfileFormik.setValues({
            company_name: company_name ? company_name : '',
            company_type: company_type ? company_type : '',
            industry: industry ? industry : '',
            turnover: turnover ? turnover : '',
            funding_detail: is_companyfunded ? funding_detail : '',
            subindustry: subindustry ? subindustry : '',
            is_companyfunded: is_companyfunded ? 'yes' : 'no',
            policy_insurer: insurer ? insurer : '',
            number_of_employee: number_of_employee ? number_of_employee : '',
        });
    };

    // const setSubIndustry = () => {
    //     if (companyData?.subindustry) {
    //         const { subindustry } = companyData
    //         companyProfileFormik.setFieldValue('subindustry', subindustry)
    //     }
    // }

    return (
        <>
            <div className="db-main-title">
                <h2>Update Company Profile</h2>
            </div>
            {loading || list_loading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <div className="edit-company-profile">
                    {/* < onSubmit={(e) => companyProfileFormik.handleSubmit(e)}> */}
                    <>
                        {/* company Details  */}
                        <div className="pi-step-form mb-4" id="pi-step-three">
                            <h2 className="pi-content-title">
                                Company Details
                            </h2>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Company Name *" />
                                        <CustomInput
                                            disabled={
                                                !!companyData.company_name
                                            }
                                            type="text"
                                            name="company_name"
                                            value={
                                                companyProfileFormik.values
                                                    .company_name
                                            }
                                            onChange={
                                                companyProfileFormik.handleChange
                                            }
                                            onBlur={
                                                companyProfileFormik.handleBlur
                                            }
                                            placeholder="Enter Company Name"
                                        />
                                        {companyProfileFormik.errors
                                            .company_name &&
                                            companyProfileFormik.touched
                                                .company_name && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors.company_name
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Company Type *" />
                                        <CustomSelect
                                            disabled={
                                                !!companyData.company_type
                                            }
                                            selected={
                                                companyProfileFormik.values
                                                    .company_type
                                            }
                                            name="company_type"
                                            onChange={
                                                companyProfileFormik.handleChange
                                            }
                                            data={company_type || []}
                                            value_key="id"
                                            title_key="company_type"
                                            title="Select Company Type"
                                        />
                                        {companyProfileFormik.errors
                                            .company_type &&
                                            companyProfileFormik.touched
                                                .company_type && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors.company_type
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Industry *" />
                                        <CustomSelect
                                            disabled={!!companyData.industry}
                                            selected={
                                                companyProfileFormik.values
                                                    .industry
                                            }
                                            name="industry"
                                            onChange={(e: any) => {
                                                companyProfileFormik.setFieldValue(
                                                    'subindustry',
                                                    '',
                                                );
                                                companyProfileFormik.handleChange(
                                                    e,
                                                );
                                            }}
                                            data={industry_list || []}
                                            value_key="id"
                                            title_key="type"
                                            title="Select Industry"
                                        />
                                        {companyProfileFormik.errors.industry &&
                                            companyProfileFormik.touched
                                                .industry && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors.industry
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Sub Industry *" />
                                        {industry_list.find(
                                            (item: Object | any) =>
                                                item.type === 'Others',
                                        )?.id ===
                                        companyProfileFormik.values.industry ? (
                                            <Typeahead
                                                disabled={
                                                    !!companyData.subindustry
                                                }
                                                allowNew
                                                selected={subIndustryData.filter(
                                                    (item: Object | any) =>
                                                        item?.id
                                                            ? item?.id ==
                                                              companyProfileFormik
                                                                  .values
                                                                  .subindustry
                                                            : item?.type ===
                                                              companyProfileFormik
                                                                  .values
                                                                  .subindustry,
                                                )}
                                                id="custom-selections-example"
                                                onChange={(e: any) => {
                                                    if (e[0]?.customOption) {
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
                                                                type: e[0]
                                                                    ?.type,
                                                            });
                                                            setSubIndustryData(
                                                                tempData,
                                                            );
                                                        }
                                                    }
                                                    companyProfileFormik.setFieldValue(
                                                        'subindustry',
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
                                                disabled={
                                                    !!companyData.subindustry
                                                }
                                                selected={
                                                    companyProfileFormik.values
                                                        .subindustry
                                                }
                                                name="subindustry"
                                                onChange={
                                                    companyProfileFormik.handleChange
                                                }
                                                data={subIndustryData || []}
                                                value_key="id"
                                                title_key="type"
                                                title="Select Sub-Industry"
                                            />
                                        )}
                                        {/* <CustomSelect
                                        selected={companyProfileFormik.values.subindustry}
                                        name="subindustry"
                                        onChange={companyProfileFormik.handleChange}
                                        data={sub_industry_list || []}
                                        value_key='id'
                                        title_key='type'
                                        title='Select sub industry'
                                    /> */}
                                        {companyProfileFormik.errors
                                            .subindustry &&
                                            companyProfileFormik.touched
                                                .subindustry && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors.subindustry
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
                                                companyProfileFormik.values
                                                    .turnover
                                            }
                                            name="turnover"
                                            onChange={
                                                companyProfileFormik.handleChange
                                            }
                                            data={turnover_list || []}
                                            value_key="id"
                                            title_key="turnOver"
                                            title="Select Turnover Amount"
                                        />
                                        {companyProfileFormik.errors.turnover &&
                                            companyProfileFormik.touched
                                                .turnover && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors.turnover
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
                                                name="is_companyfunded"
                                                onChange={
                                                    companyProfileFormik.handleChange
                                                }
                                                value={'yes'}
                                                checked={
                                                    companyProfileFormik.values
                                                        .is_companyfunded ===
                                                    'yes'
                                                }
                                                defaultChecked={
                                                    companyProfileFormik.values
                                                        .is_companyfunded ===
                                                    'yes'
                                                }
                                            />
                                            <CustomRadio
                                                type="radio"
                                                label="No"
                                                name="is_companyfunded"
                                                value={'no'}
                                                onChange={
                                                    companyProfileFormik.handleChange
                                                }
                                                checked={
                                                    companyProfileFormik.values
                                                        .is_companyfunded ===
                                                    'no'
                                                }
                                                defaultChecked={
                                                    companyProfileFormik.values
                                                        .is_companyfunded ===
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
                                                    companyProfileFormik.values
                                                        .funding_detail
                                                }
                                                name="funding_detail"
                                                onChange={
                                                    companyProfileFormik.handleChange
                                                }
                                                data={funding_details || []}
                                                value_key="id"
                                                title_key="detail"
                                                title="Select Funding Details"
                                            />
                                            {companyProfileFormik.errors
                                                .funding_detail &&
                                                companyProfileFormik.touched
                                                    .funding_detail && (
                                                    <span className="text-error">
                                                        {
                                                            companyProfileFormik
                                                                .errors
                                                                .funding_detail
                                                        }
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                )}
                            </Row>
                        </div>

                        {/* Additional Details */}
                        <div className="pi-step-form mb-4" id="pi-step-four">
                            <h2 className="pi-content-title">
                                Additional Details
                            </h2>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="No. of Employees *" />
                                        <CustomInput
                                            type="number"
                                            name="number_of_employee"
                                            // onKeyDown={(e: any) => {
                                            //     if (e.code.includes('Digit') || e.code.includes('Backspace')) {
                                            //     } else e.target.blur();
                                            // }}
                                            onChange={(e: any) => {
                                                if (e.target.value >= 0)
                                                    companyProfileFormik.handleChange(
                                                        e,
                                                    );
                                            }}
                                            placeholder="Enter No. of Employees"
                                            value={
                                                companyProfileFormik.values
                                                    .number_of_employee
                                            }
                                        />
                                        {companyProfileFormik.errors
                                            .number_of_employee &&
                                            companyProfileFormik.touched
                                                .number_of_employee && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors
                                                            .number_of_employee
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="form-group">
                                        <CustomLabel label="Insurer Name *" />
                                        <CustomInput
                                            // disabled
                                            type="text"
                                            placeholder="Enter Insurer Name"
                                            value={
                                                companyProfileFormik.values
                                                    .policy_insurer
                                            }
                                            name="policy_insurer"
                                            onChange={
                                                companyProfileFormik.handleChange
                                            }
                                        />
                                        {companyProfileFormik.errors
                                            .policy_insurer &&
                                            companyProfileFormik.touched
                                                .policy_insurer && (
                                                <span className="text-error">
                                                    {
                                                        companyProfileFormik
                                                            .errors
                                                            .policy_insurer
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <div className="pi-step-btn justify-content-start gap-2">
                            <CustomButton
                                buttonTitle={'Revert Changes'}
                                onClick={setInitialCompanyData}
                            />
                            <OrangeButton
                                // type='submit'
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
                                        'Update company profile'
                                    )
                                }
                                onClick={companyProfileFormik.handleSubmit}
                            />
                        </div>
                    </>
                </div>
            )}
        </>
    );
};

export default EditCompanyProfile;

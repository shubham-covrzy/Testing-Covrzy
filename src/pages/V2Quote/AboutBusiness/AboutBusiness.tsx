import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CustomLabel from '../../../common/CustomLabel';
import CustomInput from '../../../common/CustomInput';
import Style from './style.module.scss';
import CategoryCardSection from './CategoryCardSection';
import { useDispatch, useSelector } from 'react-redux';
import {
    GstApiIntegrationAction,
    SaveAboutBusinessAction,
    SaveBusinessTypeAction,
} from '../../../Redux/Actions/CustomerInformationAction';
import { IReduxState } from '../../../utils/types';
import { annualTurnoverOptions } from '../../../utils/StaticDatas';
import { RecommendationApiIntegrationAction } from '../../../Redux/Actions/RecommendationAction';
import FullPageSpinner from '../../../common/FullPageSpinner';
import { UpdateUserProfileAction } from '../../../Redux/Actions/UserProfileAction';
import { businessCategories } from '../../../utils/QuoteData/BusineesCategories';
import ArrowBack from '../../../assets/images/arrow-left.svg';

import CustomButton from '../../../common/Buttons/CustomButton';
import { UpdateUserSessionAction } from '../../../Redux/Actions/SessionAction';

interface AboutBusinessProps {
    buttonClicks: boolean;
    setSubmitButtonClick: any;
    formFilled: any;
    setFormFilled: any;
    buttonDisable: boolean;
    setButtonDisable: any;
    setIndex: any;
    setButtonClick: any;
    index: number;
    businessData: any;
}

// add validation for proceed ,  dispatch({
//   type: TOAST_SHOW,
//   payload: {
//     message: 'Please Click Proceed ',
//     severity: 'danger',
//     show: true,
//   },
// });

function AboutBusiness(props: AboutBusinessProps) {
    const dispatch = useDispatch();
    const [knowsGST, setKnowsGST] = useState(true);
    const [headerBox, setHeaderBox] = useState(true);
    const [gstin, setGstin] = useState('');
    const [disableGstInfo, setDisableGstInfo] = useState(false);
    const [category, setCategory] = useState('');
    const [legalName, setLegalName] = useState('');
    const [annualTurnover, setAnnualTurnover] = useState('');
    const [isFunded, setIsFunded] = useState(false);
    const [employeesCount, setEmployeesCount] = useState<number | any>('');
    const [fundingAmount, setFundingAmount] = useState('');
    const [address, setAddress] = useState<any>('');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const navigate = useNavigate();

    const customInfo = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );
    const { gstData, policies, businessCategory } = customInfo;

    const { loading, navigator } = useSelector(
        (state: IReduxState) => state.Recommendations,
    );
    const userSession = useSelector((state: IReduxState) => state.UserSession);

    useEffect(() => {
        if (props.businessData) {
            setAddress(props.businessData.address);
            setAnnualTurnover(props.businessData.annualTurnover);
            categoryHandleClick(props.businessData.businessCategory);
            setFundingAmount(props.businessData.fundingAmount);
            setIsFunded(props.businessData.fundingType);
            gstHandleChange(props.businessData.gstin);
            setLegalName(props.businessData.legalName);
            setEmployeesCount(props.businessData.noOfEmployee);
        }
    }, []);

    useEffect(() => {
        if (isGstEmpty()) {
            setHeaderBox(false);
            setDisableGstInfo(false);
        } else {
            setHeaderBox(true);
            setGstin(gstData.gstin);
            setLegalName(gstData.legalName);
            setAnnualTurnover(gstData.annualTurnover);
            setAddress(gstData.address);

            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id,
                    userSessionData: {
                        gstData: gstData,
                    },
                }),
            );
        }
    }, [gstData]);

    useEffect(() => {
        if (!knowsGST) {
            if (policies.length === 0) {
                if (selectedCategory === 'startup') {
                    if (employeesCount) {
                        props.setButtonDisable(false);
                    } else {
                        props.setButtonDisable(true);
                    }
                } else {
                    if (selectedCategory) {
                        props.setButtonDisable(false);
                    } else {
                        props.setButtonDisable(true);
                    }
                }
            } else {
                if (address) {
                    props.setButtonDisable(false);
                } else {
                    props.setButtonDisable(true);
                }
            }
        } else {
            if (policies.length === 0) {
                if (selectedCategory === 'startup') {
                    if (employeesCount) {
                        props.setButtonDisable(false);
                    } else {
                        props.setButtonDisable(true);
                    }
                } else {
                    if (selectedCategory) {
                        props.setButtonDisable(false);
                    } else {
                        props.setButtonDisable(true);
                    }
                }
            } else {
                if (address) {
                    props.setButtonDisable(false);
                } else {
                    props.setButtonDisable(true);
                }
            }
        }
    }, [
        gstin,
        category,
        legalName,
        annualTurnover,
        address,
        employeesCount,
        fundingAmount,
    ]);

    useEffect(() => {
        if (props.buttonClicks) {
            const data = {
                legalName: legalName,
                annualTurnover: annualTurnover,
                fundingType: isFunded,
                fundingAmount: fundingAmount,
                noOfEmployee: employeesCount,
                businessCategory: category || businessCategory,
                address: address,
                businessType: selectedCategory,
                gstin: gstin,
            };
            const formData = new FormData();
            formData.append('address', address);

            dispatch(SaveAboutBusinessAction(data));
            dispatch(RecommendationApiIntegrationAction(data));
            dispatch(UpdateUserProfileAction(formData));
            dispatch(
                UpdateUserSessionAction({
                    id: userSession.id,
                    userSessionData: {
                        businessData: data,
                    },
                }),
            );

            props.setSubmitButtonClick(false);
            props.setButtonClick(false);
        }
    }, [props.buttonClicks]);

    const categoryHandleClick = (name: string) => {
        setCategory(name);
        // setSelectedCategory(name);
        const selectedCategoryObject = businessCategories.find(
            (category) => category.name === name,
        );
        if (selectedCategoryObject) {
            const selectedCategoryType = selectedCategoryObject.businessType;
            setSelectedCategory(selectedCategoryType);
        }
    };

    useEffect(() => {
        dispatch(SaveBusinessTypeAction(selectedCategory));
    }, [selectedCategory]);

    useEffect(() => {
        if (navigator === true) {
            props.setIndex(2);
        }
    }, [navigator]);

    const handleKnowsGSTChange = (e: any) => {
        setKnowsGST(e.target.value === 'yes');
    };

    const gstHandleChange = (e: string) => {
        const gst: string = e;
        const regexPattern =
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        const comparedGst = regexPattern.test(gst);
        setGstin(gst);

        if (comparedGst) {
            dispatch(
                GstApiIntegrationAction({
                    gstin: gst,
                }),
            );
        }
    };

    const addressHandleChange = (e: any) => {
        const updatedAddress = e.target.value;
        setAddress(updatedAddress);
    };

    const isGstEmpty = () => {
        return Object.keys(gstData).length === 0;
    };

    const proceedHandleClick = () => {
        if (gstin && legalName && address && annualTurnover) {
            setDisableGstInfo(true);
        }
    };

    const handleLegalNameChange = (e: any) => {
        setLegalName(e.target.value);
    };

    const showCategorySection = address && address.length > 0;

    return (
        <div className={Style.main}>
            <h6 className={Style.heading}>Let’s get down to business</h6>
            {!headerBox && (
                <Form.Group className={`form-group ${Style.container}`}>
                    <p>
                        Do you know your GST No.? If you don't know it or prefer
                        not to provide it now, you can select "I don't know"
                        from the options.
                    </p>
                    <div className={Style.radioButtons}>
                        <label>
                            <input
                                type="radio"
                                name="knowsGST"
                                value="yes"
                                checked={knowsGST}
                                onChange={handleKnowsGSTChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="knowsGST"
                                value="no"
                                checked={!knowsGST}
                                onChange={handleKnowsGSTChange}
                            />
                            I don’t know
                        </label>
                    </div>
                </Form.Group>
            )}

            <div className={Style.knowGst}>
                {knowsGST ? (
                    <>
                        <Form.Group className="form-group">
                            {isGstEmpty() ? (
                                <CustomLabel label="Enter the GST No. *" />
                            ) : (
                                <CustomLabel label="Your GST No. *" />
                            )}
                            <CustomInput
                                placeholder="Enter your GST number"
                                disabled={disableGstInfo}
                                name="gstin"
                                value={gstin}
                                onChange={(e: any) => {
                                    gstHandleChange(e.target.value);
                                }}
                            />
                        </Form.Group>
                        {!isGstEmpty() && (
                            <>
                                <p>
                                    Here's the information we've retrieved from
                                    your GST No.
                                </p>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Legal Name of Your Business *" />
                                    <CustomInput
                                        name="legalName"
                                        disabled={disableGstInfo}
                                        value={legalName}
                                        placeholder="Enter your business name"
                                        onChange={(e: any) =>
                                            setLegalName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Your Approximate Annual Revenue *" />
                                    <Form.Select
                                        name="annualTurnover"
                                        disabled={disableGstInfo}
                                        value={annualTurnover}
                                        onChange={(e: any) => {
                                            setAnnualTurnover(e.target.value);
                                        }}
                                    >
                                        {annualTurnover && (
                                            <option value={annualTurnover}>
                                                {annualTurnover}
                                            </option>
                                        )}
                                        {annualTurnoverOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                {annualTurnover && (
                                    <>
                                        <CustomLabel label="Address *" />
                                        <Form.Group className="form-group">
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name="address"
                                                value={address}
                                                disabled={disableGstInfo}
                                                onChange={addressHandleChange}
                                            />
                                        </Form.Group>
                                    </>
                                )}
                                {!businessCategory && (
                                    <p className={Style.textItems}>
                                        If any of the retrieved information is
                                        incorrect or needs editing, please make
                                        the necessary changes and click
                                        <span onClick={proceedHandleClick}>
                                            {' '}
                                            Proceed{' '}
                                        </span>
                                    </p>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <p>What's the full legal name of your business?</p>
                        <Form.Group className="form-group">
                            <CustomLabel label="Legal Name of Your Business *" />
                            <CustomInput
                                placeholder="Enter your business name"
                                name="legalName"
                                value={legalName}
                                onChange={handleLegalNameChange}
                            />
                        </Form.Group>
                        {legalName && (
                            <>
                                <p>
                                    Could you please provide your approximate
                                    annual revenue?
                                </p>
                                <Form.Group className="form-group">
                                    <CustomLabel label="Select Annual Revenue *" />
                                    <Form.Select
                                        name="annualTurnover"
                                        value={annualTurnover}
                                        onChange={(e: any) => {
                                            setAnnualTurnover(e.target.value);
                                        }}
                                    >
                                        <option>
                                            Select Your Annual Revenue{' '}
                                        </option>
                                        {annualTurnoverOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}
                        {annualTurnover && (
                            <>
                                <CustomLabel label="Address *" />
                                <Form.Group className="form-group">
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="address"
                                        value={address}
                                        onChange={(e: any) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </>
                )}
                {!businessCategory && (
                    <>
                        {disableGstInfo ||
                        (showCategorySection && !knowsGST) ? (
                            <CategoryCardSection
                                handleClick={categoryHandleClick}
                                selected={category}
                                funded={isFunded}
                                setFunded={setIsFunded}
                                employeeCount={employeesCount}
                                setEmployeeCount={setEmployeesCount}
                                fundingAmount={fundingAmount}
                                setFundingAmount={setFundingAmount}
                                businessCategories={businessCategories}
                                businessType={selectedCategory}
                            />
                        ) : (
                            ''
                        )}
                    </>
                )}
            </div>
            <div className="footer-buttons">
                {props.index !== 2 ? (
                    <div
                        className="footer-back-button"
                        onClick={() => {
                            if (props.index === 0) {
                                navigate('/') // navigate('/quote/insurance-packages')
                            } else {
                                props.setIndex(props.index - 1);
                            }
                        }}
                    >
                        <img
                            src={ArrowBack}
                            alt=""
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
                {props.index !== 3 && (
                    <CustomButton
                        className="next-button"
                        disabled={props.buttonDisable}
                        type="Submit"
                        buttonTitle="Next"
                        onClick={() => {
                            props.setButtonClick(true);
                            if (props.index === 1) {
                                props.setSubmitButtonClick(true);
                            }
                        }}
                    />
                )}
            </div>
            {loading && <FullPageSpinner />}
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.2)', // Adjust the opacity and color as needed
                        zIndex: 9999,
                    }}
                />
            )}
        </div>
    );
}

export default AboutBusiness;

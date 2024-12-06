import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import CustomButton from '../../common/Buttons/CustomButton';
import LinearProgressBar from '../../components/LinearProgressBar';
import { IReduxState } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import policyHolderInputValidationSchema from './validation';
import CustomerType from './CustomerType';
import PersonalDetail from './PersonalDetail';
import ContactDetail from './ContactDetail';
import AddressDetail from './AddressDetail';
import InsuredDetail from './InsuredDetail';
import styles from './style.module.scss';
import CircularStepper from '../../common/CustomStepper/customStepperr';
import backbutton from '../../assets/images/backButton.svg';
import { SaveInitiatePurchasePolicyAction } from '../../Redux/Actions/PolicyInputAction';
import FullPageSpinner from '../../common/FullPageSpinner';
import { useNavigate } from 'react-router-dom';
import { UpdateUserSessionAction } from '../../Redux/Actions/SessionAction';
import { isObjectEmpty } from '../../Helper/commonFunction';

export interface PolicyHolderInputChildFormProp {
    formik: any;
    setIsValid: (prev: any) => void;
    value: any;
}

enum StepAction {
    Back = 'Back',
    Next = 'Next',
    Submit = 'Submit',
}

const PolicyHolder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = useSelector(
        (state: IReduxState) => state.PolicyHolderInput,
    );
    const userSession = useSelector((state: IReduxState) => state.UserSession);
    const [initialData, setInitialData] = useState(initialValues);

    const [isValidList, setValidList] = useState(Array(6).fill(false));
    const [currentStep, setCurrentStep] = useState(1);
    const [customerType, setCustomerType] = useState('');
    const [personalDetail, setPersonalDetail] = useState({});
    const [contactDetail, setContactDetail] = useState({});
    const [addressDetail, setAddressDetail] = useState({});
    const [insuredDetail, setInsuredDetail] = useState({});

    const { loading } = initialValues;

    const formik = useFormik({
        initialValues,
        validationSchema: policyHolderInputValidationSchema,
        onSubmit: () => {},
    });

    interface Step {
        id: number;
        title: string;
        Body: React.ReactNode; // Use React.ReactNode for the Body property
    }

    const steps: Step[] = [
        {
            id: 1,
            title: 'Tell Us About Yourself',
            Body: (
                <CustomerType
                    formik={formik}
                    setIsValid={setValidList}
                    value={customerType}
                />
            ),
        },
        {
            id: 2,
            title: 'Proposer ',
            Body: (
                <PersonalDetail
                    formik={formik}
                    setIsValid={setValidList}
                    value={personalDetail}
                />
            ),
        },
        {
            id: 3,
            title: 'Proposer Contact Details',
            Body: (
                <ContactDetail
                    formik={formik}
                    setIsValid={setValidList}
                    value={contactDetail}
                />
            ),
        },
        {
            id: 4,
            title: 'Proposer Address',
            Body: (
                <AddressDetail
                    formik={formik}
                    setIsValid={setValidList}
                    value={addressDetail}
                />
            ),
        },
        {
            id: 5,
            title: 'Policy Holder Details',
            Body: (
                <InsuredDetail
                    formik={formik}
                    setIsValid={setValidList}
                    value={insuredDetail}
                />
            ),
        },
    ];

    const handleStep = (s: StepAction) => {
        switch (s) {
            case StepAction.Back:
                setCurrentStep((prev) => (prev === 1 ? prev : prev - 1));
                break;
            case StepAction.Next:
                setCurrentStep((prev) => prev + 1);
                dispatch(
                    UpdateUserSessionAction({
                        id: userSession.id, // always add for params
                        nextSessionState: 'policy_purchase_initiated',
                        userSessionData: {
                            policyPurchaseData: formik.values,
                        },
                    }),
                );
                break;
            case StepAction.Submit:
                const {
                    addressDetail,
                    personalDetail,
                    customerType,
                    insuredDetail,
                    contactDetail,
                } = formik.values;

                dispatch(
                    SaveInitiatePurchasePolicyAction({
                        body: {
                            addressDetail,
                            personalDetail,
                            customerType,
                            insuredDetail,
                            contactDetail,
                        },
                        navigate,
                    }),
                );

                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!userSession.userSessionData) {
            return;
        }
        const policyPurchaseData =
            userSession.userSessionData.policyPurchaseData;

        if (!isObjectEmpty(policyPurchaseData)) {
            if (!isObjectEmpty(policyPurchaseData.customerType)) {
                setCustomerType(policyPurchaseData.customerType);
            }
            if (!isObjectEmpty(policyPurchaseData.personalDetail)) {
                setPersonalDetail(policyPurchaseData.personalDetail);
            }
            if (!isObjectEmpty(policyPurchaseData.contactDetail)) {
                setContactDetail(policyPurchaseData.contactDetail);
            }
            if (!isObjectEmpty(policyPurchaseData.addressDetail)) {
                setAddressDetail(policyPurchaseData.addressDetail);
            }
            if (!isObjectEmpty(policyPurchaseData.insuredDetail)) {
                setInsuredDetail(policyPurchaseData.insuredDetail);
            }
            setInitialData({ ...initialData, ...policyPurchaseData });
        }
    }, []);

    return (
        <div>
            <CircularStepper totalSteps={5} activeStep={currentStep} />
            <LinearProgressBar
                value={(currentStep * 100) / steps.length}
                // text={Step ${currentStep}/${steps.length}}
            />
            <div className={styles.main}>
                {/* <CustomStepperr steps={steps} currentStep={currentStep} /> */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {steps[currentStep - 1].title}
                    </h1>
                </div>
                <div className={styles.body}>{steps[currentStep - 1].Body}</div>
                <div className={styles.footer}>
                    <div className={styles.buttonGroup}>
                        {currentStep > 0 && (
                            <img
                                src={backbutton}
                                // buttonName="Back"
                                onClick={() => handleStep(StepAction.Back)}
                            />
                        )}
                        <CustomButton
                            type="submit"
                            disabled={!isValidList[currentStep]}
                            buttonTitle={
                                currentStep === steps.length ? 'Submit' : 'Next'
                            }
                            onClick={() =>
                                handleStep(
                                    currentStep === steps.length
                                        ? StepAction.Submit
                                        : StepAction.Next,
                                )
                            }
                        />
                    </div>
                </div>
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
};

export default PolicyHolder;

import React, { useState, useEffect } from 'react';
import TypeFilterLayout from '../../components/TypeFilterLayout';
import style from './style.module.scss';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { data } from '../../utils/QuoteData/ProductsDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
    ResetCustomerInformationAction,
    SaveSelectedProductsAction,
} from '../../Redux/Actions/CustomerInformationAction';
import { ClearRecommendationData } from '../../Redux/Actions/RecommendationAction';
import { GAActions, GACategories } from '../../utils/googleAnalytics/gaData';
import useGAEvent from '../../utils/googleAnalytics/useGAEvent';
import GetRecommendationSection from '../../components/GetRecommendationSection';
import arrow from '../../assets/images/next-arrow-p.svg';
import PolicyCardComponent from '../../components/PolicyCard';
import { TOAST_SHOW } from '../../Redux/Actions/ToastAction';
import Footer from '../../common/QuoteLayout/Footer';
import { ClearSelectedProducts } from '../../Redux/Actions/SaveProductAction';
import { ClearQuoteDataAction } from '../../Redux/Actions/QuoteAction';
import { IReduxState } from '../../utils/types';
// import useMSG90OTPWidget from '../../common/QuoteLayout/MSG90widgetfunction';
import {
    ClearUserSession,
    GetUserSessionByIdAction,
    GetUserSessions,
    SaveUserStateAction,
} from '../../Redux/Actions/SessionAction';
import { isObjectEmpty } from '../../Helper/commonFunction';
import ResumeModalComponent from '../../components/ResumeModal';
import CustomLoginModal from '../../components/CustomLoginModal';

export enum UserSessionFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
    PaymentCompleted = 'paymentCompleted',
}
function InsurancePackages() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sendGAEvent } = useGAEvent(GACategories.InsurancePackagesPage);
    const [productItems, setProductItems] = useState<any[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(
        'Startup',
    );
    const [childHeight, setChildHeight] = useState('auto');
    const [card, setCard] = useState<any[]>([]);
    const [resume, setResume] = useState<boolean>(false);

    const { isLogin } = useSelector((state: IReduxState) => state.Auth);
    const userSession = useSelector((state: IReduxState) => state.UserSession);

    // const { handleSubmit } = useMSG90OTPWidget();
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        const tallestChildHeight = Math.max(
            ...Array.from(document.querySelectorAll('.dynamic-height')).map(
                (child) => child.clientHeight,
            ),
        );
        setChildHeight(tallestChildHeight + 'px');
    }, [childHeight]);

    useEffect(() => {
        dispatch(ResetCustomerInformationAction());
        dispatch(ClearRecommendationData());
        dispatch(ClearSelectedProducts());
        dispatch(ClearQuoteDataAction());
        localStorage.removeItem('order');
    }, []);

    useEffect(() => {
        const filteredData = data.filter(
            (el) => el.category === selectedPackage,
        );
        if (filteredData.length > 0 && filteredData[0].cards) {
            setCard(filteredData[0].cards);

            let allProducts = data.map((item) => item.cards).flat();

            const policyIdMap: any = {};

            allProducts.forEach((item: any) => {
                policyIdMap[item.policyId] = item;
            });
        }
    }, [selectedPackage]);

    // TODO: @AnoonaCovrzy Need to fix something
    // useEffect(() => {
    //     if (isLogin) {
    //         dispatch(GetUserSessions(UserSessionFilter.Active));
    //     } else {
    //         setResume(false);
    //     }
    // }, [isLogin]);

    // useEffect(() => {
    //     if (isObjectEmpty(userSession) && !isLogin) {
    //         setResume(false);
    //         return;
    //     }
    //     setResume(true);
    // }, [userSession]);

    const addProductHandleClick = (productDetails: any) => {
        sendGAEvent(GAActions.AddCoverageClicked);

        const identifier = productDetails.id;

        if (productItems.some((element: any) => element.id === identifier)) {
            setProductItems(
                productItems.filter((el: any) => el.id !== identifier),
            );
        } else {
            setProductItems([...productItems, productDetails]);
        }
    };

    const handlePackageSelect = (packageName: string) => {
        sendGAEvent(GAActions.PolicyFilterClicked);
        if (!(selectedPackage === packageName)) {
            setSelectedPackage(packageName);
        }
    };

    function checkIfProductExists(id: number) {
        return productItems.some((obj) => obj.id === id);
    }

    const handleDispatchButton = () => {
        sendGAEvent(GAActions.StartApplicationClicked);
        dispatch(
            SaveSelectedProductsAction({
                policies: productItems,
                businessCategory: selectedPackage,
            }),
        );

        if (isLogin) {
            if (productItems.length !== 0) {
                dispatch(
                    SaveUserStateAction({
                        userSessionData: {
                            selectedProductsData: {
                                policies: productItems,
                                businessCategory: selectedPackage,
                            },
                        },
                    }),
                );
                dispatch(ClearUserSession());
                navigate('/quote/info');
            } else {
                dispatch({
                    type: TOAST_SHOW,
                    payload: {
                        message: 'Please select atleast one product.',
                        severity: 'danger',
                        show: true,
                    },
                });
            }
        } else {
            setShowLoginModal(true);
        }
    };

    const updateProductItems = (newItems: any) => {
        setProductItems(newItems);
    };
    const handleContinueButtonClick = () => {
        dispatch(GetUserSessionByIdAction({ id: userSession.id }));
        navigate('/quote/info');
    };
    const handleCloseModal = () => {
        dispatch(ClearUserSession());
        setResume(false);
    };

    return (
        <>
            <div className={style.main}>
                <ResumeModalComponent
                    open={resume}
                    onClose={handleCloseModal}
                    resumeOnclick={handleContinueButtonClick}
                />
                <div className={style.heroHeader}>
                    <h1 className="noselect">
                        Explore <span>Insurance</span> Options for your Business
                    </h1>
                    <p className="noselect">
                        Discover tailored insurance options for your business.
                        Explore, filter, and request quotes effortlessly.
                    </p>
                </div>
                <div className={style.body}>
                    <div className={style.title}>
                        <h2>Start Application</h2>
                        <p>
                            Fuel your business with bespoke protection-
                            Kickstart your application at Covrzy, where tailored
                            solutions meet your unique needs.
                        </p>
                        <div className={style.filters}>
                            <TypeFilterLayout
                                onClick={handlePackageSelect}
                                selectedPackage={selectedPackage}
                                productLength={productItems.length}
                                updateProductItems={updateProductItems}
                            />
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.cardSec}>
                            <Row>
                                {card.map((element: any, index: number) => (
                                    <Col
                                        lg={4}
                                        key={index}
                                        className={style.cardCol}
                                        style={{ marginLeft: '15px' }}
                                    >
                                        <div
                                            className={`${style.card} dynamic-height`}
                                        >
                                            <PolicyCardComponent
                                                toggleCoverage={
                                                    addProductHandleClick
                                                }
                                                data={element}
                                                isSelected={checkIfProductExists(
                                                    element.id,
                                                )}
                                                recommended={false}
                                                showCoverSI={false}
                                                UI={false}
                                                height={childHeight}
                                                setCoverSI={false}
                                                coverSI={false}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <button
                            // style={customStyle}
                            onClick={handleDispatchButton}
                        >
                            Next <img src={arrow} alt="" />
                        </button>
                    </div>
                </div>

                <div>
                    <GetRecommendationSection />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            <CustomLoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} navigationAllowed={false} />
        </>
    );
}

export default InsurancePackages;

import Business from '../../assets/images/Business.png';
import network from '../../assets/images/network.svg';
import rating from '../../assets/images/rating.svg';
import GetBussiness from '../../assets/images/get-bussiness.png';
// import cllogo1 from '../../assets/images/cl_logo1.png';
// import cllogo2 from '../../assets/images/cl_logo2.png';
// import cllogo3 from '../../assets/images/cl_logo3.png';
// import cllogo5 from '../../assets/images/cl_logo5.png';
// import cllogo6 from '../../assets/images/cl_logo6.png';
import article from '../../assets/images/article.png';
import ArrowBtn from '../../assets/images/ArrowBtn.png';
import businessesInsuranceImage from '../../assets/images/businesses-insurance.png';
import docFileImage from '../../assets/images/doc-file-check.png';
import cyberLinkImage from '../../assets/images/cyber-link.png';
import MainBanner from '../../common/MainBanner';
import { Container, Row } from 'react-bootstrap';
import SubBanner from '../../common/SubBanner';
// import Images from "../../common/Images";
import CustomCards from '../../common/CustomCards';
import RatingCards from './RatingCards';
import ScrollManu from './ScrollManu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetPolicyByIdAction } from '../../Redux/Actions/HomepageActions';
import { useNavigate, useParams } from 'react-router-dom';
import { IReduxState } from '../../utils/types';
import CustomLoader from '../../common/Loader/CustomLoader';
import CustomQuoteModal from '../../components/CustomQuoteModal';
import MetaTags from '../../common/MetaTag';
import slugMapping from '../../utils/slug_mapping.json'

const BusinessOwnerPolicy = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirectToSME = [
        'Fire & Other Perils',
        'Theft/Burglary',
        'Property Insurance',
    ];
    const [showCustomQuoteModal, setShowCustomQuoteModal] = useState<boolean>(false);
    const { view_single_policy, loading } = useSelector((state: IReduxState) => state.Homepage);
    
    const handleOpenCustomQuoteModal = () => {
        setShowCustomQuoteModal(true);
    };
    
    // const { policyId }: any = useParams();
    const { slug }: any = useParams();  // Get slug from the URL
    // Convert slug to policy ID using the slug_mapping.json file
    const policyId = (Object.keys(slugMapping.policies) as Array<keyof typeof slugMapping.policies>).find(
        key => slugMapping.policies[key] === slug
    );

  
    
    useEffect(() => {
        if (policyId) {
            dispatch(GetPolicyByIdAction(policyId));
        } else {
            navigate('/404'); 
        }
    }, [dispatch, policyId, navigate]);
    return (
        <>
            <MetaTags
                title={view_single_policy?.policy_name || 'Business Owner Policy'}
                description={`Learn more about ${view_single_policy?.policy_name} at Covrzy.`}
                url={`https://covrzy.com/policy-details/${slug}`}
                canonical={`https://covrzy.com/policy-details/${slug}`}
            />

            {loading ? (
                <div className="m-5">
                    <CustomLoader />
                </div>
            ) : (
                <div>
                    <MainBanner
                        mainTitle={view_single_policy?.policy_name}
                        // subTitle="Policy"
                        content={`<ul>
                            <li>${view_single_policy?.policy_defination}</li>
                        </ul>`}
                        image={Business}
                        imgWidth={431}
                        imgHeight={458}
                        showbutton
                    />
                    <ScrollManu />
                    <SubBanner
                        bgImage={GetBussiness}
                        whiteTitle={`Get your<br/> ${view_single_policy?.policy_name}<br/> quote in less than 10 minutes`}
                        buttonTitle="Get Your Coverage Now"
                        onClick={() => {
                            if (redirectToSME.includes(view_single_policy?.policy_name)) {
                                window.location.href = 'https://sme.covrzy.com/fire-insurance';
                            } else {
                                handleOpenCustomQuoteModal();
                            }
                        }}
                        image={network}
                    />
                    <CustomQuoteModal
                        show={showCustomQuoteModal}
                        setShowModal={setShowCustomQuoteModal}
                        source={view_single_policy?.policy_name}
                    />
                    {/* <section className='rating-card'>
                        <Container>
                            <Row>
                                <RatingCards image={rating} content={`“COVRZY has given the insurance industry
                                    a much-needed makeover that transforms
                                    something I always considered monotonous
                                    and dull into something streamlined
                                    and simple.”`} linkTitle="Ben Rollins" title="Axon Optics" />
                                <RatingCards image={rating} content={`“COVRZY has given the insurance industry
                                    a much-needed makeover that transforms
                                    something I always considered monotonous
                                    and dull into something streamlined
                                    and simple.”`} linkTitle="Ben Rollins" title="Axon Optics" />
                                <RatingCards image={rating} content={`“COVRZY has given the insurance industry
                                    a much-needed makeover that transforms
                                    something I always considered monotonous
                                    and dull into something streamlined
                                    and simple.”`} linkTitle="Ben Rollins" title="Axon Optics" />
                            </Row>
                        </Container>
                    </section> */}
                    {/* <section className="trusted-companies">
                        <Container>
                            <div className="trusted-logo">
                                <Images image={cllogo6} />
                                <Images image={cllogo1} />
                                <Images image={cllogo2} />
                                <Images image={cllogo3} />
                                <Images image={cllogo5} />
                            </div>
                        </Container>
                    </section> */}
                    <section className="article-section">
                        <Container>
                            {/* <h2 className="title-wrp">Related <span>Articles</span></h2> */}
                            <h2 className="title-wrp">
                                <span>Articles</span> that can help
                            </h2>
                            <Row>
                                <CustomCards
                                    image={docFileImage}
                                    // content={`How Much Does a ${view_single_policy?.policy_name} Cost?`}
                                    content={
                                        'What is liability insurance and how it works?'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.cnbctv18.com/personal-finance/what-is-liability-insurance-and-how-it-works-types-benefits-explained-15995941.htm"
                                />
                                <CustomCards
                                    image={businessesInsuranceImage}
                                    content={
                                        'The ignored need of insurance by small businesses.'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.livemint.com/money/personal-finance/the-ignored-need-of-insurance-by-small-businesses-11670857104709.html"
                                />
                                <CustomCards
                                    image={cyberLinkImage}
                                    content={
                                        'Why cyber-security needs to be a strategy in the infinite corporate game?'
                                    }
                                    buttonImage={ArrowBtn}
                                    link="https://www.forbesindia.com/article/iim-calcutta/why-cybersecurity-needs-to-be-a-strategy-in-the-infinite-corpo-rate-game/80589/1"
                                />
                            </Row>
                        </Container>
                    </section>
                </div>
            )}
        </>
    );
};

export default BusinessOwnerPolicy;

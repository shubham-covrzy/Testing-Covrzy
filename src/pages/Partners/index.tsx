import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import CustomButton from '../../common/Buttons/CustomButton'
// import MainBanner from '../../common/MainBanner'
// import secondImg from '../../assets/images/second-img.png';
// import thirdImg from '../../assets/images/third-img.png';
// import fourImg from '../../assets/images/four-img.png';

import { useNavigate } from 'react-router-dom';
import MetaTags from '../../common/MetaTag';
import "./index.css";



import Featurepartner from './FeaturePartner';
import ProductPartner from './ProductPartner';
import IndustryPartner from './IndustryPartner';
import PartnerFaq from './PartnerFaq';
import { faqData } from './data';
import CaseStudyPartner from './CaseStudyPartner';
import TestimonialPartner from './TestimonialPartner';
import PartnerWorks from './PartnerWorks';
import PartnerHero from './PartnerHero';
import ConnectPartnerForm from './ConnectPartnerForm';

import CustomMsg from './CustomMsg';
import CompaniesThrustUs from './CompaniesThrustUs';






const Partners = () => {

    const [connectPartnerForm, setConnectPartnerForm] =
        useState<boolean>(false);
    const [closeCustomMsg, setCloseCustomMsg] = useState<string>("");
    const closeCustomMsgFun = () => {
        setCloseCustomMsg(prev => "");
    }
    const openCustomMsgSuccessFun = () => {
        setCloseCustomMsg(prev => "success");
    }
    const openCustomMsgFailFun = () => {
        setCloseCustomMsg(prev => "fail");
    }
    const handleOpenCustomQuoteModal = () => {
        setConnectPartnerForm(true);
    };

    const handleCloseCustomQuoteModal = () => {
        setConnectPartnerForm(false);
    };

    const navigate = useNavigate();
    const [showRequestCallbackModal, setShowRequestCallbackModal] =
        useState(false);

    const handleOpenRequestCallbackModal = () =>
        setShowRequestCallbackModal(true);

    const handleCloseRequestCallbackModal = () =>
        setShowRequestCallbackModal(false);


    return (
        <>
            <MetaTags
                title="Partner"
                description=""
                url="https://covrzy.com/partners"
                canonical="https://covrzy.com/partners"
            />
            {
                closeCustomMsg === "success" ? (<CustomMsg msg="Thanks for sharing your details. We'll reach out to you soon" color="#16a34a" closeCustomMsgFun={closeCustomMsgFun} />) : closeCustomMsg === "fail" ? ((<CustomMsg msg="Something went Wrong, Can you try again !" color="#ef4444" closeCustomMsgFun={closeCustomMsgFun} />)) : ""
            }
            <PartnerHero handleOpenCustomQuoteModal={handleOpenCustomQuoteModal} />

            <CompaniesThrustUs />

            <Featurepartner handleOpenCustomQuoteModal={handleOpenCustomQuoteModal} />
            <ProductPartner />
            <IndustryPartner />
            <PartnerWorks />
            {/* <TestimonialPartner />
            <CaseStudyPartner /> */}
            {/* <PartnerFaq faqData={faqData} /> */}
            {/* <SubBanner
                bgImage={coverge}
                whiteTitle="Partner "
                orangeTitle="with us"
                content={`<p>Share a few details about your business and we will get back to you <br/> within 48 hours.</p>`}
                buttonTitle={
                    <>
                        <TelephoneInbound />  Request Callback
                    </>
                }
                onClick={handleOpenRequestCallbackModal}
            /> */}
            {/* <RequestCallbackFormModal
                show={showRequestCallbackModal}
                onHide={handleCloseRequestCallbackModal}
            /> */}
            <ConnectPartnerForm
                show={connectPartnerForm}
                setShowModal={setConnectPartnerForm}
                openCustomMsgFailFun={openCustomMsgFailFun}
                openCustomMsgSuccessFun={openCustomMsgSuccessFun}

            />
        </>
    );
};

export default Partners;

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import MetaTags from '../../common/MetaTag';
import "./index.css";

import CoBrandingHero from './CoBrandingHero';
import ConnectPartnerForm from './ConnectPartnerForm';

import CustomMsg from './CustomMsg';
import CompaniesThrustUs from './CompaniesThrustUs';
import BenefitsCobrand from './BenefitsCobrand';

import loader from '../../assets/images/loader.gif';


import CobrandWhyUs from './CobrandWhyUs';
import { APIResponse, CobrandData, InsurerData } from './data';
import InsurerWeWorkWith from './InsurerWeWorkWith';
import FeatureCobrand from './FeatureCobrand';
import CoBrandFooter from './CoBrandFooter';


const CoBranding = () => {

    const [connectPartnerForm, setConnectPartnerForm] =
        useState<boolean>(false);
    const [closeCustomMsg, setCloseCustomMsg] = useState<string>("");
    useState(false);
    const navigate = useNavigate();

    const { slug } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const apiToken = process.env.REACT_APP_BLOG_TOKEN_KEY;

    const [coBrandData, setCoBrandData] = useState<CobrandData[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BLOG_BASE_URL}/api/cobrandings?populate[companylogo]=*&populate[benefits][populate]=*&populate[companiesthrustus][populate]=*&populate[offers][populate]=*&filters[slug][$eq]=${slug}`, {
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data: APIResponse = await response.json();
                if (data.data.length === 0) {
                    // If no data is found for the slug, navigate to the home page
                    navigate('/');
                } else {
                    setCoBrandData(data.data);
                }
                // setCoBrandData(data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, apiToken, navigate]);


    if (error) {
        return <div className='cobrand-error'>Something went wrong , can you try again</div>;
    }


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

    // console.log(JSON.stringify(coBrandData[0].metadescription) + "--------------------------")
    return (
        <>
            {loading ? (
                <div style={{ height: "calc(100vh - 80px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={loader} alt="loader" style={{ width: '14%' }} />
                </div>
            ) : (
                <>

                    <MetaTags
                        title={coBrandData[0].metatitle || "Cobranding Page"}
                        description={coBrandData[0].metadescription || "Discover how our cobrands are helping businesses in India compare insurance quotes and complete purchases online. Join our trusted network for seamless collaboration and improved customer satisfaction."}
                        keywords={coBrandData[0].metakeywords || "Partnership , Cobranding, Covrzy Partner, Covrzy Partnership"}
                        url={`https://covrzy.com/partners/${slug}`}
                        canonical={`https://covrzy.com/partners/${slug}`}
                    />
                    {
                        closeCustomMsg === "success" ? (<CustomMsg msg="Thanks for sharing your details. We'll reach out to you soon" color="#16a34a" closeCustomMsgFun={closeCustomMsgFun} />) : closeCustomMsg === "fail" ? ((<CustomMsg msg="Something went Wrong, Can you try again !" color="#ef4444" closeCustomMsgFun={closeCustomMsgFun} />)) : ""
                    }

                    <CoBrandingHero
                        handleOpenCustomQuoteModal={handleOpenCustomQuoteModal}
                        mainheading={coBrandData[0]?.mainheading}
                        mainpara={coBrandData[0]?.mainpara}
                        mainbenefits={coBrandData[0]?.mainbenefits}
                        mainimg={coBrandData[0]?.companylogo}
                    />

                    <CompaniesThrustUs companiesthrustus={coBrandData[0]?.companiesthrustus} />

                    <BenefitsCobrand benefits={coBrandData[0]?.benefits} />

                    <FeatureCobrand handleOpenCustomQuoteModal={handleOpenCustomQuoteModal} offerlistHead={coBrandData[0]?.offerlistHead} offers={coBrandData[0]?.offers} />

                    <CobrandWhyUs />

                    <InsurerWeWorkWith InsurerData={InsurerData} />

                    <CoBrandFooter handleOpenCustomQuoteModal={handleOpenCustomQuoteModal} />

                    <ConnectPartnerForm
                        show={connectPartnerForm}
                        setShowModal={setConnectPartnerForm}
                        openCustomMsgFailFun={openCustomMsgFailFun}
                        openCustomMsgSuccessFun={openCustomMsgSuccessFun}

                    />
                </>
            )}
        </>
    );
};

export default CoBranding;

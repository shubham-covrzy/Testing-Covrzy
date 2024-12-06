import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
// import LinkButton from "../../common/Buttons/LinkButton";
import OrangeButton from '../../common/Buttons/OrangeButton';
import OutlineButton from '../../common/Buttons/OutlineButton';
import StartupPackage from '../../assets/images/startup-package.svg';
import Liability from '../../assets/images/liability.svg';
import BMI from '../../assets/images/bmi.svg';
import Policy from '../../assets/images/business-owners-policy.svg';
import Tech from '../../assets/images/tech-errors-Insurance.svg';
import Commercial from '../../assets/images/commercial-crime.svg';
import StartupPackageOrange from '../../assets/images/startup-package-o.svg';
import LiabilityOrange from '../../assets/images/liability-o.svg';
import BMIOrange from '../../assets/images/bmi-o.svg';
import PolicyOrange from '../../assets/images/business-policy-o.svg';
import TechOrange from '../../assets/images/tech-errors-o.svg';
import CommercialOrange from '../../assets/images/commercial-o.svg';
import CheckFill from '../../assets/images/CheckFill.svg';
import Cards from './Cards';
import { useState } from 'react';
import CanvasSideBar from '../../common/CanvasSideBar';

const PackageDetail = () => {
    const [packageStatus, setPackageStatus] = useState(false);
    const [packageCount, setPackageCount] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="pi-step-form" id="pi-step-two">
                <h2 className="pi-content-title">Get started or Buy Now</h2>
                <div className="pi-filter-bar">
                    <OutlineButton buttonName="Startups" />
                    <OutlineButton buttonName="Real Estate" />
                    <OutlineButton buttonName="Construction" />
                    <OutlineButton buttonName="Retail" />
                    <OutlineButton buttonName="Law Firms" />
                    <OutlineButton buttonName="Restaurants" />
                    <OutlineButton buttonName="Cannabis" />
                </div>
                <div className="pi-card-wrp">
                    <Row>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(1);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Startup Package"
                                image={StartupPackage}
                                hoverImage={StartupPackageOrange}
                                content="The all-in-one package custom designed to protect Startups. From executive decisions, and product errors, to hackers stealing PII, workplace harassment, and discrimination lawsuits."
                                buttonTitle={
                                    packageStatus && packageCount === 1
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(2);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Lawyers Professional Liability"
                                image={Liability}
                                hoverImage={LiabilityOrange}
                                content="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."
                                buttonTitle={
                                    packageStatus && packageCount === 2
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(3);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Business Management Insurance"
                                image={BMI}
                                hoverImage={BMIOrange}
                                content="A one-two punch of insurance happiness. Your executives want their assets protected, and your company needs protection from alleged sexual harassment or discrimination suits."
                                buttonTitle={
                                    packageStatus && packageCount === 3
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(4);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Business Owners Policy"
                                image={Policy}
                                hoverImage={PolicyOrange}
                                content="Protects business against claims due to a failure of your technology or service. It covers the costs of lawsuits and more."
                                buttonTitle={
                                    packageStatus && packageCount === 4
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(5);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Tech Errors & Omissions Insurance"
                                image={Tech}
                                hoverImage={TechOrange}
                                content="Protects business against claims due to a failure of your technology or service. It covers the costs of lawsuits and more."
                                buttonTitle={
                                    packageStatus && packageCount === 5
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                        <Col lg={6}>
                            <Cards
                                onClick={() => {
                                    setPackageStatus(!packageStatus);
                                    setPackageCount(6);
                                }}
                                packageStatus={packageStatus}
                                onLinkClick={handleShow}
                                title="Commercial Crime"
                                image={Commercial}
                                hoverImage={CommercialOrange}
                                content="Protects business against claims due to a failure of your technology or service. It covers the costs of lawsuits and more."
                                buttonTitle={
                                    packageStatus && packageCount === 6
                                        ? 'Remove'
                                        : 'Add Coverage'
                                }
                            />
                        </Col>
                    </Row>
                </div>
                <div className="pi-step-btn">
                    <CustomButton buttonTitle="Back" />
                    <OrangeButton buttonName="Save and Continue" />
                </div>
                {show && (
                    <CanvasSideBar
                        show={show}
                        image={StartupPackage}
                        checkImage={CheckFill}
                        onHide={handleClose}
                    />
                )}
            </div>
        </>
    );
};
export default PackageDetail;

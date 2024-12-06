import { Col, Container, Row } from "react-bootstrap";
import partnerfeature from "../../assets/images/partnerfeature.png"
import PartnerFeatureLogo1 from '../../assets/images/partnerFeaturelogo1.png';
import PartnerFeatureLogo2 from '../../assets/images/partnerFeaturelogo2.png';
import PartnerFeatureLogo3 from '../../assets/images/partnerFeaturelogo3.png';
import PartnerFeatureLogo4 from '../../assets/images/partnerFeaturelogo4.png';
import PartnerFeatureLogo5 from '../../assets/images/partnerFeaturelogo5.png';
type FeaturePartnerProps = {
    handleOpenCustomQuoteModal: () => void;
}

const Featurepartner = ({ handleOpenCustomQuoteModal }: FeaturePartnerProps) => {
    return (
        <section className="featurepartner">
            <Container>
                <Row>
                    <Col md={6} sm={12} className="featurepartnerleft">
                        <div className="partnerFeatureContWrap">
                            <img src={partnerfeature} alt="Partner feature imgs" />
                            <h2>Drive Growth with Insurance
                                Solutions Your Customers
                                Can Trust</h2>
                            <button onClick={handleOpenCustomQuoteModal}>Explore Partnerships</button>
                        </div>
                    </Col>
                    <Col md={6} sm={12} className="featurepartnerright">
                        <h2 className="featureheadingmd">Drive Growth with Insurance
                            Solutions Your Customers
                            Can Trust</h2>
                        <div className="partnerFeatureListWrap">
                            <div className="partnerFeatureList">
                                <div className="partnerfeatureimg">
                                    <img src={PartnerFeatureLogo1} alt="Drive Growth with us" />
                                </div>
                                <div className="partnerfeaturetext">
                                    <div className="partnerfeaturehead">
                                        Embedded insurance solutions
                                    </div>
                                    <div className="partnerfeaturepara">
                                        Go live quickly with our plug & play insurance solutions.
                                    </div>
                                </div>
                            </div>
                            <div className="partnerFeatureList">
                                <div className="partnerfeatureimg">
                                    <img src={PartnerFeatureLogo2} alt="icon" />
                                </div>
                                <div className="partnerfeaturetext">
                                    <div className="partnerfeaturehead">
                                        Tailor-made plans catered for your business needs
                                    </div>
                                    <div className="partnerfeaturepara">
                                        You name it, we’ll create it. Get insurance solutions that cater specifically to your customers.
                                    </div>
                                </div>
                            </div>
                            <div className="partnerFeatureList">
                                <div className="partnerfeatureimg">
                                    <img src={PartnerFeatureLogo3} alt="icon" />
                                </div>
                                <div className="partnerfeaturetext">
                                    <div className="partnerfeaturehead">
                                        Phenomenal customer service
                                    </div>
                                    <div className="partnerfeaturepara">
                                        A fully digital claims process with a dedicated manager to guide your customers at every step.
                                    </div>
                                </div>
                            </div>
                            <div className="partnerFeatureList">
                                <div className="partnerfeatureimg">
                                    <img src={PartnerFeatureLogo4} alt="icon" />
                                </div>
                                <div className="partnerfeaturetext">
                                    <div className="partnerfeaturehead">
                                        Increased revenue opportunities
                                    </div>
                                    <div className="partnerfeaturepara">
                                        Boost your revenue with multiple insurance solutions for your customers at no additional cost.
                                    </div>
                                </div>
                            </div>
                            <div className="partnerFeatureList">
                                <div className="partnerfeatureimg">
                                    <img src={PartnerFeatureLogo5} alt="icon" />
                                </div>
                                <div className="partnerfeaturetext">
                                    <div className="partnerfeaturehead">
                                        Boost Customer Engagement and Loyalty
                                    </div>
                                    <div className="partnerfeaturepara">
                                        Improve customer engagement and loyalty by offering risk-mitigation solutions along with your products and services.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default Featurepartner;
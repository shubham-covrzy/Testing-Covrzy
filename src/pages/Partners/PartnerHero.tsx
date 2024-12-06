import { Col, Container, Row } from "react-bootstrap"
import Hero from '../../assets/images/partnerhero.png'
import Herogif from '../../assets/images/partnerpagehero.gif'
import icon1 from '../../assets/images/partnerheroicon1.png';
import icon2 from '../../assets/images/partnerheroicon2.png';
import icon3 from '../../assets/images/partnerheroicon3.png';

type PartnerHeroProps = {
    handleOpenCustomQuoteModal: () => void;
}
const PartnerHero = ({ handleOpenCustomQuoteModal }: PartnerHeroProps) => {
    return (
        <section className="partnerhero">
            <Container>
                <Row>
                    <Col>
                        <div className="partnerherowrap">
                            <div className="partnerheaders">
                                <h1>
                                    Plug & Play Insurance Solutions
                                    Customised For Your Business
                                </h1>
                                <p>Launch insurance for your customers seamlessly with our easy to
                                    integrate APIs</p>
                                <ul>
                                    <li><img src={icon1} alt="" /> Seamless Tech Integration</li>
                                    <li><img src={icon2} alt="" /> Quick Claims Processing</li>
                                    <li><img src={icon3} alt="" /> Customizable Plan</li>
                                </ul>
                                <button onClick={handleOpenCustomQuoteModal}>
                                    Partner with Us
                                </button>
                            </div>
                            <div className="partnerheroimg">
                                <img className="partnerheroimgcont" src={Herogif} alt="Parntership Page" />

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PartnerHero;
import { Col, Container, Row } from "react-bootstrap"
import left from '../../assets/images/partnersWorksLeft.png';
import right from '../../assets/images/partnersWorksRight.png';
import center from '../../assets/images/partnersWorksMain.gif';
import logo from '../../assets/images/partnersWorks.png';
import flow from '../../assets/images/partnersWorksFlow.png';
import flowmob from '../../assets/images/partnerflowmob.png';
const PartnerWorks = () => {
    return (
        <section className="partnerworks">
            <Container>
                <Row>
                    <Col>
                        <div className="partnerworkswrap">
                            <div className="partnerworkshead">
                                <h2 className="partnerworkHead">How Partnership Works</h2>
                                <p className="partnerworkspara">Sit back and relax! <span > Team Covrzy will take care Of everything you and your customers need</span></p>
                            </div>
                            <div className="partnerworkspicturewrap">
                                <div className="partnerworkspictures">
                                    <div className="partnerworksleft">
                                        <img src={left} alt="" />
                                    </div>
                                    <div className="partnerworkscetner">
                                        <img src={center} alt="" />
                                    </div>
                                    <div className="partnerworksright">
                                        <img src={right} alt="" />
                                    </div>
                                </div>
                                <img className="partnewworklogo" src={logo} alt="" />
                                <div className="partnerworkdotted"></div>
                            </div>
                            <div className="partnerworksflow">
                                <div className="partnershippage">
                                    Team Covrzy will handle it all
                                </div>
                                <div className="partnerflowimg">
                                    <img src={flow} alt="Partnership works flow" />
                                </div>
                                <div className="parterflowimgmob">
                                    <img src={flowmob} alt="Partnership works flow" />
                                </div>

                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section >
    )
}
export default PartnerWorks;
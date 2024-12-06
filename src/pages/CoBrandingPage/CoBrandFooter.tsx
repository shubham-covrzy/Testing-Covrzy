import { Col, Container, Row } from 'react-bootstrap'
import FooterImg from '../../assets/images/cobrandingpage/cobrandfooter.png';
type PropsCobrandFooter = {
    handleOpenCustomQuoteModal: () => void;
}
const CoBrandFooter = ({ handleOpenCustomQuoteModal }: PropsCobrandFooter) => {
    return (
        <div className='cobrandfooter'>
            <Container>
                <Row>
                    <Col>
                        <div className="cobrandfooter-left">
                            <div className="cobrandfooter-left-head">
                                Avail comprehensive insurance benefits for your business in 5 minutes
                            </div>
                            <div className="cobrandfooter-mid">
                                <div className="cobrandfooter-mid-head">
                                    Get a free consultation from IRDAI certified advisors
                                </div>
                                <div className="cobrandfooter-mid-para">
                                    We will understand the special needs of your business and help you purchase the right plan
                                </div>
                            </div>
                            <div className="cobrandfooter-down">
                                <button onClick={handleOpenCustomQuoteModal} >Request Call Back</button>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="cobrandfooter-right">
                            <img src={FooterImg} alt="Cobrand Partners" />
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default CoBrandFooter
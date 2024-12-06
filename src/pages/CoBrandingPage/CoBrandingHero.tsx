import { Col, Container, Row } from "react-bootstrap"

import Heroimg from '../../assets/images/cobrandingpage/cobrandheroimg.png';
import Logo from '../../assets/images/cobrandingpage/logo.png'
import { Image } from "./data";

type PartnerHeroProps = {
    handleOpenCustomQuoteModal: () => void;
    mainheading: string;
    mainpara: string;
    mainbenefits: string;
    mainimg: Image;
}

const CoBrandingHero = ({ handleOpenCustomQuoteModal, mainheading, mainpara, mainbenefits, mainimg }: PartnerHeroProps) => {
    return (
        <section className="cobrandhero">
            <Container>
                <Row>
                    <Col>
                        <div className="cobrandherowrap">
                            <div className="cobrandheaders">
                                <h1>
                                    {mainheading || "Exclusive Benefits"}
                                </h1>
                                <p>{mainpara || "Comprehensive employee health benefits at discounted prices"}</p>
                                <p className="cobrandbenefits">{mainbenefits || "Benefits worth Thousands"}</p>
                                <button onClick={handleOpenCustomQuoteModal}>
                                    Avail Now
                                </button>
                            </div>
                            <div className="cobrandheroimg">
                                <img className="cobrandheroimgcont" src={Heroimg} alt="Parntership Page" />
                                <div className="cobrandimgcont">
                                    <div className="cobrandlogo">
                                        <img src={`${process.env.REACT_APP_BLOG_BASE_URL}${mainimg?.url}`} alt="Cobrand" />
                                    </div>
                                    <div className="cobrand-merger">
                                        X
                                    </div>
                                    <div className="cobrandcovrzy">
                                        <img src={Logo} alt="Covrzy" />
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

export default CoBrandingHero;
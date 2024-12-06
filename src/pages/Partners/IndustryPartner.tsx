import { Container, Row } from "react-bootstrap"
import Partnershipicon1 from "../../assets/images/partnershipicon7.png"
import Partnershipicon2 from "../../assets/images/partnershipicon8.png"
import Partnershipicon3 from "../../assets/images/partnershipicon9.png"
import Partnershipicon4 from "../../assets/images/partnershipicon10.png"
import { Col } from "react-bootstrap"
const IndustryPartner = () => {
    const industryIcons = [
        { img: Partnershipicon1, alt: "E-Commerce", para: "E-Commerce", width: "100", height: "200" },
        { img: Partnershipicon2, alt: "Logistics", para: "Logistics", width: "100", height: "200" },
        { img: Partnershipicon3, alt: "Travel", para: "Travel", width: "100", height: "200" },
        { img: Partnershipicon4, alt: "Fintech & more", para: "Fintech & more", width: "100", height: "200" },
    ]
    return (
        <section className="industrypartner">
            <Container>
                <h2 className="industryPartnerHead">Industries We Support</h2>
                <h3 className="industryPartnerPara">Tailored insurance solutions for diverse industries, ensuring seamless protection for your clients</h3>
                <Row className=" industryPartnerRow">
                    {
                        industryIcons.map((item, idx) => {
                            return (
                                <Col md={3} sm={6} className="industryPartnerItem" key={idx}>
                                    <img src={item.img} alt={item.alt} style={{
                                        height: idx === 1 ? "45px" : idx === 2 ? "50px" : idx === 3 ? "45px" : ""
                                    }} />
                                    <p>{item.para}</p>
                                </Col>
                            )
                        })
                    }

                </Row>
            </Container>
        </section>
    )
}

export default IndustryPartner;
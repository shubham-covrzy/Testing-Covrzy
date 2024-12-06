import { Container } from "react-bootstrap";
import { Benefit } from "./data";


interface PropsBenefitsCobrand {
    benefits: Benefit[];
}
const BenefitsCobrand = ({ benefits }: PropsBenefitsCobrand) => {

    return (
        <section className="benefitsCobrand">
            <Container>
                <h2 className="benefitsCobrandHead">Exclusive Benefits Too Good to Decline</h2>
                <h3 className="benefitsCobrandPara">500+ businesses insured by Covrzy
                </h3>

                <div className="benefitsCobrandCont">
                    {
                        benefits.length > 0 ?
                            benefits.map((data, idx) => {
                                return (
                                    <div key={`benefitsCobrandCont-${data.id}`} className="benefitsCobrandItem">
                                        {data.tag && (<div className="benefitstag">
                                            {data.tag}</div>)}
                                        <img src={`${process.env.REACT_APP_BLOG_BASE_URL}${data.img.url}`} alt={data.img.alternativeText} />
                                        <p>{data.text}</p>
                                    </div>
                                )
                            }) :
                            (<div>No Records Found</div>)
                    }
                </div>

            </Container>
        </section>
    )
}
export default BenefitsCobrand;
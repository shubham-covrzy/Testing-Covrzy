import { Col, Form, Nav } from 'react-bootstrap';

const RatingCards = (props: any) => {
    return (
        <>
            <Col md={4}>
                <div className="rating-box">
                    <span>
                        <img src={props?.image} alt="" />
                        <img src={props?.image} alt="" />
                        <img src={props?.image} alt="" />
                        <img src={props?.image} alt="" />
                        <img src={props?.image} alt="" />
                    </span>
                    <p>{props?.content}</p>
                    <Nav.Link href="#">{props?.linkTitle}</Nav.Link>
                    <Form.Label>{props?.title}</Form.Label>
                </div>
            </Col>
        </>
    );
};

export default RatingCards;

import { Col } from 'react-bootstrap';

const Cards = (props: any) => {
    return (
        <>
            <Col md={6}>
                <div className="get-cards">
                    <img src={props?.image} alt="" />
                    <h3>{props?.title}</h3>
                    <p>{props?.content}</p>
                </div>
            </Col>
        </>
    );
};

export default Cards;

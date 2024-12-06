import { Col } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';

const Cards = (props: any) => {
    return (
        <>
            <Col lg={4} md={6} sm={6}>
                <div className="startup-card-box">
                    <span>
                        <img src={props?.image} alt="" width={'90%'} />
                    </span>
                    <h2 className="mb-2">{props?.title}</h2>
                    <p>{props?.description}</p>
                    <CustomButton
                        buttonTitle="View Details"
                        onClick={props?.onClick}
                    />
                </div>
            </Col>
        </>
    );
};

export default Cards;

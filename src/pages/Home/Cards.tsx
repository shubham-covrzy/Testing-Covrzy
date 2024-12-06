import { Col } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
const Cards = (props: any) => {
    return (
        <>
            <Col lg={4} md={6}>
                <div className="packages-box">
                    <span>
                        {props?.image && (
                            <img src={props?.image} width="80%" alt="" />
                        )}
                    </span>
                    <h3>{props?.title}</h3>
                    <p>{props?.content}</p>
                    <CustomButton
                        buttonTitle={props?.buttonTitle}
                        onClick={props?.onClick}
                    />
                </div>
            </Col>
        </>
    );
};

export default Cards;

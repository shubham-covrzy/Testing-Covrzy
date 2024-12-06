import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomButton from '../../common/Buttons/CustomButton';
import CustomQuoteModal from '../../components/CustomQuoteModal'; // Update the path as necessary

const MainBanner = (props: any) => {
    const [showModal, setShowModal] = useState(false);

    // Handles showing the modal or redirecting based on the condition
    const handleButtonClick = () => {
        if (props.subTitle === 'Small Business') {
            window.location.href = 'https://sme.covrzy.com/fire-insurance'; // Redirect to Google
        } else {
            setShowModal(true); // Show the modal
        }
    };

    return (
        <>
            <section className="hero-banner pb-0">
                <Container>
                    <Row className="align-items-center">
                        <Col md={12}>
                            <div className="hero-info text-center">
                                {props?.starMessage && (
                                    <span>
                                        <i
                                            className="fa fa-star"
                                            aria-hidden="true"
                                        ></i>{' '}
                                        {props?.starMessage}
                                    </span>
                                )}
                                {props?.mainTitle && (
                                    <h1>{props?.mainTitle}</h1>
                                )}
                                {props?.subTitle && <h1>{props?.subTitle}</h1>}
                                {props?.content && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: props?.content,
                                        }}
                                    ></div>
                                )}
                                <CustomButton
                                    buttonTitle="GET A QUOTE"
                                    onClick={handleButtonClick} // Handle button click
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Custom Quote Modal */}
            <CustomQuoteModal
                show={showModal}
                setShowModal={setShowModal}
                source={props.subTitle}
            />
        </>
    );
};

export default MainBanner;

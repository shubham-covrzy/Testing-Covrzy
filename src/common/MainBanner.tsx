import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomButton from './Buttons/CustomButton';
import CustomQuoteModal from '../components/CustomQuoteModal';

const MainBanner = (props: any) => {
    const [showModal, setShowModal] = useState(false);
    // const redirectToCovrzy = [
    //     'Commercial General Liability Insurance',
    //     'Directors and Officers Liability Insurance',
    //     'Cyber  Risk Insurance ',
    // ];
    const redirectToSME = ['Fire & Other Perils', 'Theft/Burglary', 'Property Insurance'];
    
    const handleShow = () => {
        // if (redirectToCovrzy.includes(props?.mainTitle)) {
        //     // Redirect to https://start.covrzy.com/
        //     window.location.href = 'https://start.covrzy.com/';
        // } 
        if (redirectToSME.includes(props?.mainTitle)) {
            // Redirect to https://sme.covrzy.com/
            window.location.href = 'https://sme.covrzy.com/fire-insurance';
        } else {
            // Show the modal
            setShowModal(true);
        }
    };

    return (
        <>
            <section className="hero-banner">
                <Container>
                    <Row className="align-items-center">
                        <Col md={props?.col ? props?.col : 6}>
                            <div className="hero-info">
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
                                {/* This section is only for blog page author section */}
                                {props?.author && (
                                    <h5 style={{margin:"10px"}}>By: {props?.author}</h5>
                                )}
                                 {props?.blogdate && (
                                    <h5 style={{ margin: "10px", fontSize: "13px" }}>
                                        {new Date(props.blogdate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        })}
                                    </h5>
                                    )}
                                {/* This section is only for blog page author section */}
                                {props?.subTitle && <h2>{props?.subTitle}</h2>}
                                {props?.content && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: props?.content,
                                        }}
                                    ></div>
                                )}
                                {props?.showbutton && (
                                    <CustomButton
                                        buttonTitle="GET A QUOTE"
                                        onClick={handleShow}
                                    />
                                )}
                            </div>
                        </Col>
                        <Col md={6}>
                            {props?.image && (
                                <img
                                    width={props.imgWidth}
                                    height={props.imgHeight}
                                    alt=""
                                    src={props?.image}
                                    className="img-fluid"
                                    loading="lazy"
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>

            <CustomQuoteModal
                show={showModal}
                setShowModal={setShowModal}
                source={props?.mainTitle}
            />
        </>
    );
};

export default MainBanner;

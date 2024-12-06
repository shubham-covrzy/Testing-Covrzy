import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';

const CustomCards = (props: any) => {
    return (
        <>
            <Col md={4} sm={6}>
                <div className="article-box">
                    <img src={props?.image} className="img-fluid" alt="" />
                    <h3>{props?.content}</h3>
                    <a href={props?.link} target="_blank" rel="noreferrer">
                        <div className="arrowbtn">
                            <Button onClick={props?.click}>
                                <img src={props?.buttonImage} alt="" />
                            </Button>
                        </div>
                    </a>
                </div>
            </Col>
        </>
    );
};

export default CustomCards;



import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { caseStudies } from './data'
import { Container, Row, Col } from 'react-bootstrap'
import RightArrow from "../../assets/images/rightarrowproduct.png";
import { ChevronRight } from 'react-bootstrap-icons';
import { ChevronLeft } from 'react-bootstrap-icons';


export default function CaseStudyPartner() {
    const [currIdx, setCurrIdx] = useState(0);
    const prevIdx = () => {
        if (currIdx === 0) return;
        setCurrIdx(prev => prev - 1);
    }
    const nextIdx = () => {
        if (currIdx === caseStudies.length - 1) return;
        setCurrIdx(prev => prev + 1);
    }
    return (
        <section className="caseStudyPartner">
            <Container fluid="md">
                <Row>
                    <Col>
                        <h2 className="caseStudyHead">Case Studies for you</h2>
                        <div>
                            {caseStudies.slice(currIdx, currIdx + 1).map((study, index: number) => (
                                <div key={index} className="caseStudyWrap">
                                    <div className="caseStudyLeft">
                                        <h3 className="caseStudyLeftHead">
                                            {study.title}
                                        </h3>
                                        <p className="caseStudyLeftPara">
                                            {study.description}
                                        </p>
                                        <div className="caseStudyLeftReadMore">
                                            <button >
                                                Read more
                                                <img src={RightArrow} alt="read more" />
                                            </button>
                                        </div>

                                    </div>
                                    <div className="caseStudyRight">
                                        <img
                                            src={study.image}
                                            alt="Case study illustration"
                                            className=""
                                        />
                                        <div className="caseStudyDetails">
                                            <span>{study.date}</span>
                                            <span>•</span>
                                            <span>{study.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="caseStudyIndex">
                            <div
                                className={`caseStudyIndexIcoon ${currIdx === 0 ? 'disabled' : ''}`}
                                onClick={prevIdx}
                            >
                                <ChevronLeft />
                            </div>
                            <span>{currIdx + 1}/{caseStudies.length}</span>
                            <div
                                className={`caseStudyIndexIcoon ${currIdx === caseStudies.length - 1 ? 'disabled' : ''}`}
                                onClick={nextIdx}
                            >
                                <ChevronRight />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}


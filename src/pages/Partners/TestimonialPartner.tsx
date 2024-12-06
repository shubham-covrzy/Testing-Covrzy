import { useState } from "react";
import { Col } from "react-bootstrap"
import { Container, Row } from "react-bootstrap"
import { testimonials } from "./data";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
const TestimonialPartner = () => {
    const [currIdx, setCurrIdx] = useState(0);
    const prevIdx = () => {
        if (currIdx === 0) return;
        setCurrIdx(prev => prev - 1);
    }
    const nextIdx = () => {
        if (currIdx === testimonials.length - 1) return;
        setCurrIdx(prev => prev + 1);
    }
    return (
        <section className="testinomialPartner">
            <Container fluid="md">
                <Row>
                    <Col>
                        <h2 className="testimonialHead">What Our Existing Partner Say</h2>
                        <div>
                            {testimonials.slice(currIdx, currIdx + 1).map((currTestimonail, index: number) => (
                                <div key={index} className="testimonialWrap">
                                    <div className="testimonialLeft">
                                        <img className="testimonialCompanyLogo" src={currTestimonail?.logo} alt={currTestimonail?.alt} />
                                        <h3 className="testimonialcompanyname">{currTestimonail?.companyName}</h3>
                                        <h3 className="testimonialusername">{currTestimonail?.userName}</h3>
                                        <p className="testimonialdesignation">{currTestimonail?.designation}</p>
                                        <span className="testimonialrating">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`testimonailStarIcon ${i < Math.floor(currTestimonail?.rating)
                                                        ? "filled"
                                                        : i < currTestimonail?.rating
                                                            ? "half-filled"
                                                            : "empty"
                                                        }`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="testimonialRight">

                                        <p className="testimonailMsg" >
                                            <svg className="testimonialMsgleft" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M26.2821 12.0305C26.4432 9.97783 27.2521 8.05855 28.5757 6.58844C29.8993 5.11833 31.6589 4.18497 33.5647 3.94195C35.4706 3.69892 37.4093 4.16072 39.0617 5.25134C40.7142 6.34196 41.982 7.99643 42.6566 9.94251C43.3311 11.8886 43.3722 14.0103 42.7731 15.9586C42.174 17.9069 40.9703 19.5656 39.3602 20.6619C37.75 21.7581 35.8294 22.2265 33.9142 21.9901C31.9991 21.7537 30.2035 20.8264 28.823 19.361C29.2195 22.4441 30.064 25.0532 31.2227 27.1291C33.1705 30.6256 36.0079 32.6366 39.2398 32.993C39.5596 33.0283 39.8557 33.1981 40.0629 33.4652C40.2702 33.7322 40.3715 34.0747 40.3448 34.4171C40.318 34.7595 40.1653 35.0739 39.9202 35.2911C39.6752 35.5083 39.3578 35.6105 39.038 35.5752C34.9427 35.1236 31.4484 32.5531 29.1507 28.4295C26.8634 24.3278 25.7603 18.7081 26.2821 12.0305Z" fill="white" />
                                                <path d="M2.163 9.3703C2.32404 7.31767 3.13293 5.39839 4.45656 3.92828C5.7802 2.45817 7.53971 1.52481 9.44558 1.28179C11.3515 1.03877 13.2901 1.50056 14.9426 2.59118C16.5951 3.6818 17.8629 5.33628 18.5375 7.28236C19.212 9.22844 19.2531 11.3502 18.654 13.2985C18.0548 15.2467 16.8512 16.9055 15.241 18.0017C13.6309 19.0979 11.7102 19.5664 9.79509 19.33C7.87993 19.0935 6.08439 18.1663 4.70391 16.7008C5.10032 19.784 5.94489 22.393 7.10358 24.469C9.05134 27.9654 11.8887 29.9764 15.1206 30.3328C15.4404 30.3681 15.7365 30.538 15.9438 30.805C16.151 31.0721 16.2524 31.4145 16.2256 31.7569C16.1989 32.0994 16.0462 32.4137 15.8011 32.6309C15.556 32.8481 15.2387 32.9503 14.9188 32.9151C10.8235 32.4634 7.32923 29.8929 5.03154 25.7693C2.74429 21.6677 1.64116 16.0479 2.163 9.3703Z" fill="white" />
                                            </svg>
                                            {currTestimonail?.testimonial}
                                            <svg className="testimonialMsgright" viewBox="0 0 44 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M41.7901 9.79022C41.6291 7.73759 40.8202 5.81832 39.4966 4.3482C38.1729 2.87809 36.4134 1.94473 34.5075 1.70171C32.6017 1.45869 30.663 1.92048 29.0105 3.01111C27.358 4.10173 26.0902 5.7562 25.4157 7.70228C24.7411 9.64836 24.7 11.7701 25.2992 13.7184C25.8983 15.6666 27.102 17.3254 28.7121 18.4216C30.3222 19.5179 32.2429 19.9863 34.158 19.7499C36.0732 19.5134 37.8687 18.5862 39.2492 17.1208C38.8528 20.2039 38.0082 22.813 36.8495 24.8889C34.9018 28.3853 32.0644 30.3964 28.8325 30.7528C28.5127 30.788 28.2166 30.9579 28.0093 31.2249C27.8021 31.492 27.7007 31.8344 27.7275 32.1769C27.7542 32.5193 27.907 32.8337 28.152 33.0509C28.3971 33.268 28.7145 33.3703 29.0343 33.335C33.1296 32.8834 36.6239 30.3129 38.9216 26.1892C41.2088 22.0876 42.312 16.4679 41.7901 9.79022Z" fill="white" />
                                                <path d="M17.671 12.4504C17.5099 10.3978 16.7011 8.47847 15.3774 7.00836C14.0538 5.53825 12.2943 4.60489 10.3884 4.36187C8.48253 4.11885 6.54385 4.58064 4.89138 5.67126C3.2389 6.76188 1.97108 8.41636 1.29653 10.3624C0.62198 12.3085 0.580891 14.4303 1.18003 16.3785C1.77916 18.3268 2.98282 19.9855 4.59295 21.0818C6.20308 22.178 8.12374 22.6465 10.0389 22.41C11.9541 22.1736 13.7496 21.2464 15.1301 19.7809C14.7337 22.8641 13.8891 25.4731 12.7304 27.5491C10.7826 31.0455 7.94524 33.0565 4.71337 33.4129C4.39354 33.4482 4.09744 33.618 3.8902 33.8851C3.68297 34.1522 3.58158 34.4946 3.60834 34.837C3.6351 35.1794 3.78782 35.4938 4.03289 35.711C4.27797 35.9282 4.59533 36.0304 4.91516 35.9951C9.01047 35.5435 12.5048 32.973 14.8024 28.8494C17.0897 24.7477 18.1928 19.128 17.671 12.4504Z" fill="white" />
                                            </svg>
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="testimonialIndex">
                            <div
                                className={`testimonialIndexIcoon ${currIdx === 0 ? 'disabled' : ''}`}
                                onClick={prevIdx}
                            >
                                <ChevronLeft />
                            </div>
                            <span>{currIdx + 1}/{testimonials.length}</span>
                            <div
                                className={`testimonialIndexIcoon ${currIdx === testimonials.length - 1 ? 'disabled' : ''}`}
                                onClick={nextIdx}
                            >
                                <ChevronRight />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default TestimonialPartner;
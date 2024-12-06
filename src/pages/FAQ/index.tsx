import React, { Fragment } from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import MainBanner from '../../common/MainBanner';
import SubBanner from '../../common/SubBanner';
import questionCoverge from '../../assets/images/coverage2.png';
import chat from '../../assets/images/chat.svg';
import { lunchBotHandler } from '../../Helper/commonFunction';
import MetaTags from '../../common/MetaTag';

const FAQPage = () => {
    return (
        <Fragment>
            <MetaTags
                title="FAQs"
                description="Find answers to frequently asked questions at Covrzy"
                url="https://covrzy.com/faqs"
                canonical="https://covrzy.com/faqs"
            />

            <div className="resource-top">
                <MainBanner mainTitle="FAQs" col="12" />
            </div>
            <div className="faqs-page">
                <Container>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>About Covrzy</Accordion.Header>
                            <Accordion.Body>
                                At Covrzy, we're simplifying business insurance
                                for small businesses and startups. Insurance is
                                a complicated subject in India, especially when
                                it comes to liability insurance, it gets further
                                complicated. Our platform recommends core coverages for small businesses and startups, enabling them to get tailor made quotations at the best price.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Who are the insurers we are working with?
                            </Accordion.Header>
                            <Accordion.Body>
                                We only collaborate with top-notch insurers in
                                the field. Our partnership process involves
                                extensive research, including an analysis of
                                their past claims settlement ratios and
                                financial stability.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                Which types of businesses do we offer insurance
                                coverage for?
                            </Accordion.Header>
                            <Accordion.Body>
                                We offer custom insurance solutions for all
                                types of small businesses and startups.
                                Recognizing that each business is unique, we
                                tailor our coverage to meet their specific
                                needs.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                Why should I buy from Covrzy?
                            </Accordion.Header>
                            <Accordion.Body>
                                With Covrzy, managing your policy is a breeze.
                                You can renew your policy as it comes due, start
                                a claim through our platform, have an expert
                                evaluate your coverage for potential gaps, and
                                more — all of it can be accessed from our online
                                platform.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                Can I upload other business insurance on Covrzy
                                Platform?
                            </Accordion.Header>
                            <Accordion.Body>
                                Yes, you can upload and access other business
                                insurance through our platform.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>
                                Do I need to pay you anything to use your platform?{' '}
                            </Accordion.Header>
                            <Accordion.Body>
                                No, we don't charge our customers. Our revenue
                                comes from commissions paid to us by insurance
                                companies.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>
                                How do I make payment for the policy?
                            </Accordion.Header>
                            <Accordion.Body>
                                You can use an online link to pay for the
                                insurance purchased through Covrzy.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>
                                How do I file a claim?
                            </Accordion.Header>
                            <Accordion.Body>
                                Please visit the claims section to know more
                                about this.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
            <SubBanner
                bgImage={questionCoverge}
                whiteTitle="More Questions?"
                orangeTitle="We’re ready."
                content={`<p>We’ll help out if you’re unsure which <br /> insurance you need.</p>`}
                buttonTitle="Launch Chat"
                image={chat}
                onClick={lunchBotHandler}
            />
        </Fragment>
    );
};

export default FAQPage;

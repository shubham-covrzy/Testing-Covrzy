import React, { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
interface PartnerFaqPropsType {
    faqData: { question: string; answer: string }[];
}

const PartnerFaq = ({ faqData }: PartnerFaqPropsType) => {
    return (
        <section className="faqpartner">
            <Container>
                <Row>
                    <Col>
                        <div className="faqpartner-container">
                            <h2 className="faqpartner-heading">Frequently Asked Questions (FAQs)</h2>
                            {faqData.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

interface AccordionItemProps {
    question: string;
    answer: string;
}

const AccordionItem = ({ question, answer }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faqpartner-accordion-item">
            <h3
                className="faqpartner-question"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <ChevronDown
                    size={16}
                    className={`faqpartner-arrow ${isOpen ? 'open' : ''}`}
                />
            </h3>
            <div
                className={`faqpartner-answer-container ${isOpen ? 'open' : ''
                    }`}
            >
                <p className="faqpartner-answer">{answer}</p>
            </div>
        </div>
    );
};

export default PartnerFaq;

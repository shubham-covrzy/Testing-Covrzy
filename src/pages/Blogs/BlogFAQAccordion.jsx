import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';

const FAQAccordion = ({ faqdata }) => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        // Simulated API response
        const apiResponse = faqdata;

        const parsedFaqs = [];
        let currentQuestion = null;

        apiResponse.forEach((item) => {
            if (item.type === 'heading' && item.level === 3) {
                currentQuestion = {
                    question: item.children[0].text,
                    answer: '',
                };
                parsedFaqs.push(currentQuestion);
            } else if (item.type === 'paragraph' && currentQuestion) {
                currentQuestion.answer += item.children[0].text;
            }
        });

        setFaqs(parsedFaqs);
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Frequently Asked Questions (FAQs)</h2>
            {faqs.map((faq, index) => (
                <AccordionItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
};

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={styles.accordionItem}>
            <h3 style={styles.question} onClick={() => setIsOpen(!isOpen)}>
                {question}
                <ChevronDown
                    size={16}
                    style={{
                        ...styles.arrow,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            </h3>
            <div
                style={{
                    ...styles.answerContainer,
                    maxHeight: isOpen ? '500px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
            >
                <p style={styles.answer}>{answer}</p>
            </div>
        </div>
    );
};

// Style objects for modular, reusable styling
const styles = {
    container: {
        width: '100%',
        margin: '0 auto 2rem',
    },
    heading: {
        fontSize: '2em',
        padding: '10px 0',
    },
    accordionItem: {
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    },
    question: {
        fontSize: '1.2em',
        cursor: 'pointer',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    arrow: {
        transition: 'transform 0.3s ease',
        marginLeft: '10px',
    },
    answerContainer: {
        maxHeight: '0px',
        transition: 'max-height 0.3s ease',
    },
    answer: {
        fontSize: '1em',
        margin: '10px 0 0',
        color: '#555',
        padding: '10px',
    },
};

export default FAQAccordion;

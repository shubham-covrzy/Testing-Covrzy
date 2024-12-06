// CircularStepper component

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './style.module.scss';

interface CircularStepperProps {
    totalSteps: number;
    activeStep: number;
}

const CircularStepper: React.FC<CircularStepperProps> = ({
    totalSteps,
    activeStep,
}) => {
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

    return (
        <Container fluid className={styles['circular-stepper-container']}>
            <Row>
                <Col>
                    <div className={styles['circular-stepper']}>
                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className={`${styles['circular-step']} ${
                                    step <= activeStep ? styles.active : ''
                                }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CircularStepper;

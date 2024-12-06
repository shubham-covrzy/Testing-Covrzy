import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from '../utils/types';

interface StepperProps {
    step: number;
}

function QuoteCustomStepper(props: StepperProps) {
    const [item, setItem] = useState([
        {
            id: 1,
            sub: 'About You',
        },
        { id: 2, sub: 'About business' },
        { id: 3, sub: 'Review' },
        { id: 4, sub: 'Checkout' },
    ]);
    const { policies } = useSelector(
        (state: IReduxState) => state.CustomerInformation,
    );

    useEffect(() => {
        if (!policies?.length) {
            setItem([
                {
                    id: 1,
                    sub: 'About You',
                },
                { id: 2, sub: 'About business' },
                { id: 3, sub: 'Recommendation' },
                { id: 4, sub: 'Checkout' },
            ]);
        }
    }, [policies]);

    return (
        <div className="quote-step-container">
            <div className="quote-step-item">
                {item.map((el, index) => (
                    <div className="quote-content" key={el.id}>
                        <div
                            className={
                                props.step >= el.id - 1
                                    ? 'quote-step-child quote-step-child-active'
                                    : 'quote-step-child'
                            }
                        >
                            {props.step > el.id - 1 ? (
                                // Render content when the step is completed
                                <>
                                    <div className="quote-step-items quote-stepper-submitted">
                                        {el.id}
                                    </div>
                                    <div
                                        className="quote-stepper-label"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {el.sub}
                                    </div>
                                </>
                            ) : (
                                // Render content when the step is not completed
                                <>
                                    <div
                                        className={
                                            el.id - 1 === props.step
                                                ? 'quote-step-items quote-stepper-active'
                                                : 'quote-step-items'
                                        }
                                    >
                                        {el.id}
                                    </div>
                                    {/* Display in a single line if the text is short */}
                                    <div
                                        className={
                                            el.id - 1 === props.step
                                                ? 'quote-stepper-label quote-stepper-label-active'
                                                : 'quote-stepper-label'
                                        }
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {el.sub}
                                    </div>
                                </>
                            )}
                        </div>
                        {index !== item.length - 1 && (
                            <hr className="quote-step-divider" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuoteCustomStepper;

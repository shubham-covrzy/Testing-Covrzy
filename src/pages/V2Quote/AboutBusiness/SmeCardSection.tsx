import React from 'react';
import { businessCategories } from '../../../utils/QuoteData/BusineesCategories';
import CustomLabel from '../../../common/CustomLabel';
import IndustryCard from '../../../components/IndustryCard';
import { Row, Col } from 'react-bootstrap';

interface SmeCardSectionProps {
    handleClick: (name: string) => void;
    selected: string;
}

function SmeCardSection(props: SmeCardSectionProps) {
    return (
        <>
            <div>
                <p>Which industry does your Business belong? * </p>
                <CustomLabel label="Choose One *" />
                <Row className="business-card-container">
                    {businessCategories.map((el: any, index: number) => (
                        <Col key={index} lg={3} md={3} className="my-3">
                            <IndustryCard
                                icon={el.icon}
                                name={el.name}
                                onClick={props.handleClick}
                                selected={props.selected === el.name}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default SmeCardSection;

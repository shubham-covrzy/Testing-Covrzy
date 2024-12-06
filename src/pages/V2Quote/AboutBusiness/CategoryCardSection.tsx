import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CustomLabel from '../../../common/CustomLabel';
import IndustryCard from '../../../components/IndustryCard';
import CustomInput from '../../../common/CustomInput';
import Style from './style.module.scss';
interface CategoryCardSectionProps {
    handleClick: (name: string) => void;
    selected: string;
    funded: boolean;
    setFunded: any;
    employeeCount: number | null;
    setEmployeeCount: any;
    fundingAmount: string;
    setFundingAmount: any;
    businessCategories: any;
    businessType: string;
}

function CategoryCardSection(props: CategoryCardSectionProps) {
    const handleFundingChange = (e: any) => {
        props.setFunded(e.target.value === 'funded');
    };

    const handleEmployeesCount = (e: any) => {
        props.setEmployeeCount(e.target.value);
    };
    return (
        <>
            <div>
                <p>Which industry does your Business belong? * </p>
                <CustomLabel label="Choose One *" />
                <Row className="business-card-container">
                    {props.businessCategories.map((el: any, index: number) => (
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
            {props.businessType === 'startup' ? (
                <>
                    {props.selected && (
                        <>
                            <p>How many employees does your company have?</p>
                            <Form.Group className="form-group">
                                <CustomLabel label=" No. of Employees *" />
                                <CustomInput
                                    value={props.employeeCount}
                                    name="no.employees"
                                    onChange={handleEmployeesCount}
                                    placeholder="Enter No. of Employees"
                                />
                            </Form.Group>
                        </>
                    )}

                    {props.employeeCount && (
                        <>
                            <Form.Group
                                className={`form-group ${Style.container}`}
                            >
                                <p>Is your business funded or bootstrapped?</p>
                                <div className={Style.radioButtons}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="isFunded"
                                            value="funded"
                                            checked={props.funded}
                                            onChange={handleFundingChange}
                                        />
                                        Funded
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="isFunded"
                                            value="bootstrapped"
                                            checked={!props.funded}
                                            onChange={handleFundingChange}
                                        />
                                        Bootstrapped
                                    </label>
                                </div>
                            </Form.Group>
                        </>
                    )}
                </>
            ) : (
                ''
            )}
        </>
    );
}

export default CategoryCardSection;

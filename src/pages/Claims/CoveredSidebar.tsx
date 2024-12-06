import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import LinkButton from '../../common/Buttons/LinkButton';
import CoveredCard from './CoveredCard';
import { useState } from 'react';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

const maxListSize = 5;

const CoveredSidebar = (props: any) => {
    const [listSize, setListSize] = useState(maxListSize);

    return (
        <>
            <Offcanvas
                className="covered-sidebar"
                show={props?.show}
                onHide={props?.onHide}
                placement={'end'}
            >
                <Offcanvas.Header
                    style={{ justifyContent: 'space-between' }}
                    closeButton
                >
                    <Offcanvas.Title>{props?.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {Object.entries(JSON.parse([props?.content][0])).map(
                            ([key, value]) => (
                                <Col md={6} key={key}>
                                    <CoveredCard
                                        image={props?.image}
                                        coveredTitle={value}
                                    />
                                </Col>
                            ),
                        )}
                        {/* {(Object.keys(props?.content[0]).length > maxListSize && Object.keys(props?.content[0]).length !== listSize) &&
                            <Col md={12} >
                                <span className='view-more-button'>
                                    <LinkButton
                                        buttonTitle={'view more'}
                                        onLinkClick={() => setListSize(Object.keys(props?.content[0]).length)}
                                    />
                                    <CaretDownFill />
                                </span>
                            </Col>
                        }
                        {(Object.keys(props?.content[0]).length > maxListSize && Object.keys(props?.content[0]).length === listSize) &&
                            <Col md={12} >
                                <span className='view-more-button'>
                                    <LinkButton
                                        buttonTitle={'view less'}
                                        onLinkClick={() => setListSize(maxListSize)}
                                    />
                                    <CaretUpFill />
                                </span>
                            </Col>
                        } */}
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CoveredSidebar;

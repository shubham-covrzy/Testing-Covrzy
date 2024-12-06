import { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionItem = (props: any) => {
    return (
        <Fragment>
            <Accordion.Item
                className={props.className}
                eventKey={props?.eventKey}
            >
                <Accordion.Header>{props?.AccordionHeader}</Accordion.Header>
                <Accordion.Body>
                    <p>{props?.AccordionContent}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Fragment>
    );
};

export default AccordionItem;

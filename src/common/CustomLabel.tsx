import { Form } from 'react-bootstrap';

const CustomLabel = (props: any) => {
    return (
        <Form.Label>
            {props?.label} {props.tooltip}
        </Form.Label>
    );
};

export default CustomLabel;

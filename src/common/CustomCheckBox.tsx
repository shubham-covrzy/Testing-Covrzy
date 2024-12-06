import { Form } from 'react-bootstrap';

const CustomCheckBox = (props: any) => {
    return (
        <Form.Check
            type={props?.type}
            label={props?.label}
            name={props?.name}
            checked={props?.checked}
        />
    );
};

export default CustomCheckBox;

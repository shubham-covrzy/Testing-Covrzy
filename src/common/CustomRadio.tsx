import { Form } from 'react-bootstrap';

const CustomRadio = (props: any) => {
    return (
        <Form.Check
            type={props?.type}
            label={props?.label}
            name={props?.name}
            checked={props?.checked}
            defaultChecked={props?.defaultChecked}
            onChange={props?.onChange}
            value={props?.value}
        />
    );
};

export default CustomRadio;

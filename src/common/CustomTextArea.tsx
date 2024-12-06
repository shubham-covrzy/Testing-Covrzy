import { Form } from 'react-bootstrap';

const CustomTextArea = (props: any) => {
    return (
        <Form.Control
            as={'textarea'}
            rows={props?.rows}
            placeholder={props?.placeholder}
            // style={{ height: '115px' }}
            value={props?.value}
            name={props?.name}
            onChange={props?.onChange}
            onBlur={props?.onBlur}
        />
    );
};

export default CustomTextArea;

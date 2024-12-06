import { Form } from 'react-bootstrap';

const CustomInput = (props: any) => {
    const handleWheel = (event: any) => {
        if (props?.type === 'number') {
            // event.preventDefault();
            event.target.blur();
        }
    };

    return (
        <Form.Control
            type={props?.type}
            name={props?.name}
            min={
                props?.type === 'number'
                    ? '0'
                    : props?.type === 'date'
                      ? props?.minDate
                      : ''
            }
            max={props?.type === 'date' ? props?.maxDate : ''}
            maxLength={props?.maxLength}
            placeholder={props?.placeholder}
            id={props?.id}
            disabled={props?.disabled}
            onChange={props?.onChange}
            onBlur={props?.onBlur}
            defaultValue={props?.defaultValue}
            value={props?.value}
            onWheel={handleWheel}
            onKeyDown={props?.onKeyDown}
        />
    );
};

export default CustomInput;

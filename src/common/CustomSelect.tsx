import { Form } from 'react-bootstrap';

const CustomSelect = (props: any) => {
    return (
        <>
            {props.value !== '' ? (
                <Form.Select
                    disabled={props?.disabled}
                    onChange={props.onChange}
                    name={props.name}
                >
                    {props?.title && (
                        <option
                            value={''}
                            selected={props?.selected === ''}
                            disabled
                        >
                            Select Industry
                        </option>
                    )}
                    {props?.data?.map((item: any) => (
                        <option
                            key={item?.id}
                            value={item?.[props?.value_key]}
                            selected={
                                props?.selected === item?.[props?.value_key]
                            }
                        >
                            {item?.[props?.title_key]
                                ? item?.[props?.title_key]
                                : item}
                        </option>
                    ))}
                </Form.Select>
            ) : (
                <Form.Select
                    disabled={props?.disabled}
                    onChange={props.onChange}
                    name={props.name}
                    value={props.value}
                >
                    {props?.title && (
                        <option
                            value={''}
                            selected={props?.selected === ''}
                            disabled
                        >
                            Select Industry
                        </option>
                    )}
                    {props?.data?.map((item: any) => (
                        <option
                            key={item?.id}
                            value={item?.[props?.value_key]}
                            selected={
                                props?.selected === item?.[props?.value_key]
                            }
                        >
                            {item?.[props?.title_key]
                                ? item?.[props?.title_key]
                                : item}
                        </option>
                    ))}
                </Form.Select>
            )}
        </>
    );
};

export default CustomSelect;

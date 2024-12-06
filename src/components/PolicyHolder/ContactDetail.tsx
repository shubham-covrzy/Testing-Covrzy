import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styles from './style.module.scss';
import { PolicyHolderInputChildFormProp } from '.';

export interface IContactDetailInput {
    phone: string;
    email: string;
}

interface InputType {
    type: 'phone' | 'email';
    autoComplete?: string;
    name: keyof IContactDetailInput;
    label: string;
}

const ContactDetail = ({
    formik,
    setIsValid,
    value,
}: PolicyHolderInputChildFormProp) => {
    useEffect(() => {
        let isValid = true;

        Object.keys(formik.values.contactDetail).forEach((key) => {
            if (
                (isValid && formik.values.contactDetail[key] === '') ||
                (formik.errors?.contactDetail?.[key] && formik.touched?.[key])
            ) {
                isValid = false;
            }
        });

        setIsValid((prev: boolean[]) => {
            const updatedList = [...prev];
            updatedList[3] = isValid;
            return updatedList;
        });
    }, [
        formik.errors.contactDetail,
        formik.touched,
        formik.values.contactDetail,
        setIsValid,
    ]);

    useEffect(() => {
        setData(value);
    }, [value]);

    const setData = (value: any) => {
        for (const key in value) {
            const element = value[key];
            formik.setFieldValue(`contactDetail.${key}`, element);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        formik.setFieldValue(`contactDetail.${name}`, value);
    };

    const inputs: InputType[] = [
        {
            type: 'phone',
            autoComplete: 'tel',
            name: 'phone',
            label: 'Mobile Number *',
        },
        {
            type: 'email',
            autoComplete: 'email',
            name: 'email',
            label: 'Email *',
        },
    ];

    return (
        <div className={`form-group ${styles.formGroup} ${styles.inputStyle}`}>
            {inputs.map((input) => {
                return (
                    <Form.Group
                        key={input.name}
                        className={`form-group ${styles.formGroup} ${styles.contactDetails}`}
                    >
                        <Form.Label>{input.label}</Form.Label>
                        <Form.Control
                            type={input.type}
                            autoComplete={input.autoComplete}
                            name={input.name}
                            value={formik.values.contactDetail[input.name]}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors?.contactDetail?.[input.name] &&
                            formik.touched?.[input.name] && (
                                <span className="text-error">
                                    {formik.errors?.contactDetail?.[input.name]}
                                </span>
                            )}
                    </Form.Group>
                );
            })}
        </div>
    );
};

export default ContactDetail;

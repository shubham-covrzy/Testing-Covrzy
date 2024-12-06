import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styles from './style.module.scss';
import { PolicyHolderInputChildFormProp } from '.';

export interface IPersonalDetailInput {
    firstName: string;
    lastName: string;
    dob: string;
    pan: string;
}

interface ItemType {
    id: number;
    text: string;
    inputs: {
        type: 'text' | 'date' | 'number';
        name: keyof IPersonalDetailInput;
        label: string;
    }[];
}

const PersonalDetail = ({
    formik,
    setIsValid,
    value,
}: PolicyHolderInputChildFormProp) => {
    useEffect(() => {
        setData(value);
    }, [value]);

    useEffect(() => {
        let isValid = true;

        Object.keys(formik.values.personalDetail).forEach((key) => {
            if (
                (isValid && formik.values.personalDetail[key] === '') ||
                (formik.errors?.personalDetail?.[key] && formik.touched?.[key])
            ) {
                isValid = false;
            }
        });

        setIsValid((prev: boolean[]) => {
            const updatedList = [...prev];
            updatedList[2] = isValid;
            return updatedList;
        });
    }, [
        formik.errors.personalDetail,
        formik.touched,
        formik.values.personalDetail,
        setIsValid,
    ]);

    const setData = (value: any) => {
        for (const key in value) {
            const element = value[key];
            formik.setFieldValue(`personalDetail.${key}`, element);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        if (name === 'pan') {
            value = value.toUpperCase();
        }

        formik.setFieldValue(`personalDetail.${name}`, value);
    };

    const items: ItemType[] = [
        {
            id: 1,
            text: '',
            inputs: [
                {
                    type: 'text',
                    name: 'firstName',
                    label: 'Proposer First Name *',
                },
                {
                    type: 'text',
                    name: 'lastName',
                    label: 'Proposer Last Name *',
                },
            ],
        },
        {
            id: 2,
            text: 'Please provide PAN and D.O.B for verification.',
            inputs: [
                {
                    type: 'date',
                    name: 'dob',
                    label: 'Date of Birth *',
                },
                {
                    type: 'text',
                    name: 'pan',
                    label: 'PAN *',
                },
            ],
        },
    ];

    return (
        <div>
            {items.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        <div className={styles.text}>{item.text}</div>
                        <div className={styles.box}>
                            {item.inputs.map((input) => (
                                <Form.Group
                                    key={input.name}
                                    className={`form-group ${styles.formGroup} ${styles.personalDetails}`}
                                >
                                    <Form.Label>{input.label}</Form.Label>
                                    <Form.Control
                                        type={input.type}
                                        name={input.name}
                                        value={
                                            formik.values.personalDetail[
                                                input.name
                                            ]
                                        }
                                        onChange={handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors?.personalDetail?.[
                                        input.name
                                    ] &&
                                        formik.touched?.[input.name] && (
                                            <span className="text-error">
                                                {
                                                    formik.errors
                                                        ?.personalDetail?.[
                                                        input.name
                                                    ]
                                                }
                                            </span>
                                        )}
                                </Form.Group>
                            ))}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default PersonalDetail;

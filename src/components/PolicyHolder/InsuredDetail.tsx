import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './style.module.scss';
import { PolicyHolderInputChildFormProp } from '.';

export interface IInsuredDetailInput {
    insuredFirstName: string;
    insuredLastName: string;
    insuredDOB: string;
    insuredAge: string;
    insuredGender: string;
    insuredRelation: string;
}

interface ItemType {
    id: number;
    inputs: (
        | {
              type: 'text' | 'date' | 'number';
              name: keyof IInsuredDetailInput;
              label: string;
          }
        | {
              type: 'select';
              name: keyof IInsuredDetailInput;
              label: string;
              placeholder: string;
              options: string[];
          }
    )[];
}

const gender = ['MALE', 'FEMALE'];

const InsuredDetail = ({
    formik,
    setIsValid,
    value,
}: PolicyHolderInputChildFormProp) => {
    const [check, setCheck] = useState<boolean>(false);

    useEffect(() => {
        let isValid = true;

        Object.keys(formik.values.insuredDetail).forEach((key) => {
            if (
                (isValid && formik.values.insuredDetail[key] === '') ||
                (formik.errors?.insuredDetail?.[key] && formik.touched?.[key])
            ) {
                isValid = false;
            }
        });

        setIsValid((prev: boolean[]) => {
            const updatedList = [...prev];
            updatedList[5] = isValid;
            return updatedList;
        });
    }, [
        formik.errors.insuredDetail,
        formik.touched,
        formik.values.insuredDetail,
        setIsValid,
    ]);

    useEffect(() => {
        setData(value);
    }, [value]);

    const setData = (value: any) => {
        for (const key in value) {
            const element = value[key];
            formik.setFieldValue(`insuredDetail.${key}`, element);
        }
    };

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'insuredDOB') {
            handleAge(value);
        }
        formik.setFieldValue(`insuredDetail.${name}`, value);
    };

    const handleAge = (value: any) => {
        const today = new Date();
        const dob = new Date(value);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
            age--;
        }
        if (age >= 0 && age < 200) {
            formik.setFieldValue(`insuredDetail.insuredAge`, age.toString());
        }
    };

    // input setting
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        formik.setFieldValue(`insuredDetail.${name}`, value);
    };
    const items: ItemType[] = [
        {
            id: 1,
            inputs: [
                {
                    type: 'text',
                    name: 'insuredFirstName',
                    label: 'Insured First Name *',
                },
                {
                    type: 'text',
                    name: 'insuredLastName',
                    label: 'Insured Last Name *',
                },
            ],
        },
        {
            id: 2,
            inputs: [
                {
                    type: 'date',
                    name: 'insuredDOB',
                    label: 'Insured Date of Birth *',
                },
                {
                    type: 'number',
                    name: 'insuredAge',
                    label: 'Insured Age *',
                },
            ],
        },
        {
            id: 3,
            inputs: [
                {
                    type: 'select',
                    name: 'insuredGender',
                    label: 'Insured Gender *',
                    placeholder: 'Gender',
                    options: gender,
                },
                {
                    type: 'text',
                    name: 'insuredRelation',
                    label: 'Insured Relation *',
                },
            ],
        },
    ];

    const handleCheck = () => {
        setCheck((curCheckValue) => {
            if (!curCheckValue) {
                formik.setFieldValue(
                    'insuredDetail.insuredFirstName',
                    formik.values.personalDetail.firstName,
                );
                formik.setFieldValue(
                    'insuredDetail.insuredLastName',
                    formik.values.personalDetail.lastName,
                );
                formik.setFieldValue(
                    'insuredDetail.insuredDOB',
                    formik.values.personalDetail.dob,
                );
                formik.setFieldValue(
                    'insuredAge',
                    handleAge(formik.values.personalDetail.dob),
                );
            }
            return !curCheckValue;
        });
    };

    return (
        <div>
            <Form.Group className={`form-group ${styles.container}`}>
                <Form.Check
                    type="checkbox"
                    checked={check}
                    onChange={handleCheck}
                />
                <span>Proposer Details & Insured details are same ?</span>
            </Form.Group>

            {items.map((item) => {
                return (
                    <div key={item.id} className={styles.box}>
                        {item.inputs.map((input) => (
                            <Form.Group
                                key={input.name}
                                className={`form-group ${styles.formGroup} ${styles.personalDetails}`}
                            >
                                <Form.Label>{input.label}</Form.Label>
                                {input.type === 'select' ? (
                                    <Form.Select
                                        // as="select"
                                        name={input.name}
                                        value={
                                            formik.values.insuredDetail[
                                                input.name
                                            ]
                                        }
                                        onChange={handleSelectChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option>{input.placeholder}</option>
                                        {input.options.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Form.Select>
                                ) : (
                                    <Form.Control
                                        type={input.type}
                                        name={input.name}
                                        value={
                                            formik.values.insuredDetail[
                                                input.name
                                            ]
                                        }
                                        onChange={handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                )}
                                {formik.errors?.insuredDetail?.[input.name] &&
                                    formik.touched?.[input.name] && (
                                        <span className="text-error">
                                            {
                                                formik.errors?.insuredDetail?.[
                                                    input.name
                                                ]
                                            }
                                        </span>
                                    )}
                            </Form.Group>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default InsuredDetail;

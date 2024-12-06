import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styles from './style.module.scss';
import { states } from '../../utils/AddressDetails';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../utils/types';
import {
    ClearCityNamesAction,
    GetCityNamesActions,
} from '../../Redux/Actions/PolicyInputAction';
import { PolicyHolderInputChildFormProp } from '.';

export interface IAddressDetailInput {
    address: string;
    pincode: string;
    state: string;
    city: string;
}

interface ItemType {
    id: number;
    inputs: (
        | {
              type: 'text' | 'number';
              disabled?: boolean;
              name: keyof IAddressDetailInput;
              label: string;
          }
        | {
              type: 'select';
              name: keyof IAddressDetailInput;
              label: string;
              placeholder: string;
              options: string[];
          }
    )[];
}

const AddressDetail = ({
    formik,
    setIsValid,
    value,
}: PolicyHolderInputChildFormProp) => {
    useEffect(() => {
        let isValid = true;

        Object.keys(formik.values.addressDetail).forEach((key) => {
            if (
                formik.values.addressDetail[key] === '' ||
                formik.values.addressDetail[key] === 'Enter your state' ||
                formik.values.addressDetail[key] === 'Enter your city' ||
                (formik.errors?.addressDetail?.[key] && formik.touched?.[key])
            ) {
                isValid = false;
            }
        });

        setIsValid((prev: boolean[]) => {
            const updatedList = [...prev];
            updatedList[4] = isValid;
            return updatedList;
        });
    }, [
        formik.errors.addressDetail,
        formik.touched,
        formik.values.addressDetail,
        setIsValid,
    ]);

    useEffect(() => {
        setData(value);
    }, [value]);

    const dispatch = useDispatch();

    const { city_names: cities } = useSelector(
        (state: IReduxState) => state.PolicyHolderInput,
    );

    const setData = (value: any) => {
        for (const key in value) {
            const element = value[key];
            formik.setFieldValue(`addressDetail.${key}`, element);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        formik.setFieldValue(`addressDetail.${name}`, value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        formik.setFieldValue(`addressDetail.${name}`, value);

        if (name !== 'state') return;

        formik.setFieldValue('addressDetail.city', '');

        if (value === 'Enter your state') {
            dispatch(ClearCityNamesAction());
        } else {
            dispatch(
                GetCityNamesActions({
                    state_name: value,
                }),
            );
        }
    };

    const items: ItemType[] = [
        {
            id: 1,
            inputs: [
                {
                    type: 'text',
                    name: 'address',
                    label: 'Address *',
                },
                {
                    type: 'select',
                    name: 'state',
                    label: 'State *',
                    placeholder: 'State',
                    options: states,
                },
            ],
        },
        {
            id: 2,
            inputs: [
                {
                    type: 'number',
                    name: 'pincode',
                    label: 'Pincode *',
                },

                {
                    type: 'select',
                    name: 'city',
                    label: 'City *',
                    placeholder: 'Enter your city',
                    options: cities,
                },
            ],
        },
    ];

    return (
        <div>
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
                                        name={input.name}
                                        value={
                                            formik.values.addressDetail[
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
                                        disabled={input.disabled}
                                        value={
                                            formik.values.addressDetail[
                                                input.name
                                            ]
                                        }
                                        onChange={handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                )}
                                {formik.errors?.addressDetail?.[input.name] &&
                                    formik.touched?.[input.name] && (
                                        <span className="text-error">
                                            {
                                                formik.errors?.addressDetail?.[
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

export default AddressDetail;

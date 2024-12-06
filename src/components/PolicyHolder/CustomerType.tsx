import { useEffect } from 'react';
import { PolicyHolderInputChildFormProp } from '.';
import styles from './style.module.scss';

export type ICustomerTypeInput = 'Company' | 'Individual';

const CustomerType = ({
    formik,
    setIsValid,
    value,
}: PolicyHolderInputChildFormProp) => {
    useEffect(() => {
        handleChange(value);
    }, [value]);

    useEffect(() => {
        setIsValid((prev: boolean[]) => {
            const updatedList = [...prev];
            updatedList[1] = formik.values.customerType !== '';

            return updatedList;
        });
    }, [formik.values.customerType, setIsValid]);

    const handleChange = (value: ICustomerTypeInput) => {
        formik.setFieldValue('customerType', value);
    };

    const values: ICustomerTypeInput[] = ['Company', 'Individual'];

    return (
        <div className={styles.customerTypeForm}>
            <div className={styles.text}>What best describes you?</div>
            <div className={styles.box}>
                {values.map((value) => (
                    <div
                        key={value}
                        className={
                            value === formik.values.customerType
                                ? styles.selected
                                : styles.notSelected
                        }
                        onClick={() => handleChange(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            {formik.errors.customerType && formik.touched.customerType && (
                <span className="text-error">{formik.errors.customerType}</span>
            )}
        </div>
    );
};

export default CustomerType;

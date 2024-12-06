import * as yup from 'yup';
import { phonesRegx } from '../../Helper/commonFunction';
import { PHONE } from '../../constants/main';

export const dateOfBirthValidator = (value: any) => {
    const currentDate = new Date();
    const inputDate = new Date(value);

    const monthDifference =
        (currentDate.getFullYear() - inputDate.getFullYear()) * 12 +
        currentDate.getMonth() -
        inputDate.getMonth();

    return monthDifference >= 6;
};

const policyHolderInputValidationSchema = yup.object().shape({
    customerType: yup.string().oneOf(['Company', 'Individual']),
    personalDetail: yup.object().shape({
        firstName: yup.string().required('Please enter your First Name'),
        lastName: yup.string().required('Please enter your Last Name'),
        dob: yup
            .date()
            .required('Date of Birth is required')
            .max(new Date(), 'Date of Birth must be in the past')
            .test(
                'is-six-months-ago',
                'Date of Birth must be at least six months ago',
                dateOfBirthValidator,
            ),

        pan: yup
            .string()
            .required('PAN is required')
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
    }),
    contactDetail: yup.object().shape({
        email: yup.string().email().required('Email is required'),
        phone_number: yup
            .string()
            .required('Please enter your phone number')
            .matches(phonesRegx[91], PHONE),
    }),
    addressDetail: yup.object().shape({
        address: yup.string().required('Please enter your address'),
        pincode: yup.string().required('Please enter your pincode'),
        country: yup.string().required('Please enter your country'),
        state: yup.string().required('Please enter your state'),
        city: yup.string().required('Please enter your city'),
    }),
    insuredDetail: yup.object().shape({
        insuredFirstName: yup
            .string()
            .required('Please enter your insured firstname'),
        insuredLastName: yup
            .string()
            .required('Please enter your insured lastname'),
        insuredDOB: yup
            .date()
            .required('Please enter your insured dob')
            .test(
                'is-six-months-ago',
                'DOB must be at least six months ago',
                dateOfBirthValidator,
            ),
        insuredAge: yup.string().required('Please enter your insured age'),
        insuredGender: yup
            .string()
            .required('Please enter your insured gender'),
        insuredRelation: yup
            .string()
            .required('Please enter your insured relation'),
    }),
});

export default policyHolderInputValidationSchema;

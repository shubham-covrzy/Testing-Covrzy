import PhoneInput from 'react-phone-input-2';
import { ValidatePhoneNumber } from '../Helper/commonFunction';

const CustomPhoneInput = (props: any) => {
    const { country, placeholder, value, onChange } = props;

    return (
        <PhoneInput
            country={country}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isValid={(vl: string, country: object | any) => {
                if (vl.length === country?.dialCode?.length || vl === '')
                    return true;
                else return ValidatePhoneNumber(vl, country);
            }}
            autoFormat={false}
            countryCodeEditable={false}
        />
    );
};

export default CustomPhoneInput;

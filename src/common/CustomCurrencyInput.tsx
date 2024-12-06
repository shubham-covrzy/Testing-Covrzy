import React from 'react';
import CurrencyInput from 'react-currency-input-field';

const CustomCurrencyInput = (props: any) => {
    const { name, placeholder, onChange, value, disabled, maxLength } = props;
    return (
        <div>
            <CurrencyInput
                id="input-example"
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={0}
                decimalsLimit={2}
                step={1}
                value={value}
                maxLength={maxLength}
                // onValueChange={(value, name) => console.log(value, name)}
                onValueChange={onChange}
                intlConfig={{ locale: 'en-IN', currency: 'INR' }}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default CustomCurrencyInput;

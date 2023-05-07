import { FC, InputHTMLAttributes } from 'react';

import { FormInputLabel, Input, Group } from './form-input.styles';

type FormInputProps = {
    label: string;
    name: string;
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, name, ...otherProps }) => {
    return (
        <Group>
            <Input id={name} name={name} {...otherProps} />
            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)} htmlFor={name}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;

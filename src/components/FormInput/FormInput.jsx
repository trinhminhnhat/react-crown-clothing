import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, name, ...otherProps }) => {
    return (
        <Group>
            <Input id={name} name={name} {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length} htmlFor={name}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;

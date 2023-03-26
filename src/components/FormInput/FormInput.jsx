import './form-input.styles.scss';

const FormInput = ({ label, name, ...otherProps }) => {
    return (
        <div className="form-group">
            <input className="form-input" id={name} name={name} {...otherProps} />
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`} htmlFor={name}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;

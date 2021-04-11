import { useFormContext } from './Form';

function Input({ children, name, validationSchema, label, ...rest }) {
    const { register, errors } = useFormContext();

    return (
        <div className="inputWrapper">
            {label && <label className="inputLabel">{label}</label>}
            <input
                name={name}
                ref={register(validationSchema)}
                className={errors[name] ? 'inputInvalid' : ''}
                {...rest}
            />
            {children}
            <div className="inputErrorMessage">
                {errors[name] && errors[name].message}
            </div>
        </div>
    );
}

export default Input;

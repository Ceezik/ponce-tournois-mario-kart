import { useFormContext } from './Form';

function Textarea({
    children,
    name,
    validationSchema,
    label,
    className,
    ...rest
}) {
    const { register, errors } = useFormContext();

    return (
        <div className="inputWrapper">
            {label && <label className="inputLabel">{label}</label>}
            <textarea
                name={name}
                ref={register(validationSchema)}
                className={`${className || ''} ${
                    errors[name] ? 'inputInvalid' : ''
                }`}
                {...rest}
            />
            {children}
            <div className="inputErrorMessage">
                {errors[name] && errors[name].message}
            </div>
        </div>
    );
}

export default Textarea;

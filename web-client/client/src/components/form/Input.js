import { useFormContext } from './Form';
import Switch from '../utils/Switch';
import { useState } from 'react';

function Checkbox({ name, validationSchema, defaultChecked, ...rest }) {
    const [checked, setChecked] = useState(defaultChecked ?? false);
    const { register } = useFormContext();

    return (
        <div className="inputCheckboxWrapper">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                readOnly
                ref={register(validationSchema)}
            />
            <Switch on={checked} setOn={() => setChecked(!checked)} />
        </div>
    );
}

function Input({ children, name, validationSchema, label, type, ...rest }) {
    const { register, errors } = useFormContext();

    return (
        <div className="inputWrapper">
            {label && <label className="inputLabel">{label}</label>}
            {type === 'checkbox' ? (
                <Checkbox
                    name={name}
                    validationSchema={validationSchema}
                    {...rest}
                />
            ) : (
                <input
                    name={name}
                    ref={register(validationSchema)}
                    className={errors[name] ? 'inputInvalid' : ''}
                    type={type}
                    {...rest}
                />
            )}

            {children}
            {errors[name] && errors[name].message && (
                <div className="inputErrorMessage">{errors[name].message}</div>
            )}
        </div>
    );
}

export default Input;

import { useFormContext } from './Form';
import React, { useState } from 'react';
import Switch from '../utils/Switch';
import mergeRefs from '../../utils/mergeRefs';

const Checkbox = React.forwardRef(
    ({ name, validationSchema, defaultChecked, ...rest }, ref) => {
        const [checked, setChecked] = useState(defaultChecked ?? false);
        const { register } = useFormContext();

        return (
            <div className="inputCheckboxWrapper">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    readOnly
                    ref={mergeRefs([register(validationSchema), ref])}
                    {...rest}
                />
                <Switch on={checked} setOn={() => setChecked(!checked)} />
            </div>
        );
    }
);

const Input = React.forwardRef(
    ({ children, name, validationSchema, label, type, ...rest }, ref) => {
        const { register, errors } = useFormContext();

        return (
            <div className="inputWrapper">
                {label && <label className="inputLabel">{label}</label>}
                {type === 'checkbox' ? (
                    <Checkbox
                        name={name}
                        validationSchema={validationSchema}
                        ref={ref}
                        {...rest}
                    />
                ) : (
                    <input
                        name={name}
                        ref={mergeRefs([register(validationSchema), ref])}
                        className={errors[name] ? 'inputInvalid' : ''}
                        type={type}
                        {...rest}
                    />
                )}

                {children}
                {errors[name] && errors[name].message && (
                    <div className="inputErrorMessage">
                        {errors[name].message}
                    </div>
                )}
            </div>
        );
    }
);

export default Input;

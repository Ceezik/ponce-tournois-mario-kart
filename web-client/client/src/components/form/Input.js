import { useFormContext } from './Form';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
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
    (
        {
            children,
            name,
            validationSchema,
            label,
            type,
            defaultValue,
            ...rest
        },
        ref
    ) => {
        const { register, errors, control } = useFormContext();

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
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        render={(field) => (
                            <input
                                name={name}
                                ref={mergeRefs([
                                    register(validationSchema),
                                    ref,
                                ])}
                                className={errors[name] ? 'inputInvalid' : ''}
                                type={type}
                                defaultValue={defaultValue}
                                min={validationSchema?.min?.value}
                                max={validationSchema?.max?.value}
                                onChange={(e) => {
                                    let { value, min, max } = e.target;

                                    if (type === 'number' && value) {
                                        value = Math.max(
                                            Number(min),
                                            Math.min(Number(max), Number(value))
                                        );
                                    }

                                    field.onChange(value);
                                }}
                                {...rest}
                            />
                        )}
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

import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

function Form({ children, onSubmit, ...rest }) {
    const { register, handleSubmit, errors, setValue } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            <FormContext.Provider value={{ register, errors, setValue }}>
                {children}
            </FormContext.Provider>
        </form>
    );
}

export default Form;

import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

function Form({ children, onSubmit, ...rest }) {
    const { handleSubmit, ...formValues } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            <FormContext.Provider value={formValues}>
                {children}
            </FormContext.Provider>
        </form>
    );
}

export default Form;

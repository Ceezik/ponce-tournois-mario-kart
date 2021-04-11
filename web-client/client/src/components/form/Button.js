import { useState, useRef, useEffect } from 'react';
import { useFormContext } from './Form';
import Loader from '../utils/Loader';

function Button({ children, loading, disabled, primary = true, ...props }) {
    const { errors } = useFormContext();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && ref.current.getBoundingClientRect().width) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
        if (ref.current && ref.current.getBoundingClientRect().height) {
            setHeight(ref.current.getBoundingClientRect().height);
        }
    }, [children]);

    return (
        <button
            {...props}
            ref={ref}
            style={
                width && height
                    ? {
                          width: `${width}px`,
                          height: `${height}px`,
                      }
                    : {}
            }
            disabled={
                primary
                    ? disabled || Object.entries(errors).length > 0 || loading
                    : disabled || loading
            }
        >
            {loading ? <Loader /> : children}
        </button>
    );
}

export default Button;

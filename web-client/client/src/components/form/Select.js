import React from 'react';
import ReactSelect from 'react-select';
import { useSelector } from 'react-redux';
import { getSelectStyle } from '../../utils/style';

function Select(props) {
    const { theme } = useSelector((state) => state.settings);

    return (
        <ReactSelect
            {...props}
            theme={(defaultStyle) => getSelectStyle(defaultStyle, theme)}
        />
    );
}

export default Select;

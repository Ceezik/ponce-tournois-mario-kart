export const getSelectStyle = (theme) => {
    return {
        ...theme,
        borderRadius: 6,
        colors: {
            ...theme.colors,
            primary: '#ff56a9',
            primary25: '#f3f3f4',
        },
    };
};

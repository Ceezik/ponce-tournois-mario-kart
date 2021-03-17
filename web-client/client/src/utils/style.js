const CSSTheme = {
    light: {
        mainColor: '#ff56a9',
        mainColorLight: '#fda3cf',
        mainBackgroundColor: 'white',
        secondaryBackgroundColor: '#f3f3f4',
        mainTextColor: '#1d1d1d',
        borderColor: '#e6e6e6',
    },
    dark: {
        mainColor: '#ff56a9',
        mainColorLight: '#fda3cf',
        mainBackgroundColor: '#36393f',
        secondaryBackgroundColor: '#2f3136',
        mainTextColor: 'white',
        borderColor: '#202225',
    },
};

export const getSelectStyle = (defaultStyle, theme) => ({
    ...defaultStyle,
    borderRadius: 6,
    colors: {
        ...defaultStyle.colors,
        primary: CSSTheme[theme].mainColor,
        primary25: CSSTheme[theme].secondaryBackgroundColor,
        primary50: CSSTheme[theme].mainColorLight,
        neutral0: CSSTheme[theme].mainBackgroundColor,
        neutral20: CSSTheme[theme].borderColor,
        neutral30: CSSTheme[theme].borderColor,
        neutral40: CSSTheme[theme].borderColor,
        neutral60: CSSTheme[theme].borderColor,
        neutral80: CSSTheme[theme].mainTextColor,
        neutral90: CSSTheme[theme].mainTextColor,
    },
});

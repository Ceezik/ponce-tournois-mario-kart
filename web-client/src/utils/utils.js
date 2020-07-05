export const removeEmptyFields = (data) => {
    Object.keys(data).forEach((key) => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });

    return data;
};

export const removeEmptyFields = (data) => {
    Object.keys(data).forEach((key) => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });

    return data;
};

export const getNbPointsFromPosition = (position) => {
    position = parseInt(position);
    if (position === 1) return 15;
    else if (position === 2) return 12;
    else return 13 - position;
};

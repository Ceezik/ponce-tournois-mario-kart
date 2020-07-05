module.exports = {
    paginate: (page = 0, pageSize = 25) => {
        const offset = page * pageSize;
        const limit = pageSize;

        return {
            offset,
            limit,
        };
    },
};

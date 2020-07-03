module.exports = {
    getCurrent: (req, res, next) => {
        return res.json(req.user);
    },
};

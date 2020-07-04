const cup_ctrl = require('../controllers/cup_ctrl');
const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/cups',
        method: 'get',
        func: cup_ctrl.getAll,
    },

    {
        url: '/cups',
        method: 'post',
        func: [auth_ctrl.isAuthenticated, auth_ctrl.isAdmin, cup_ctrl.create],
    },

    {
        url: '/cups/:cupId',
        method: 'use',
        func: cup_ctrl.loadById,
    },
];

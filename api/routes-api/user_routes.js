const user_ctrl = require('../controllers/user_ctrl');
const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/users',
        method: 'get',
        func: user_ctrl.getAll,
    },

    {
        url: '/users/:username',
        method: 'get',
        func: user_ctrl.getByUsername,
    },

    {
        url: '/users/:userId',
        method: 'put',
        func: [
            auth_ctrl.isAuthenticated,
            auth_ctrl.isAdmin,
            user_ctrl.updateById,
        ],
    },

    {
        url: '/user',
        method: 'get',
        func: [auth_ctrl.isAuthenticated, user_ctrl.getCurrent],
    },

    {
        url: '/user',
        method: 'put',
        func: [auth_ctrl.isAuthenticated, user_ctrl.update],
    },

    {
        url: '/user/editors',
        method: 'post',
        func: [auth_ctrl.isAuthenticated, user_ctrl.addEditor],
    },

    {
        url: '/user/editors/:editorId',
        method: 'delete',
        func: [auth_ctrl.isAuthenticated, user_ctrl.removeEditor],
    },
];

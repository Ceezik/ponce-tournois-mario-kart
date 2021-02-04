const patch_note_ctrl = require('../controllers/patch_note_ctrl');
const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/patch-notes',
        method: 'get',
        func: patch_note_ctrl.getAll,
    },

    {
        url: '/patch-notes',
        method: 'post',
        func: [
            auth_ctrl.isAuthenticated,
            auth_ctrl.isAdmin,
            patch_note_ctrl.create,
        ],
    },
];
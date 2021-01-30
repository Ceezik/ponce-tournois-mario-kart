const patch_note_ctrl = require('../controllers/patch_note_ctrl');

module.exports = [
    {
        url: '/patch-notes',
        method: 'get',
        func: patch_note_ctrl.getAll,
    },
];

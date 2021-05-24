const user_ctrl = require('../controllers/user_ctrl');

module.exports = [
    {
        url: '/ponce',
        method: 'get',
        func: user_ctrl.getPonce,
    },
];

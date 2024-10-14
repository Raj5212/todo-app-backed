const helper = require('../helper/helper');
const User = require('../schema/users');
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    authUser: async (req, res, next) => {
        if (!req.get('Authorization')) {
            return res.json(helper.showErrorResponse('AUTHORIZATION_TOKEN_IS_REQUIRED'));
        }
        let token = req.get('Authorization').replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
    
            const user = await User.findOne({ _id: decoded.id })
            if (!user) {
                return res.json(helper.showUnathorizedErrorResponse('NOT_AUTHORIZED'));
            }
            req.user = user;
            next();

        } catch (error) {
            const resdata = helper.showUnathorizedErrorResponse('INVALID_TOKEN');
            resdata.isInvalidToken = true;
            res.json(resdata);
        }
    }
}
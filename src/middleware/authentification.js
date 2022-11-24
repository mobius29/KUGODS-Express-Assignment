const jwt = require('../utils/jwt');

const authentification = (req, res, next) => {
    const { token } = req.body;

    const verify = jwt.verify(token);
    if (verify.OK) {
        req.id = verify.id;
        req.role = verify.role;

        next();
    } else {
        res.send({
            status: 400,
            message: 'BAD REQUEST',
        })
    }
}

module.exports = {
    authentification
}
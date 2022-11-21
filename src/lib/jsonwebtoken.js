const jwt = require('jsonwebtoken')
const SECRET = 'ThisIsSecretCode'
module.exports = {
    sign: (user) => {
        const payload = {
            id: user.id,
            name: user.username
        }
        return jwt.sign(payload, SECRET, {
            algorithm: 'HS256',
            expiresIn: '7d'
        })
    },
    verify: (token) => {
        try {
            const decoded = jwt.verify(token, SECRET);
            return {
                OK: true,
                id: decoded.id,
                name: decoded.username
            }
        } catch (e) {
            return {
                OK: false,
                message: err.message
            }
        }
    }
};

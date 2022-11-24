const jwt = require('jsonwebtoken');
const SECRET = 'SecretCode'

module.exports = {
    sign: (user) => {
        const payload = {
            id: user.id,
            role: user.role
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
                role: decoded.role
            }
        } catch (e) {
            return {
                OK: false,
                message: err.message
            }
        }
    }
};
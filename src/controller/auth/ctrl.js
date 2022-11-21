const { runQuery } = require('../../lib/database');
const authe = require('../../lib/authentification');
const jwt = require('../../lib/jsonwebtoken');

const register = async (req, res) => {
    //res.send('회원가입입니다.');
    const { username, password, displayname } = req.body;
    if (!username || !password || !displayname) {
        return res.status(400).send('Bad request');
    }
    let pwd = await authe.generate(password);
    const sql =
    'INSERT INTO user (username, password, displayname) VALUES (?, ?, ?)';
    const data = [username, pwd, displayname];
    try {
        const result = await runQuery(sql, data);
        if (result.affectedRows === 1) {
        return res.status(201).send('Created');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal server error');
    }
};

const login = async (req, res) => {
    //res.send('로그인입니다');
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Bad request');
    }
    const sql = 'SELECT * FROM user WHERE username = ?';
    const data = [username];
    try {
        const result = await runQuery(sql, data);
        const cond = await authe.verify(password,result[0].password)
        if (cond) {
            const token = jwt.sign(result[0])
            res.cookie('jwt', token,{maxAge:30*60 * 1000});
            return res.send({
                status: 200,
                message: "login success",
                token: token
            })
        } else {
            return res.send({
                status: 400,
                message: "Bad request",
                token: null
            })
        }
    } catch (e) {
        return res.status(500).send('Internal server error');
    }       
};

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.send('로그아웃입니다.');
};

module.exports = {
    register,
    login,
    logout,
};    
const { runQuery } = require('../../lib/database');
const { use } = require('../users');

const register = async (req, res) => {
    const { username, password, displayname } = req.body;
    if (!username || !password || !displayname) {
        return res.status(400).send('Bed Request');
    }

    const sql = 'INSERT INTO users (username, password, displayname) VALUES (?, ?, ?)';
    const data = [username, password, displayname];

    try {
        const result = await runQuery(sql, data);

        if (result.affectedRows === 1) {
            return res.status(201).send('Created');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal Server Error');
    }
};

const signIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password){
        return res.status(400).send('Bad Request');
    }

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const data = [username, password];

    try {
        const result = await runQuery(sql, data);

        if (result.length === 1) {
            return res.status(200).send('OK');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (e) {
        return res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    register,
    signIn,
};

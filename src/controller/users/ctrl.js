const { runQuery } = require('../../lib/database');

const show = async (req, res) => {
    //res.send('show을 실행하였습니다.');
    const sql = 'SELECT * FROM user';
    try {
        const result = await runQuery(sql);
        return res.status(200).send(result);
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
};

const findByStr = async (req, res) => {
    //res.send('findByStr을 실행하였습니다.');
    const { str } = req.query;
    const sql = 'SELECT * FROM user WHERE displayname LIKE ?';
    const data = ['%'+str+'%'];
    try {
        const result = await runQuery(sql, data);
        //if (result.length === 1) {
            return res.status(200).send(result);
        //} else {
        //    return res.status(400).send('Bad Request');
        //}
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
};

const findById = async (req, res) => {
    //res.send('findById을 실행하였습니다.');
    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';
    const data = [id];
    try {
        const result = await runQuery(sql, data);
        if (result.length === 1) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(400).send('Bad Request');
        }
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
};


const updateUser = async (req, res) => {
    //res.send('유저 정보가 업데이트되었습니다.');
    const { username, password, displayname } = req.body;
    const { id } = req.params;
    if (!username || !password || !displayname) {
    return res.status(400).send('Bad request');
    }
    const sql =
    'UPDATE user SET username=?, password=?, displayname=? WHERE id=?';
    const data = [username, password, displayname, id];
    try {
        const result = await runQuery(sql, data);
        if (result.affectedRows === 1) {
            return res.status(201).send('Updated');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal server error');
    }
};
    
const deleteById = async (req, res) => {
    //res.send('유저 정보가 삭제되었습니다.');
    const { id } = req.params;
    
    const sql =
    'DELETE FROM user WHERE id=?';
    const data = [id];
    try {
        const result = await runQuery(sql, data);
        if (result.affectedRows === 1) {
            return res.status(201).send('Deleted');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal server error');
    }
};
module.exports = {
    show,
    findById,
    findByStr,
    updateUser,
    deleteById,
};    
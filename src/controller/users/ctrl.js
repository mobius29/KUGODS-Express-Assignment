const { runQuery } = require('../../lib/database');

const allUsers = async (req, res) => {
    const sql = 'SELECT * FROM users';

    try {
        const result = await runQuery(sql);

        return res.status(200).send(result);
    } catch (e) {
        return res.status(500).send('Internal Server Error');
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELELCT * FROM users WHERE id = ?';
    const data =[id];

    try {
        const result = await runQuery(sql, data);

        if (result.length === 1) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(400).send('Bad Request');
        }
    } catch (e) {
        return res.status(500).send('Internal Server Error');
    }
};

const register = (req, res) => {
    const { name, age } = req.body;
    obj_list = obj_list.concat({
        id: id++,
        name,
        age,
    });

    res.send(obj_list);
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    idx = obj_list.findIndex((obj) => obj.id === id);
    if (obj_idx === -1){
        res.send('Not Found ');
    } else {
        obj_list[idx] = { id, name, age };
        res.send(obj_list);
    }
};

const signIn = (req, res) => {
    const { userName, password } = req.body;
    const user = datas.find(data => data.userName === userName);

    if (user.password === password){
        const token = jwt.sign(user)

        return res.send({
            status: 200,
            token: token
        })
    } else {
        return res.send({
            status: 400,
            message: 'BAD REQUEST',
            token: null
        })
    }
};

const accessAdminPage = (req, res) => {
    if (!req.role) {
        res.send({
            status: 400,
            message: 'BAD REQUEST'
        })
    } else if (req.role === 'admin'){
        res.send({
            status: 200,
            message: 'SUCCESS'
        })
    } else {
        res.send({
            status: 401,
            message: 'UNAUTHORIZED'
        })
    }
};

module.exports = {
    register,
    updateUser,
    signIn,
    accessAdminPage,
    allUsers,
    getUser,
};
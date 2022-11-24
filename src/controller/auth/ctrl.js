const { runQuery } = require('../../lib/database.js');
const auth = require('../../lib/authentification.js');
const jwt = require('../../lib/jwt.js');

const registerUser = async (req, res) => {
  const sql = 'INSERT INTO user (username, password, displayname) VALUES (?, ?, ?);';
  const { username, password, displayname } = req.body;
  try {
    const encodedPassword = await auth.generate(password);
    await runQuery(sql, [username, encodedPassword, displayname]);
    res.status(200).send('REGISTER COMPLETE');
  } catch (e) {
    res.status(500).send(e);
  }
}

const logIn = async (req, res) => {
  const sql = 'SELECT password FROM user WHERE id = ?;';
  const { id, password } = req.body;
  try {
    const result = await runQuery(sql, [id]);
    if (auth.verify(password, result[0].password)) {
      const token = jwt.sign({id: id, role: 'admin'});
      res.status(200).send(token);
    } else {
      res.status(400).send('LOGIN FAILED');
    }
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
}

const logOut = async (req, res) => {
  const { id } = req.body;
  try {
    const token = jwt.sign({id: id, role: 'user'});
    res.status(200).send(token);
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
}



module.exports = {
  registerUser,
  logIn,
  logOut,
};

const { runQuery } = require('../../lib/database.js');

const getByID = async (req, res) => {
  const sql = 'SELECT * FROM user WHERE id=?;';
  const { id } = req.params;

  try  {
    const result = await runQuery(sql, [id]);
    if (result.length === 1) {
      res.status(200).send(result[0]);
    } else {
      res.status(400).send('Bad Request');
    }
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
};

const getAllName = async (req, res) => {
  const sql = 'SELECT username FROM user;';
  try {
    const result = await runQuery(sql, []);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
}

const getNameByString = async (req, res) => {
  const sql = "SELECT username FROM user WHERE displayname LIKE ?";
  const { string } = req.body;
  try {
    const result = await runQuery(sql, ['%' + string + '%']);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

const modifyNameByID = async (req, res) => {
  const sql = 'UPDATE user SET displayname = ? WHERE id = ?;';
  const { id } = req.params;
  const { newname } = req.body;
  try {
    await runQuery(sql, [newname, id]); 
    res.status(200).send('MODIFY COMPLETE');
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
}

const deleteByID = async (req, res) => {
  const sql = 'DELETE FROM user WHERE id = ?;';
  const { id } = req.params;
  try {
    await runQuery(sql, [id]);
    res.status(200).send('DELETE COMPLETE');
  } catch (e) {
    res.status(500).send('INTERNAL SERVER ERROR');
  }
}

module.exports = {
  getByID,
  getAllName,
  getNameByString,
  modifyNameByID,
  deleteByID,
};

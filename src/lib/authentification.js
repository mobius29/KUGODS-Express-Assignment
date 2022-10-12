const util = require('util');
const crypto = require('crypto');

const pbkdf2 = util.promisify(crypto.pbkdf2);
const randomBytes = util.promisify(crypto.randomBytes);

const generate = async (password) => {
  const algo = 'sha512';
  const salt = await randomBytes(32);
  const iter = parseInt(Math.random() * 20000) + 100000;
  const key_len = 64;

  const digest = await pbkdf2(password, salt, iter, key_len, algo);
  return `${algo}:${salt.toString(
    'base64'
  )}:${iter}:${key_len}:${digest.toString('base64')}`;
};

const verify = async (password, hashedPassword) => {
  const [algo, hashed_salt, hashed_itr, hashed_keylen, hashed_digest] =
    hashedPassword.split(':');
  const salt = Buffer.from(hashed_salt, 'base64');
  const iter = parseInt(hashed_itr);
  const key_len = parseInt(hashed_keylen);
  const digest = Buffer.from(hashed_digest, 'base64');

  const dig = await pbkdf2(password, salt, iter, key_len, algo);
  return Buffer.compare(dig, digest) === 0;
};

module.exports = {
  generate,
  verify,
};

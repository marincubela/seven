const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('./constants');

const hashPassword = async (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      }

      resolve(hash);
    })
  );
};

const arePasswordEqual = (password, hash) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, hash, (err, same) => {
      if (err) {
        reject(err);
      }

      resolve(same);
    })
  );
};

module.exports = {
  hashPassword,
  arePasswordEqual,
};

const bcrypt = require('bcrypt');
const { model } = require('../db/connect');
const { SALT_ROUNDS } = require('./constants');

const hashPassword = async (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
        }

        resolve(hash);
      });
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

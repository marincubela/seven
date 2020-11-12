const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('./constants');

export const hashPassword = async (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      }

      resolve(hash);
    })
  );
};

export const arePasswordEqual = (password, hash) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, hash, (err, same) => {
      if (err) {
        reject(err);
      }

      resolve(same);
    })
  );
};

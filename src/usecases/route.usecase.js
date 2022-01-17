/* eslint-disable no-undef */
const bcrypt = require('bcrypt')

const DEFAULT_SALT_ROUNDS = 10

function hash(plainText) {
  return bcrypt.hash(plainText, DEFAULT_SALT_ROUNDS)
}

module.exports = {
  ...bcrypt,
  hash,
}

const bcrypt = require("bcryptjs");

const hash = pass => {
  return bcrypt.hashSync(pass);
};

const compare = (pass, hashedPass) => {
  return bcrypt.compareSync(pass, hashedPass);
};

module.exports = { hash, compare };

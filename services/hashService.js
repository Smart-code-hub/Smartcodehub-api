const bcrypt = require("bcrypt");
const GenerateHash = async password => {
  const salt = bcrypt.genSaltSync(Math.random());
  return await bcrypt.hash(password, salt);
};
const VerifyHash = async (password, encrypted) => {
  return await bcrypt.compare(password, encrypted);
};
module.exports = { GenerateHash, VerifyHash };

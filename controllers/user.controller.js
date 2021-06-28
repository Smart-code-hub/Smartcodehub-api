const User = require("../schemas/user.schema");
const BaseContoller = require("./base.controller");
const HashService = require("../services/hashService");
const { sign } = require("jsonwebtoken");
const { pick } = require("lodash");
const { environment } = require("../environment");

const constructMessage = (user, link) => {
  return `Hi ${user.name} 
        To Activate your Acoount please click on the link below
        ${link}`;
};

const Authenticate = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).send({ message: "No User Found with this email" });
  const password = req.body.password;
  const result = await HashService.VerifyHash(password, user.password);
  if (!result) return res.status(400).send({ message: "Wrong Password" });

 
  const payload = {
    ...pick(user, ["email", "name", "_id", "userType"])
  };
  const token = sign(payload, environment.secret);
  res.send({ ...payload, token });
};

const Create = async (req, res, next) => {

  try {
    const hashedPassword = await HashService.GenerateHash(req.body.password);

    const randomSalt = Math.round(Math.random() * 100000);
    let user = await User.create({
      ...req.body,
      salt: randomSalt,
      password: hashedPassword
    });


    user = await User.findByIdAndUpdate(user._id, {
      ...req.body,
      salt: randomSalt,
      isEmailVerified: true,
      password: hashedPassword
    });
    return res.send(user);
  } catch (error) {
    console.log(error);

    next(error)

  }
};
const resendEmail = async (req, res, next) => {
  const email = req.params["email"];
  let user = await User.findOne({
    email: email
  });
  if (!user) return res.status(400).send(`Bad Request `);
  const randomSalt = user.salt ? user.salt : Math.round(Math.random() * 100000);

  if (!user.salt) {
    user = await User.update(
      { _id: user.id },
      {
        $set: { salt: randomSalt }
      }
    );
  }

  return res.send(messaeres);
};
const verifyUserEmail = async (req, res, next) => {
  const id = req.params["id"];
  const salt = req.params["randomString"];

  if (!id || !salt) {
    return res.status(400).send(`Bad Request `);
  }
  let user = await User.findOne({
    _id: id,
    salt: salt
  });
  if (!user) return res.status(400).send(`Bad Request `);

  user = await User.updateOne(
    { _id: id, salt },
    {
      $set: { isEmailVerified: true }
    }
  );
  return res.send(
    "Thanks for validating your email Visit https://start.smartcodehub.com and login"
  );
};

module.exports = {
  ...BaseContoller(User),
  Authenticate,
  Create,
  resendEmail,
  verifyUserEmail
};

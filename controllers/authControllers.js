const { compare } = require('bcrypt');
const { promisify } = require('util');

const { getHashedPassword, updateUserData, deleteUser } = require('../models/authModels');


const login = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await getHashedPassword(id);
    const match = await compare(password, hashedPassword);

    if (!match) {return res.status(401).json({ message: "wrong credentials" })};

    const regenerate = promisify(req.session.regenerate.bind(req.session));
    await regenerate();

    req.session.userId = id;
    res.status(200).json({ message: "logged in" });

  } catch (error) {
    next(error);
  };
};

const logout = async (req, res, next) => {
  try {

    const destroy = promisify(req.session.destroy.bind(req.session));
    await destroy();

    res.clearCookie('connect.sid');
    res.json({ message: 'logged out' });

  } catch (error) {
    next(error);
  };
};

const patchUserData = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { userName, dateOfBirth, emailAddress, phoneNumber } = req.body;

    await updateUserData(userName, dateOfBirth, emailAddress, phoneNumber, id);

    res.status(200).json({ message: "user data changed" });

  } catch (error) {
    next(error);
  };
};

const removeUser = async (req, res, next) => {
  try {

    const { id } = req.params
    await deleteUser(id)

    res.status(200).json({ message: "user deleted successfully" })

  } catch (error) {

  }
};


module.exports = {
  login,
  logout,
  patchUserData,
  removeUser
};
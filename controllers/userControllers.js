const { allUsers, userById, createUser } = require("../models/userModels");
const bcrypt = require('bcrypt');


const allUsersList = async (req, res, next) => {
  try {
    const result = await allUsers();
    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userById(id);
    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};


const createAccount = async (req, res, next) => {
  try {

    const { userName, dateOfBirth, emailAddress, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(userName, dateOfBirth, emailAddress, phoneNumber, hashedPassword);
    res.status(201).json({ message: "user created" });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  allUsersList,
  userProfile,
  createAccount
};
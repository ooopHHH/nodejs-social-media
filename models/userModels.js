const pool = require('../db');


const allUsers = async () => {
  try {
    const list = await pool.query(`SELECT * FROM users`);
    return list;
  } catch (error) {
    throw error;
  }
};

const userById = async function(id) {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

const createUser = async function(userName, dateOfBirth, emailAddress, phoneNumber, hashedPassword) {
  try {
    await pool.query(
      `INSERT INTO users (user_name, date_of_birth, email_address, phone_number, password) 
      VALUES ($1, $2, $3, $4, $5)`,
      [userName, dateOfBirth, emailAddress, phoneNumber, hashedPassword]
    );
  } catch (error) {
    throw error
  }
};


module.exports = {
  allUsers,
  userById,
  createUser
};
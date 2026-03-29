const pool = require('../db');


const getHashedPassword = async function (id) {
  try {

    const { rows } = await pool.query(`SELECT password FROM users WHERE id = $1`, [id]);
    return rows[0].password;

  } catch (error) {
    throw error
  }
}

const updateUserData = async function (userName, dateOfBirth, emailAddress, phoneNumber, id) {
  try {

    await pool.query(`UPDATE users SET
      user_name = COALESCE($1, user_name),
      date_of_birth = COALESCE($2, date_of_birth),
      email_address = COALESCE($3, email_address),
      phone_number = COALESCE($4, phone_number)
      WHERE id = $5`, 
      [userName, dateOfBirth, emailAddress, phoneNumber, id]);

  } catch (error) {
    throw error
  };
};

const deleteUser = async function (id) {
  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id])
  } catch (error) {
    throw error
  }
};


module.exports = {
  getHashedPassword,
  updateUserData,
  deleteUser
};
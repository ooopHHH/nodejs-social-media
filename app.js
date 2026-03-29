require('dotenv').config();

const express = require('express');

const app = express();

require('./loaders/express')(app);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`)
});

/* 
{
    "userName": "Josue Putrique",
    "dateOfBirth": "1963-12-28T02:00:00.000Z",
    "emailAddress": "jputrique@uol.com.br",
    "phoneNumber": "+554197351410",
    "password": "12345"
}
*/
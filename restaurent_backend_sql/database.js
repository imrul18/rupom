const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meal_management'
})

con.connect((err) => {
    if (err) console.log("fail",err);
    else console.log("connected");
})

module.exports = con
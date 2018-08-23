var faker = require('faker');
var mysql = require('mysql');
var dotenv = require('dotenv').config();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  //root username (leave as root)
  database : 'Waiting_List',   
  password : process.env.MYSQL_PW   //root user's password
});
  
var data = [];

for(var i = 0; i < 1427; i++){
    data.push([
          faker.internet.email(),
          faker.date.past()
    ]);
};

var queryINSERT = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(queryINSERT, [data], function(error, result) {
  console.log(error);
  console.log(result);
});


connection.end();










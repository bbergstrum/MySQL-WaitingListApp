var     express     = require('express');
var     mysql       = require('mysql');
var     bodyParser  = require('body-parser');
var     dotenv      = require('dotenv').config();
var     app         = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/stylesheets"));

var connection = mysql.createConnection({
  host     : process.env.RDS_ENDPOINT,
  user     : process.env.MYSQL_USER,
  database : process.env.MYSQL_DB,
  password : process.env.MYSQL_PW
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) AS count FROM users'; //count users in db
    connection.query(q, function(error, results){
       if(error) throw error;
       var count = results[0].count; // store count in variable
       res.render('landing', {count: count}); //render landing with count data
    });
});

app.post('/register', function(req,res){
        var email = {email: req.body.email}; // save form submission data to variable
         connection.query('INSERT INTO users SET ?', email, function(err, result) { //query & check db then insert new data
         console.log(err);
         console.log(result);
         res.redirect("/");
     });
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Waiting List Started...")
});

var     express     = require('express');
var     mysql       = require('mysql');
var     bodyParser  = require('body-parser');
var     dotenv      = require('dotenv').config();
var     app         = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/stylesheets"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  //root username (leave as root)
  database : 'Waiting_List',   
  password : process.env.MYSQL_PW   //root user's password
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, function(error, results){
       if(error) throw error;
       var count = results[0].count;
       res.render('landing', {count: count});
    });
});

app.post('/register', function(req,res){
        var email = {email: req.body.email};
         connection.query('INSERT INTO users SET ?', email, function(err, result) {
         console.log(err);
         console.log(result);
         res.redirect("/");
     });
});




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Waiting List Started...")
});
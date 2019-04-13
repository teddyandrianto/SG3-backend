let mysql = require('mysql');

let  con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "db_kuliah"
});

con.connect(function(err){
    if(err) throw err;
    console.log("koneksi db berhasil")
});

module.exports = con;
const mysql = require('mysql');


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'agenda'
    });
    
    mysqlConnection.connect( (err) => {
        if (err) {
           // console.log('Error en db: ', + err);
           console.error(err.stack)
            return;
        }else{
            console.log('Db ok');
        }
        
    }); 
      
    
    module.exports = mysqlConnection;




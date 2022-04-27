const configDb={
<<<<<<< HEAD
    host     : process.env.MYSQL_HOST || 'localhost',
    user     : process.env.MYSQL_USERNAME || 'root',
    password : process.env.MYSQL_PASSWORD || '',
    database : process.env.MYSQL_DATABASE || 'weekly',
=======
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'weekly',
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
    multipleStatements :true
  }

module.exports=configDb
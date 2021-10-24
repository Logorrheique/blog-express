//mysql
const mysql = require('mysql');

//database config
const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host    : 'localhost',
    user    : 'root',
    password: 'RA71K2CWFH/3B,',
  },
};
console.log(`Succesfully connected to`,config.db.database,`database`)

//create connection with DB
const connectionDB = mysql.createConnection(config.db);

connectionDB.connect(function(err) {
  if (err) throw err;
  connectionDB.query(sql, (err, result) => {
      if (err)
        throw err;
    });
});

module.exports = config;

/*
CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_email VARCHAR (255),
  user_name VARCHAR (25),
  user_picture VARCHAR (255),
  );


CREATE TABLE post_list(
  user_id INT,
  post INT,
  FOREIGN KEY (user_Id) REFERENCES user(user_id),
  FOREIGN KEY (post) REFERENCES post(post_id),
);

CREATE TABLE post(
  post_id INT PRIMARY KEY AUTO_INCREMENT,
  post_title VARCHAR (255),
  post_content VARCHAR (3000),
)

*/
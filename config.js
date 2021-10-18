
const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host    : 'localhost',
    user    : 'root',
    password: 'RA71K2CWFH/3B,',
  },
};
console.log(`Succesfully connected to`,config.db.database,`database`)

module.exports = config; 

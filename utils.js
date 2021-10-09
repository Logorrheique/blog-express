// mysqlinstructions(Name of your express App,Connection with the database, string : routes , string : SQL Instructions )
function mysqlAction(expressAppName,ConnectionToDatabase,route,SQL_instruction){
    expressAppName.get(route,function(res,req){
        ConnectionToDatabase.query(SQL_instruction,function(err,result){
            if (err) throw err;
            console.log(SQL_instruction + " Executed");
        })
    })
}
module.exports = mysqlAction;


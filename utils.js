function mysqlActions(expressAppName,ConnectionToDatabase,route,SQL_action){
    expressAppName.get(route,function(res,req){
        ConnectionToDatabase.query(SQL_action,function(err,result){
            if (err) throw err;
            console.log(SQL_action + " Executed");
        })
    })
}
module.exports = mysqlActions;
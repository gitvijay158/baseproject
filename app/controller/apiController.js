var dbConn = require('./app/config/mysqldb.js');




exports.getServerLogDetails = async function (req, res){

    // dbConn.query("SELECT * FROM `server_up_time` WHERE is_migrated=0  ORDER BY `id` limit 10000", function (err, result) {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //     }
    //     else {

    //         for (const data of result) {
    //             var output = convertTime(data)


    //         }
    //     }

}


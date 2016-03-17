var express = require('express');
var app = express();
var pg = require("pg");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var conString = "pg://postgres:1234@localhost:5432/postgres";

var client = new pg.Client(conString);
client.connect();

app.use(express.static("html"));

app.get('/home', function (req, res) {
   res.sendFile( __dirname + "/" + "/html/home.html" );
});

app.get('/infoentry', function (req, res) {
   res.sendFile( __dirname + "/" + "/html/infoentry.html" );
});

app.get('/search', function (req, res) {
   res.sendFile( __dirname + "/" + "/html/search.html" ); 
});

app.get('/overview', function (req, res) {
//    console.log('done');
    //client.query("select * from canteen", function(err, result){
      //  console.log(result.rows);
        //res.render('./http/html/overview.html', {data: result.rows});
        res.sendFile( __dirname + "/" + "/html/overview.html");
        //res.send(result.rows);
    });
app.get('/searchInfo', function (req, res) {
   res.sendFile( __dirname + "/" + "/html/searchinfo.html" ); 
});
   //res.sendFile( __dirname + "/" + "./http/html/overview.html" );

/*app.get('/putData',function(req,res){
        console.log(res);
    res.send(res);
});*/
app.get('/putData', function(req, res){
    insertData(req.query, function(err, responseObject){
            res.send(responseObject);
    });
});

var insertData = function(queryObject, callback){
    client.query("INSERT INTO canteen (emp_id,nameofitem,costofitem) values ($1,$2,$3)", [queryObject.emp_id, queryObject.nameofitem, queryObject.costofitem], function(err, result){
        if(!err) {
            console.log(result);
//          client.end();
            callback(null, "Success");
        }
    });
};
app.get('/searchData', function(req, res){
    console.log(req.query.emp_id);
     client.query("SELECT * FROM canteen where emp_id=($1)",[req.query.emp_id],function(err,result){
       //  if(!err){
         // console.log(err);
       // console.log(result.rows[0]);
       // res.render('/http/html/searchinfo.html' ,{'data':result.rows});     
         res.send(result.rows);
         
     });
});
    
       // res.render('./http/html/overview.html', {data: result.rows});
    
/*app.get('/putData', function(req, res){
    insertData(req.query, function(err, responseObject){
            res.send(responseObject);
    });
});
*/
app.get('/information', function (req, res) {
	console.log(req.query);
	// Prepare output in JSON format
   	response = {
       		employee:req.query.empId,
       		item:req.query.itemName,
		cost:req.query.itemCost
   	};
   	res.send(response);
});

// client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
// client.query("INSERT INTO canteen(emp_id, nameofitem,costofiem) values($1,$2,$3)", ['123', 'lays','20']);
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

/*var query = client.query("SELECT *from canteen");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});*/
/*app.get("/information",function(req,res){

	  var employee = req.query.employee;
    console.log("in node js ====="+employee);
res.sendFile(__dirname+"/infoentry.html");

})	*/	
app.get('/getdata',function (req, res){
    client.query("select * from canteen", function(err, result){
        console.log(result.rows);
       // res.render('./http/html/overview.html', {data: result.rows});
        res.send(result.rows);
    });
});
/*app.get('/putData',function(req,res){
    console.log(res);
    res.send(res)
});*/

/*app.post('/test', function(req, res) {
    console.log("Information received !");
    console.log(req.body);
    res.send("Ok!");
});
*/
/*setTimeout(function () {
    console.log('hi')
    console.log('timeout completed'); 
}, 1000); 
setInterval(function () { 
    console.log('second passed'); 
}, 1000); */
/*var count = 0; 
var intervalObject = setInterval(function () { 
        count++; 
        console.log(count, 'seconds passed'); 
        if (count == 5) { 
            console.log('exiting'); 
           clearInterval(intervalObject); 
        } 
    }, 1000);
    */
/*var counter = 0;
var seconds = 0;
var short = 1;
setInterval(function() {
    console.log('1');
        counter ++;
    }, 1);
setInterval(function() {
        seconds ++;
        console.log('Seconds: ' + seconds + ', counter: ' +
             counter + ', missed ' +
             (seconds * 1000 / short - counter));
    }, 1000);
*/

/*var results = [];

setTimeout(function() {
       console.log('Task 1');
       results[0] = 1;
       setTimeout(function() {
              console.log('Task 2');
              results[1] = 2;
              setTimeout(function() {
                     console.log('Task 3');
                     results[2] = 3;
              }, 100);
              }, 300);
}, 500);

*/
/*var async = require('async');
async.series([
  function(callback) {
    setTimeout(function() {
      console.log('Task 1');
      callback(null, 1);
    }, 5000);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task 2');
      callback(null, 2);
    }, 1000);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task 3');
      callback(null, 3);
    }, 2000);
  }
], function(error, results) {
  console.log(results);
});
*/
/*var async = require('async');

async.parallelLimit([
  function(callback) {
    setTimeout(function() {
      console.log('Task 1');
      callback(null, 1);
    }, 300);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task 2');
      callback(null, 2);
    }, 5000);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task 3');
      callback(null, 3);
    }, 100);
  }
], 3, function(error, results) {
  console.log(results);
});
  */


/*var async = require('async');

async.waterfall([
  function(callback) {
    callback(null, 12, 15);
  },
  function(a, b, callback) {
    callback(null, (a + b) * 10);
  },
  function(cc, callback) {
    callback(null, Math.sqrt(cc));
  }
], function(error, c) {
  console.log(c);
});*/

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at ");

});

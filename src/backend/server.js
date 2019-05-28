'use strict';
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'My693914',
    database: 'reportengine',
    multipleStatements: true
});
// connection.connect(err => {
//     if (err) {
//         return err;
//     }
// });  
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('go to info to see info')
});
app.get('/generalinfo', (req, res) => {
    console.log("get request made from ip " + req.ip );
    const selectInfo = `SELECT  *, DATE_FORMAT(startdate,'%Y-%m-%d') as startdate FROM generalinfo ORDER BY generalinfo_id DESC`;
    connection.query(selectInfo, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/users', (req, res) => {

  var username = req.body.data.userName;
  var password = req.body.data.userPassword;
  const exist = `SELECT EXISTS (SELECT 1 FROM users WHERE username='${username}' AND userpassword = '${password}')`
    connection.query(exist, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.get('/allusers', (req, res) => {
    const q = `SELECT  * FROM users`
      connection.query(q, (err, results) => {
          if (err) {
              return res.send(err);
          }
          else {
              return res.json({
                  data: results
              })
          }
      });
  });
app.post('/users/add', (req, res) => {
    var adminname = req.body.data.adminName;
    var username = req.body.data.userName;
    var password = req.body.data.userPassword;
    const exist = `INSERT INTO users(adminname,username,userpassword) VALUES('${adminname}','${username}','${password}')`
      connection.query(exist, (err, results) => {
          if (err) {
              return res.send(err);
          }
          else {
              return res.json({
                  data: results
              })
          }
      });
  });
  app.post('/users/remove', (req, res) => {
    var username = req.body.data.userName;
    console.log(username);
    const deleteuser = `DELETE FROM users WHERE username = '${username}'`;
      connection.query(deleteuser, (err, results) => {
          if (err) {
              return res.send(err);
          }
          else {
              return res.json({
                  data: results
              })
          }
      });
  });
app.post('/admins', (req, res) => {
    console.log(req.ip + " ips geldi");
    var username = req.body.data.userName;
    var password = req.body.data.userPassword;
    const exist = `SELECT EXISTS (SELECT 1 FROM admins WHERE adminname ='${username}' AND adminpassword = '${password}')`
      connection.query(exist, (err, results) => {
          if (err) {
              return res.send(err);
          }
          else {
              return res.json({
                  data: results
              })
          }
      });
  });
app.post('/generalinfo/add', (req, res) => {
    var { startdate,caseid,gpsproduct,fromcompletedby,customername,pname } = req.query;
    var des = getClear(req.body.data.description);
   
    let sql = `INSERT INTO generalinfo (startdate,caseid,gpsproduct,fromcompletedby,customername,description,pname) VALUES ('${startdate}','${caseid}','${gpsproduct}','${fromcompletedby}','${customername}','${des}','${pname}')`
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/generalinfo/remove', (req, res) => {
    console.log("generalinfo remove post req made from " + req.ip);
    var {generalinfo_id } = req.query;
    let sql = `DELETE FROM generalinfo WHERE generalinfo_id = ${generalinfo_id}`
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/generalinfo/update', (req, res) => {
    var { generalinfo_id,startdate,caseid,gpsproduct,fromcompletedby,customername,pname } = req.query;
    var des = getClear(req.body.data.description);
    let sql = `UPDATE generalinfo SET startdate = '${startdate}', caseid = '${caseid}', gpsproduct = '${gpsproduct}', 
    fromcompletedby = '${fromcompletedby}', customername = '${customername}', description = '${des}', pname = '${pname}'
    WHERE generalinfo_id = '${generalinfo_id}'`;
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});
app.post('/fieldcontents/add', (req, res) => {
    var {caseid,pname,field1,field2,field3,field4,field5,field6,field7,field8,field9 } = req.query;
    let sql = `INSERT INTO fieldcontents (pname,field1,field2,field3,field4,field5,field6,field7,field8,field9,caseid) VALUES ('${pname}','${field1}','${field2}','${field3}','${field4}','${field5}','${field6}','${field7}','${field8}','${field9}','${caseid}')`
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/fieldcontents/remove', (req, res) => {
    var caseid = req.query.caseid;
    console.log(caseid);
    let sql = `DELETE FROM fieldcontents WHERE caseid = '${caseid}'`;
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.get('/problems', (req, res) => {
    let sql = 'SELECT * FROM problems';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/problems/remove', (req, res) => {
    var problemname = req.query.problemName;

    const deleteproblem = `DELETE FROM problems WHERE problemname = '${problemname}'`;

    connection.query(deleteproblem, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/products/remove', (req, res) => {
    var productname = req.query.productName;
 
    const deleteproduct = `DELETE FROM products WHERE productname = '${productname}'`;

    connection.query(deleteproduct, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.get('/problemfields', (req, res) => {
    var {pname} = req.query;
    let sql = `SELECT * FROM problemfields WHERE pname = '${pname}' ;`;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.get('/fieldcontents', (req, res) => {
    var {caseid} = req.query;
    let sql = `SELECT * FROM fieldcontents WHERE caseid = '${caseid}' LIMIT 1`;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/fieldcontents/update', (req, res) => {
    var {field,content,caseid,pname} = req.query;
    let sql = `UPDATE fieldcontents SET ${req.query.field} = '${req.query.content}', pname = '${req.query.pname}' WHERE caseid = '${req.query.caseid.trim()}'`;
    console.log("sql basıldı\n" + sql);

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/products/add', (req, res) => {
    var { productname } = req.query;
    let in2 = 'asd';
    let sql = `INSERT INTO products (productname) VALUES ('${productname}')`;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });

});
app.post('/problems/add', (req, res) => {
    var {problemname} = req.query;
    let sql = `INSERT INTO problems (problemname) VALUES ('${problemname}')`;
   

     connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
    //////////////////////////////////inserting problemfields
   
});
app.post('/problemfields/add', (req, res) => {
    var {problemname,problemfields} = req.query;
    var parsed = parsefields(problemfields);
    var sql = getQuery(parsed, problemname);
   

     connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
   
});
function parsefields(problemfields) {
    var fields = [];
    fields = problemfields.split(",");
    return fields;
}
function getQuery(parsed, problemname) {
    var ln = parsed.length;
    var result = `INSERT INTO problemfields (pname`;
    for (var i = 1; i <= ln; i++) {
        result = result.concat(`,field${i}`);
    }
    result = result.concat(`) VALUES('${problemname}'`);
    for (var i = 0; i < ln; i++) {
        result = result.concat(`,'${parsed[i]}'`);
    }
    result = result.concat(`)`);
    return result;
}
function getClear(text){
    var result = text.replace(/'/g,"''");
    return result;
}

app.listen(4000, '0.0.0.0')
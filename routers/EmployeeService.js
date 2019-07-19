var express = require('express');
var router = express.Router();
const grpc = require("grpc");
const protoLoader = require('@grpc/proto-loader');
const protoPath = protoLoader.loadSync('proto/employees.proto');
const proto = grpc.loadPackageDefinition(protoPath);
const client = new proto.employees.EmployeesService("localhost:5050", grpc.credentials.createInsecure());



router.get('/getEmp',(req, res) => {
  client.List({},(err, resp)=>{
      res.send(resp);
  })
})

router.get('/getEmp/:id',(req, res) => {
  console.log(req.params.id)
  client.Get({employeeId: req.params.id}, (err, resp) => {
    res.send(resp);
  });
})

router.delete('/delEmp/:id',(req, res) => {
  client.Remove({employeeId: req.params.id}, (err, resp) => {
    console.log()
    res.send("Employee Deleted");
  });
})

router.post('/postEmp',  (req, res) => {
  client.Insert({
     employeeId: req.body.employee_id,
     name: req.body.name,
     email: req.body.email}, (err, resp) => {
       res.send("Employee Inserted")
  });
})

module.exports = router
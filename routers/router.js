var express = require('express');
var router = express.Router()
var employeeRouter = require('./EmployeeService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})
router.use(employeeRouter)



module.exports = router
const express = require("express");
const router = express.Router();

const { getEmployees,
        addEmployee,
        getEmployee, 
        editEmployee,
        deleteEmployee} = require("../controllers/employeeController");
// const validationToken = require("../middleware/validateTokenHandler");
       
router.route("/").get(getEmployees);
router.route("/").post(addEmployee);
router.route("/:id").get(getEmployee);
router.route("/:id").put(editEmployee);
router.route("/:id").delete(deleteEmployee);



module.exports = router;
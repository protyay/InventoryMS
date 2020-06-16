module.exports = app => {
    const userregistration = require("../controllers/registration.controller");

    var router = require("express").Router();
    router.post("/", userregistration.create);

    router.get("/",userregistration.findAll)
    app.use('/ims/userregister', router);
  };
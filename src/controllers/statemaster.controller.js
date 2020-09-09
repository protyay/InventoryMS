const db = require("../models");
const StateMst = db.stateMst;
const Op = db.Sequelize.Op;

exports.findAll = async(req,res)=>{
    try{
        const states = await StateMst.findAll();
        res.send({ success: true, data: states });
    }catch(err){
        res.status(500).send({ success: false, error: { reason: 'Error occurred . Please try again!' } });
    }
}
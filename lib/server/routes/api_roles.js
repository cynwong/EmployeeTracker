// for /api/roles routes

const router = require("express").Router();

const roles = require("../../models/roles_model");

router.get("/", (req, res)=>{
    roles.all(function(err,data){
        if(err){
            console.error(err);
            return res.status(500).statusMessage("Unable to retrieve data");
        }
        console.log(data);
        res.status(200).json({data});
    });

});

module.exports = router;
// for /api/departments routes

const router = require("express").Router();

const departments = require("../../models/departments_model");

// get all roles
router.get("/", (_, res)=>{
    departments.all(function(err,data){
        if(err){
            console.error(err);
            return res.status(500).statusMessage("Unable to retrieve data");
        }
        res.status(200).json({data});
    });
});

// get one role
router.get("/:id",(req,res)=>{
    const condition = `id = ${req.params.id}`;

    departments.select("*",condition,(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).statusMessage("Unable to retrieve data");
        }
        res.status(200).json({data});
    })
});



module.exports = router;
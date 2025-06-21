const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");

router.get("/", function(req, res) {
    res.send("Hey");
});

if(process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            return res
            .status(500)
            .send("You don't have permission to create a new owner.");
        }

        let {fullname, email, password, gstin} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            gstin
         });

        res.status(201).send(createdOwner);
    });
}


module.exports = router;
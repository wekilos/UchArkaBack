const express = require("express");
// const { verify } = require("crypto");
const Func = require("../functions/functions");
const sequelize = require("../../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cache = require("../../config/node-cache");
const path = require("path");

// Controllers
const UserControllers = require("../controller/userController");
const PhoneControllers = require("../controller/phoneController");
const InfoControllers = require("../controller/infoController");

// // Routes

// Employee Routes
router.get("/user/all", cache.get, UserControllers.getAll, cache.set);
router.get("/user/:id", cache.get, UserControllers.getOne, cache.set);
router.post("/user/create", UserControllers.create);
router.patch("/user/update", UserControllers.update);
router.delete("/user/destroy/:id", UserControllers.Destroy);

// Phone Routes
router.get("/phone/all", cache.get, PhoneControllers.getAll, cache.set);
router.get("/phone/:id", cache.get, PhoneControllers.getOne, cache.set);
router.post("/phone/create", PhoneControllers.create);
router.patch("/phone/update", PhoneControllers.update);
router.delete("/phone/destroy/:id", PhoneControllers.Destroy);

// Info Routes
router.get("/info/all", cache.get, InfoControllers.getAll, cache.set);
router.get("/info/:id", cache.get, InfoControllers.getOne, cache.set);
router.post("/info/create", InfoControllers.create);
router.patch("/info/update", InfoControllers.update);
router.delete("/info/destroy/:id", InfoControllers.Destroy);

// For Token

function verifyToken(req, res, next) {
    const bearerHeader =
        req.headers["authorization"] || req.headers["Authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, Func.Secret(), (err, authData) => {
            if (err) {
                res.json("err");
                console.log(err);
            } else {
                req.id = authData.id;
            }
        });
        next();
    } else {
        res.send("<center><h2>This link was not found! :(</h2></center>");
    }
}

module.exports = router;

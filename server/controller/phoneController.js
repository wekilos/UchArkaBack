var Sequelize = require("sequelize");
const { User, Phone, Info } = require("../../models");
var sequelize = require("../../config/db");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
    const { UserId } = req.query;
    Phone.findAll({
        include: [
            {
                model: User,
            },
        ],
        where: {
            UserId: UserId,
        },
        order: [["id", "ASC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};

const getOne = async (req, res) => {
    const { id } = req.params;
    const data = await Phone.findOne({ where: { id: id } });
    if (data) {
        Phone.findOne({
            include: [
                {
                    model: User,
                },
            ],
            where: {
                id: id,
            },
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    } else {
        res.send("BU ID boyuncha Phone yok!");
    }
};

const create = async (req, res) => {
    const { phone, UserId } = req.body;

    Phone.create({
        phone,
        UserId,
    })
        .then(async (data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json("create phone:", err);
        });
};

const update = async (req, res) => {
    const { phone, UserId, id } = req.body;

    const data = await Phone.findOne({ where: { id: id } });
    if (!data) {
        res.json("Bu Id boyuncha Phone yok!");
    } else {
        Phone.update(
            {
                phone,
                UserId,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(async (data) => {
                res.json("updated");
            })
            .catch((err) => {
                console.log(err);
                res.json("update phone:", err);
            });
    }
};

const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await Phone.findOne({ where: { id } });
    if (data) {
        Phone.destroy({
            where: {
                id,
            },
        })
            .then(async () => {
                res.json("destoyed!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Phone yok!");
    }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;

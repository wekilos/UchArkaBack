var Sequelize = require("sequelize");
const { User, Phone, Info } = require("../../models");
var sequelize = require("../../config/db");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
    const { UserId } = req.query;
    Info.findAll({
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
    const data = await Info.findOne({ where: { id: id } });
    if (data) {
        Info.findOne({
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
        res.send("BU ID boyuncha Info yok!");
    }
};

const create = async (req, res) => {
    const { fullName, relation, year, birthPlace, job, address, jail, UserId } =
        req.body;

    Info.create({
        fullName,
        relation,
        year,
        birthPlace,
        job,
        address,
        jail,
        UserId,
    })
        .then(async (data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json("create info:", err);
        });
};

const update = async (req, res) => {
    const {
        fullName,
        relation,
        year,
        birthPlace,
        job,
        address,
        jail,
        UserId,
        id,
    } = req.body;

    const data = await Info.findOne({ where: { id: id } });
    if (!data) {
        res.json("Bu Id boyuncha Info yok!");
    } else {
        Info.update(
            {
                fullName,
                relation,
                year,
                birthPlace,
                job,
                address,
                jail,
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
                res.json("update info:", err);
            });
    }
};

const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await Info.findOne({ where: { id } });
    if (data) {
        Info.destroy({
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
        res.json("Bu Id Boyuncha Info yok!");
    }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;

var Sequelize = require("sequelize");
const { User, Phone, Info } = require("../../models");
var sequelize = require("../../config/db");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
    const { filter } = req.query;
    const Filter =
        filter &&
        (filter.length > 0
            ? {
                  [Op.or]: [
                      { fullName: { [Op.like]: `%${filter}%` } },
                      { address: { [Op.like]: `%${filter}%` } },
                  ],
              }
            : null);

    User.findAll({
        include: [
            {
                model: Phone,
            },
            {
                model: Info,
            },
        ],
        where: {
            [Op.and]: [Filter],
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
    const data = await User.findOne({ where: { id: id } });
    if (data) {
        User.findOne({
            include: [
                {
                    model: Phone,
                },
                {
                    model: Info,
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
        res.send("BU ID boyuncha User yok!");
    }
};

const create = async (req, res) => {
    const { fullName, address } = req.body;

    User.create({
        fullName,
        address,
    })
        .then(async (data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json("create User:", err);
        });
};

const update = async (req, res) => {
    const { fullName, address, id } = req.body;

    const data = await User.findOne({ where: { id: id } });
    if (!data) {
        res.json("Bu Id boyuncha User yok!");
    } else {
        User.update(
            {
                fullName,
                address,
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
                res.json("update User:", err);
            });
    }
};

const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await User.findOne({ where: { id } });
    if (data) {
        User.destroy({
            where: {
                id,
            },
        })
            .then(async () => {
                await Phone.destroy({ where: { UserId: id } });
                await Info.destroy({ where: { UserId: id } });
                res.json("destoyed!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha User yok!");
    }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;

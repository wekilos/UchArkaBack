"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User);
        }
    }
    Info.init(
        {
            fullName: DataTypes.STRING,
            relation: DataTypes.STRING,
            year: DataTypes.INTEGER,
            birthPlace: DataTypes.TEXT,
            job: DataTypes.TEXT,
            address: DataTypes.TEXT,
            jail: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Info",
        }
    );
    return Info;
};

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("servicios", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql"
  });

export default sequelize;
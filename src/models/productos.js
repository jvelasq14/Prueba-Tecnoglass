import { DataTypes } from "sequelize";
import sequelize from "../database/conexion.js";
import { Ordenes } from "./ordenes.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     productos:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "string"
 *         ordeneId:
 *           type: integer
 *           example: 0
 *         descripcion:
 *           type: string
 *           example: "string"
 *         alto:
 *            type: string
 *            example: "string"
 *         ancho:
 *            type: string
 *            example: "string"
 *         estado:
 *            type: integer
 *            example: 0
 */
export const Productos = sequelize.define("productos",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        consecutivo: {
            type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING
        },
        ordeneId: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        },
        alto: {
            type: DataTypes.STRING
        },
        ancho: {
            type: DataTypes.STRING
        },
        estado: {
            type: DataTypes.INTEGER
        },
        fecha_modificacion: {
            type: DataTypes.DATE
        },

    },
    {
        timestamps: false,
    }
);

Ordenes.hasMany(Productos, {
    foreinkey: "ordeneId",
    sourceKey: "id",
  });
  Productos.belongsTo(Ordenes, { foreinkey: "ordeneId", targetId: "id" });
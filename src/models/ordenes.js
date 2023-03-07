import { DataTypes } from "sequelize";
import sequelize from "../database/conexion.js";

import { Clientes } from "./clientes.js"
import { Estados } from "./estados.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     ordenes:
 *       type: object
 *       properties:
 *         clienteId:
 *           type: integer
 *           example: 0
 *         fecha_orden:
 *           type: date
 *           example: 2023-03-06
 *         estadosaprobacioneId:
 *           type: integer
 *           example: 0
 *         estado:
 *            type: integer
 *            example: 0
 */
export const Ordenes = sequelize.define("ordenes",
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        clienteId: {
            type: DataTypes.INTEGER
        },
        fecha_orden: {
            type: DataTypes.DATE
        },
        estadosaprobacioneId: {
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

Clientes.hasMany(Ordenes, { 
    foreinkey: "clienteId",
    sourceKey: "id",
  });
  Ordenes.belongsTo(Clientes, { foreinkey: "clienteId", targetId: "id" });
  
  Estados.hasMany(Ordenes, { 
    foreinkey: "estadosaprobacioneId",
    sourceKey: "id",
  })
  Ordenes.belongsTo(Estados,  { foreinkey: "estadosaprobacioneId", targetId: "id" })
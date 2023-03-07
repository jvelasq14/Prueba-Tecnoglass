import { DataTypes } from "sequelize";
import sequelize from "../database/conexion.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     clientes:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "string"
 *         direccion:
 *           type: string
 *           example: "string"
 *         telefono:
 *            type: string
 *            example: "string"
 *         nacionalidad:
 *            type: string
 *            example: "string"
 *         correo:
 *            type: string
 *            example: "string"
 *         estado:
 *            type: integer
 *            example: 0
 */
export const Clientes = sequelize.define("clientes",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING
        },
        direccion: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        },
        nacionalidad: {
            type: DataTypes.STRING
        },
        correo: {
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



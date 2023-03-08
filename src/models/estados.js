import { DataTypes } from "sequelize";
import sequelize from "../database/conexion.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     estados:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "string"
 *         estado:
 *            type: integer
 *            example: 0
 */
export const Estados = sequelize.define("estados_aprobaciones",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.INTEGER
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

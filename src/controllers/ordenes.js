import { response, request } from "express";

import { Clientes } from "../models/clientes.js";
import { Ordenes } from "../models/ordenes.js";
import { Productos } from "../models/productos.js";
import { Estados } from "../models/estados.js";

export const getOrdenes = async (req, res = response) => {

    const ordenes = await Ordenes.findAll({
        include: [
            {
                model: Clientes,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: Productos,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    res.json(ordenes);
}

export const getOrden = async (req, res = response) => {

    const { id } = req.params;

    const ordenes = await Ordenes.findByPk(id, {
        include: [
            {
                model: Clientes,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Productos,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    if (ordenes) {
        res.json(ordenes);
    } else {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        });
    }
}

export const crearOrden = async (req = request, res = response) => {

    const { clienteId, estadoId, fecha_orden, estado } = req.body;

    try {

        const cliente = await Clientes.findByPk(clienteId)
        if (!cliente) {
            res.status(404).json({
                msg: 'El cliente ingresado no existe'
            })
        }
        const ordenes = await Ordenes.create({ clienteId, estadoId, fecha_orden, estado })

        res.json(ordenes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const editarOrden = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const cliente = await Clientes.findByPk(body.clienteId)
        if (!cliente) {
            res.status(404).json({
                msg: 'El cliente ingresado no existe'
            })
        }
        const ordenes = await Ordenes.findByPk(id);
        if (!ordenes) {
            return res.status(404).json({
                msg: 'No existe una orden con el id ' + id
            });
        }

        await ordenes.update(body);

        res.json(ordenes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
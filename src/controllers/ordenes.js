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
            },
            {
                model: Estados,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    res.json(ordenes);
}

export const getOrdenesEstado = async (req, res = response) => {

    const { estado } = req.params;
    
    const ordenes = await Ordenes.findAll({
        where: { estado: estado },
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
            },
            {
                model: Estados,
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
            }, {
                model: Estados,
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

    const { clienteId, estadosaprobacioneId, fecha_orden, estado } = req.body;

    try {

        const cliente = await Clientes.findByPk(clienteId)
        if (!cliente) {
            res.status(404).json({
                msg: 'El cliente ingresado no existe'
            })
        }
        const ordenes = await Ordenes.create({ clienteId, estadosaprobacioneId, fecha_orden, estado })

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
    const { clienteId, estadosaprobacioneId, fecha_orden, estado } = req.body;
    var fecha = Date.now();

    try {

        const cliente = await Clientes.findByPk(clienteId)
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

        await ordenes.update({ clienteId, estadosaprobacioneId, fecha_orden, estado, fecha_modificacion: fecha });

        res.json(ordenes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
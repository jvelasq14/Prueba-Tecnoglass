import { response, request } from "express";

import { Clientes } from "../models/clientes.js"
import { Ordenes } from "../models/ordenes.js"
import { Productos } from "../models/productos.js";

export const getClientes = async (req, res = response) => {

    const clientes = await Clientes.findAll({
        include: [
            {
                model: Ordenes,
                include: [{
                    model: Productos,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ]
    });

    res.json(clientes);
}
export const getClientesEstado = async (req, res = response) => {
    const { estado } = req.params;

    const clientes = await Clientes.findAll({
        where: { estado: estado },
        include: [
            {
                model: Ordenes,
                include: [{
                    model: Productos,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ]
    });

    res.json(clientes);
}
export const getCliente = async (req, res = response) => {

    const { id } = req.params;

    const clientes = await Clientes.findByPk(id, {
        include: [
            {
                model: Ordenes,
                include: [{
                    model: Productos,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ]
    });

    if (clientes) {
        res.json(clientes);
    } else {
        res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
}

export const crearCliente = async (req = request, res = response) => {

    const { nombre, direccion, telefono, nacionalidad, correo, estado } = req.body;

    try {

        const clientes = await Clientes.create({ nombre, direccion, telefono, nacionalidad, correo, estado })

        res.json(clientes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const editarCliente = async (req, res = response) => {

    const { id } = req.params;
    const { nombre, direccion, telefono, nacionalidad, correo, estado } = req.body;
    var fecha = Date.now();
    try {

        const clientes = await Clientes.findByPk(id);
        if (!clientes) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id ' + id
            });
        }

        await clientes.update({ nombre, direccion, telefono, nacionalidad, correo, estado, fecha_modificacion: fecha });

        res.json(clientes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
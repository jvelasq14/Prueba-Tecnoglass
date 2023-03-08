import { response, request } from "express";

import { generarConsecutivo } from "../helpers/generar_consecutivo.js";

import { Ordenes } from "../models/ordenes.js";
import { Productos } from "../models/productos.js";

export const getProductos = async (req, res = response) => {

    const productos = await Productos.findAll({
        include: [
            {
                model: Ordenes,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    res.json(productos);
}

export const getProductosEstado = async (req, res = response) => {

    const { estado } = req.params;

    const productos = await Productos.findAll({
        where: { estado: estado },
        include: [
            {
                model: Ordenes,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    res.json(productos);
}


export const getProducto = async (req, res = response) => {

    const { id } = req.params;

    const productos = await Productos.findByPk(id, {
        include: [
            {
                model: Ordenes,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
    });

    if (productos) {
        res.json(productos);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
}

export const crearProducto = async (req = request, res = response) => {

    const { nombre, ordeneId, descripcion, alto, ancho, estado } = req.body;

    try {

        const Orden = await Ordenes.findByPk(ordeneId)
        if (!Orden) {
            res.status(404).json({
                msg: 'La orden ingresada no existe'
            })
        }
        const consecutivos = await generarConsecutivo(10000)
        console.log(consecutivos)
        const productos = await Productos.create({ nombre, ordeneId, descripcion, consecutivo: consecutivos, alto, ancho, estado })

        res.json(productos);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const editarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { nombre, ordeneId, descripcion, alto, ancho, estado } = req.body;
    var fecha = Date.now();
    try {

        const Orden = await Clientes.findByPk(ordeneId)
        if (!cliente) {
            res.status(404).json({
                msg: 'la orden ingresada no existe'
            })
        }
        const ordenes = await Ordenes.findByPk(id);
        if (!ordenes) {
            return res.status(404).json({
                msg: 'No existe una orden con el id ' + id
            });
        }
        const consecutivos = generarConsecutivo(10000)
        await ordenes.update({ nombre, ordeneId, descripcion, consecutivo: consecutivos, alto, ancho, estado, fecha_modificacion: fecha });

        res.json(ordenes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
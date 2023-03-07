import { response, request } from "express";

import { Estados } from "../models/estados.js";

export const getEstados = async (req, res = response) => {

    const estado = await Estados.findAll();

    res.json(estado);
}

export const getEstado = async (req, res = response) => {

    const { id } = req.params;

    const estados = await Estados.findByPk(id);

    if (estados) {
        res.json(estados);
    } else {
        res.status(404).json({
            msg: `No existe un estado con el id ${id}`
        });
    }
}
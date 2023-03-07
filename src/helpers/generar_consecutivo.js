import { Productos } from "../models/productos.js";

export const generarConsecutivo = async (max) => {

    let orden = 0
    let numero = 0;

    do {
        numero = Math.floor(Math.random() * max);
        orden = await Productos.findOne({ where: { consecutivo: numero } });

    } while (orden)

    return numero

}
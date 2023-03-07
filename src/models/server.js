import express from "express";
import cors from "cors"
import conection from "../database/conexion.js"

import  {swaggerDocs}  from '../swagger/swagger.js'
import { PORT } from "../../config.js";
import { PORTSWAGGER } from "../../config.js";

import RoutesClientes from "../routes/clientes.js"
import RoutesOrdenes from "../routes/ordenes.js"
import RoutesProductos from "../routes/productos.js"
import RoutesEstados from "../routes/estados.js"

class Server{
    constructor() {
        this.apiPaths = {
            clientes: '/api/clientes',
            ordenes: '/api/ordenes',
            productos: '/api/productos',
            estados: '/api/estados'
        };

        this.app = express();
        this.port = PORT
        this.portSwagger = PORTSWAGGER

        // Métodos iniciales
        this.dbConnection();
        this.middlewares(); 
        this.routes();
    }
    async dbConnection() {

        try {
            await conection.authenticate();
            console.log('Database online');
        }
        catch (error) {
            console.log(error);
        }
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura del body
        this.app.use(express.json());
    }
    routes() {
        
        this.app.use(this.apiPaths.clientes, RoutesClientes);
        this.app.use(this.apiPaths.ordenes, RoutesOrdenes);
        this.app.use(this.apiPaths.productos, RoutesProductos)
        this.app.use(this.apiPaths.estados, RoutesEstados)

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
            swaggerDocs(this.app, this.port);
        });
    }
}

export default Server;
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "SERVICIOS VENTAS",
            version: "BETA",
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                description: "JWT Authorization",
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT",
              }
            } 
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['src/models/clientes.js','src/routes/clientes.js',
           'src/models/ordenes.js', 'src/routes/ordenes.js',
           'src/models/productos.js','src/routes/productos.js',
           'src/models/estados.js','src/routes/estados.js'],
}
 
const swaggerSpec = swaggerJsdoc(options)

export const swaggerDocs = (app, port) => {
    app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/v1/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log('http://localhost:'+port+'/api/v1/swagger');

}
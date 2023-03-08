import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import { getProducto, getProductos, crearProducto, editarProducto, getProductosEstado } from "../controllers/productos.js"

const router = Router();

/**
 * @openapi
 * /api/productos/:
 *   post:
 *     tags:
 *       - API PRODUCTOS
 *     requestBody:
 *         description: Create a new producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ordeneId', 'La ordeneId es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('alto', 'La altura es obligatorio').not().isEmpty(),
    check('ancho', 'el ancho es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], crearProducto);
/**
 * @openapi
 * /api/productos/{id}:
 *   get:
 *     tags:
 *       - API PRODUCTOS
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id  de la clase productos
 *         required: true
 *         schema:
 *              type: integer
 *              format: int64    
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/:id', getProducto);
/**
 * @openapi
 * /api/productos:
 *   get:
 *     tags:
 *       - API PRODUCTOS
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/', getProductos);
/**
 * @openapi
 * /api/productos/{id}:
 *   put:
 *     tags: [API PRODUCTOS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id  de la clase productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productos'
 *     responses:
 *       200:
 *         decsription: The productos was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 *       404:
 *         description: post was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ordeneId', 'La ordeneId es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('alto', 'La altura es obligatorio').not().isEmpty(),
    check('ancho', 'el ancho es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], editarProducto);

/**
 * @openapi
 * /api/productos/estado/{estado}:
 *   get:
 *     tags:
 *       - API PRODUCTOS
 *     parameters:
 *       - name: estado
 *         in: path
 *         description: estado  de la clase productos
 *         required: true
 *         schema:
 *              type: integer
 *              format: int64    
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/estado/:estado', getProductosEstado);
export default router;
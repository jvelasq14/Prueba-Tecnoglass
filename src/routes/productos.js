import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import { getProducto, getProductos, crearProducto, editarProducto } from "../controllers/productos.js"

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
    check('medidas', 'La medida es obligatorio').not().isEmpty(),
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
*     tags:
*       - API PRODUCTOS
*     requestBody:
*         description: update a new productos
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
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ordeneId', 'La ordeneId es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('medidas', 'La medida es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], editarProducto);

export default router;
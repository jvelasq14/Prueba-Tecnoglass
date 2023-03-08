import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import { getOrden, getOrdenes, crearOrden, editarOrden, getOrdenesEstado } from "../controllers/ordenes.js"

const router = Router();

/**
 * @openapi
 * /api/ordenes/:
 *   post:
 *     tags:
 *       - API ORDENES
 *     requestBody:
 *         description: Create a new orden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ordenes'
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
    check('clienteId', 'El clienteId es obligatorio').not().isEmpty(),
    check('fecha_orden', 'La fecha_orden es obligatorio').not().isEmpty(),
    check('estadosaprobacioneId', 'El estadosaprobacioneId es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], crearOrden);
/**
 * @openapi
 * /api/ordenes/{id}:
 *   get:
 *     tags:
 *       - API ORDENES
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id  de la clase ordenes
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
router.get('/:id', getOrden);
/**
 * @openapi
 * /api/ordenes:
 *   get:
 *     tags:
 *       - API ORDENES
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
router.get('/', getOrdenes);
/**
 * @openapi
 * /api/ordenes/{id}:
 *   put:
 *     tags: [API ORDENES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id  de la clase ordenes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ordenes'
 *     responses:
 *       200:
 *         decsription: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ordenes'
 *       404:
 *         description: post was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.put('/:id', [
    check('clienteId', 'El clienteId es obligatorio').not().isEmpty(),
    check('fecha_orden', 'La fecha_orden es obligatorio').not().isEmpty(),
    check('estadosaprobacioneId', 'El estadosaprobacioneId es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], editarOrden);

/**
 * @openapi
 * /api/ordenes/estado/{estado}:
 *   get:
 *     tags:
 *       - API ORDENES
 *     parameters:
 *       - name: estado
 *         in: path
 *         description: estado  de la clase ordenes
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
router.get('/estado/:estado', getOrdenesEstado);
export default router;
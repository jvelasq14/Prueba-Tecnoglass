import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import { crearCliente, editarCliente, getCliente, getClientes } from "../controllers/clientes.js"
const router = Router();

/**
 * @openapi
 * /api/clientes/:
 *   post:
 *     tags:
 *       - API CLIENTES
 *     requestBody:
 *         description: Create a new clientes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clientes'
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
    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], crearCliente);
/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     tags:
 *       - API CLIENTES
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id  de la clase clientes
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
router.get('/:id', getCliente);
/**
 * @openapi
 * /api/clientes:
 *   get:
 *     tags:
 *       - API CLIENTES
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
router.get('/', getClientes);
/**
 * @openapi
 * /api/clientes/{id}:
 *   put:
 *     tags: [API CLIENTES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id  de la clase clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/clientes'
 *     responses:
 *       200:
 *         decsription: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clientes'
 *       404:
 *         description: post was not found.
 *       500:
 *         description: Some errors happend.
 *
 */

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos], editarCliente);

export default router; 
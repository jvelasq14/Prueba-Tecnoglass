import { Router } from "express";

import { getEstado, getEstados} from "../controllers/estados.js"

const router = Router();

/**
 * @openapi
 * /api/estados/{id}:
 *   get:
 *     tags:
 *       - API ESTADOS
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id  de la clase estados
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
router.get('/:id', getEstado);
/**
 * @openapi
 * /api/estados:
 *   get:
 *     tags:
 *       - API ESTADOS
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
router.get('/', getEstados);

export default router;
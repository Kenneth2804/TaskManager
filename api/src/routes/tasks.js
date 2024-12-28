const { Router } = require('express');
const { body, param, validationResult } = require('express-validator');
const Task = require('../models/Task');

const router = Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea (completada o no)
 *       example:
 *         id: 64cbbef2f89a1a00124567ab
 *         title: "Comprar leche"
 *         description: "Ir al supermercado y comprar leche"
 *         completed: false
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post(
  '/',
  body('title').notEmpty().withMessage('Title is required'),
  validate,
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = await Task.create({ title, description });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  }
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener lista de tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtrar tareas completadas
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error en el servidor
 */
router.get('/', async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = completed ? { completed: completed === 'true' } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener detalles de una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea
 *     responses:
 *       200:
 *         description: Detalles de la tarea obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Task ID'),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching task' });
    }
  }
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Task ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const task = await Task.findByIdAndUpdate(id, updates, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  }
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid Task ID'),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
);

module.exports = router;

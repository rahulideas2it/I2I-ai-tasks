import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';
import { authenticateToken } from '../middleware/auth';
import { validate, noteSchema, updateNoteSchema } from '../middleware/validation';

const router = Router();

// Apply authentication to all note routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       401:
 *         description: Unauthorized
 */
router.get('/', NoteController.getAll);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 255
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(noteSchema), NoteController.create);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note details
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', NoteController.getById);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 255
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', validate(updateNoteSchema), NoteController.update);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', NoteController.delete);

export default router;
import { Router } from "express";
import { body, param } from 'express-validator';
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middlewares/project";
import { taskBelongsToProject, taskExists } from "../middlewares/task";


const router = Router()

/** Routes for Projects */
router.post('/',
  body('projectName')
    .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
  body('description')
    .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
  handleInputErrors,
  ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById
)

router.put('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  body('projectName')
    .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
  body('description')
    .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
  handleInputErrors,
  ProjectController.updateProject
)

router.delete('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.deleteProject
)


/** Routes for Tasks */

// se aplica la validacion para cada end-point que tenga: projectId
router.param('projectId', projectExists)

router.post('/:projectId/tasks',
  body('name')
    .notEmpty().withMessage('El Nombre de la Tarea es Obligatoria'),
  body('description')
    .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'),
  handleInputErrors,
  TaskController.createTask
)

router.get('/:projectId/tasks',
  TaskController.getProjectTasks
)



router.param('taskId', taskExists) // middleware para los end-points que tengan taskId
router.param('taskId', taskBelongsToProject) // middleware para los end-points que tengan taskId

router.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El Nombre de la Tarea es Obligatoria'),
  body('description')
    .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('status')
    .notEmpty().withMessage('El Status es Obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)

export default router
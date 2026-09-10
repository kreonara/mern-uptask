import { Router } from "express";
import { body } from 'express-validator';
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";


const router = Router()

router.get('/', ProjectController.getAllProjects)

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

export default router
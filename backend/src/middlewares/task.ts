import type { Request, Response, NextFunction } from 'express'
import type { ITask } from '../models/Task'
import Task from '../models/Task'

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params

    const task = await Task.findById(taskId)
    if(!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({error: error.message})
    }

    req.task = task

    next()
  } catch (error) {
    res.status(500).json({error: 'Hubo un error'})
  }
}

export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    // si la tarea no pertenece a ese proyecto lanzar un error
    if(req.task?.project.toString() !== req.project._id.toString()) {
      const error = new Error('Acción no válida')
      res.status(400).json({error: error.message})
    }

    next()
}
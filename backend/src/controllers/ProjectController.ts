import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

  static getAllProjects(req: Request, res: Response) {
    res.send('Todos los Projectos')
  }
  
  static createProject = async(req: Request, res: Response) => {
    console.log(req.body)
    const project = new Project(req.body)

    try {
      // await Project.create(req.body) // guardar
      await project.save() // guardar
      res.send('Creando Projecto...')
    } catch (error) {
      console.log(error)
    }
  }
}
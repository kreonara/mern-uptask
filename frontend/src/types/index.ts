import { z } from 'zod'

/** Tipo de dato para los Projects */
// Schema Objeto de Zod - nos ayuda a validar los datos
// type Nombre = z.infer - ayuda a typescript para que conozca la estructura (desarrollar)

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})
// type Project from projectSchema
export type Project = z.infer<typeof projectSchema>

// seleccionamos que llaves vamos a usar - Pick | Omit - Omitir keys
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName'| 'description'>

export const dashboardProjectSchema = z.array(
  projectSchema.pick({ // que valores necesitamos de projectSchema?
    _id: true,
    projectName: true,
    clientName: true,
    description: true
  })
)



/** Tipo de dato para las Tasks */
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema
})

export type Task = z.infer<typeof taskSchema>

export type TaskFormData = Pick<Task, 'name' | 'description'>

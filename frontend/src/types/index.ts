import { z } from 'zod'

// Tipo de dato para los Projects
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
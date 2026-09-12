import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, type ProjectFormData } from "../types";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData)
    return data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get('/projects')
    const response = dashboardProjectSchema.safeParse(data) // sanitizamos los datos con Zod
    
    if(response.success) { // clg(response) -> {success: true, data: Array()}
      return response.data
    }

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
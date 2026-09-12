import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, projectSchema, type Project, type ProjectFormData } from "../types";

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

export async function getProjectById(id: Project['_id']) {
  try {
    const { data } = await api.get(`/projects/${id}`)
    const response = projectSchema.safeParse(data)
    
    if(response.success) return response.data;

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

interface Props {
  formData: ProjectFormData,
  projectId: Project['_id']
}

export async function updateProject({ formData, projectId }: Props) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData)
    return data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`)
    return data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
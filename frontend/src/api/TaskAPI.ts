import { isAxiosError } from "axios";
import api from "../lib/axios";
import type { Project, TaskFormData } from "../types";

interface Props {
  formData: TaskFormData,
  projectId: Project['_id']
}

export async function createTask({formData, projectId}: Props) {
  try {
    const url = `/projects/${projectId}/tasks`
    const { data } = await api.post<string>(url, formData)

    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
import { useForm } from "react-hook-form"
import type { Project, ProjectFormData } from "../../types"
import { Link, useNavigate } from "react-router"
import ProjectForm from "./ProjectForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "../../api/ProjectAPI"
import { toast } from "react-toastify"

interface Props {
  data: ProjectFormData
  projectId: Project['_id']
}

const EditProjectForm = ({ data, projectId }: Props) => {
  const navigate = useNavigate()
  
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description
  }
  
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: initialValues
  })
  
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]}) // obtenemos informacion nueva, [hace un refetch]

      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    // console.log(formData) // datos del formulario
    const data = {
      formData,
      projectId
    }
    mutation.mutate(data)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Editar Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

      <nav className="my-5">
        <Link
          to='/'
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Volver a Proyectos
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >

        <ProjectForm
          register={register}
          errors={errors}
        />

        <input 
          type="submit"
          value="Guardar Cambios"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 p-3 w-full text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </div>
  )
}

export default EditProjectForm
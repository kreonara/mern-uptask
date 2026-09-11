import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import ProjectForm from "../../components/projects/ProjectForm"
import type { ProjectFormData } from "../../types"
import { createProject } from "../../api/ProjectAPI"


const CreateProjectView = () => {
  const navigate = useNavigate()

  const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
  }

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: initialValues
  })

  const mutation = useMutation({
    mutationFn: createProject, // fn a ejecutar
    onError: (error) => { // recuperamos el error del new Error
      toast.error(error.message)
    },
    onSuccess: (data) => { // data es la respuesta de la API
      toast.success(data)
      navigate('/')
    }
  })

  // const handleForm = async(formData: ProjectFormData) => {
  const handleForm = (formData: ProjectFormData) => {
    // const data = await createProject(formData)
    // toast.success(data)
    // navigate('/')

    mutation.mutate(formData)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
          value="Crear Proyecto"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 p-3 w-full text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </div>
  )
}

export default CreateProjectView
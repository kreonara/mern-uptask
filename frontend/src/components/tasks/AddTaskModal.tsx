import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useLocation, useNavigate, useParams } from "react-router"
import { Fragment } from "react/jsx-runtime"
import TaskForm from "./TaskForm"
import type { TaskFormData } from "../../types"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from "../../api/TaskAPI"
import { toast } from "react-toastify"

const AddTaskModal = () => {
  const navigate = useNavigate() // modificar la URL

  /** Leer si modal existe */
  const location = useLocation() // verificar/leer URL
  const queryParams = new URLSearchParams(location.search) // search tiene los query parametros
  const modalTask = queryParams.get('newTask') // verificamos si existe 'newTask'
  const show = modalTask ? true : false // existe ? true : false

  /** Obtener ProjectId */
  const params = useParams()
  const projectId = params.projectId!

  const initialValues: TaskFormData = {
    name: '',
    description: ''
  }

  const { register, handleSubmit, reset, formState: { errors} } = useForm({
    defaultValues: initialValues
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      toast.success(data)
      reset() // borrar formulario
      navigate(location.pathname, {replace: true}) // ocultar modal
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {formData, projectId}
    mutation.mutate(data)
  }

  return (
    <Transition appear show={show} as={Fragment}>
      {/* () => navigate(location.pathname, {replace: true}) */}
      <Dialog as="div" className="relative z-10" onClose={() => navigate('', {replace: true})}> {/* limpia los query params */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle
                  as="h3"
                  className="font-black text-4xl  my-5"
                >
                  Nueva Tarea
                </DialogTitle>

                <p className="text-xl font-bold">Llena el formulario y crea  {''}
                  <span className="text-fuchsia-600">una tarea</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleCreateTask)}
                >
                  
                  <TaskForm 
                    register={register}
                    errors={errors}
                  />

                  <input 
                    type="submit"
                    value="Guardar Tarea"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 p-3 w-full text-white uppercase font-bold cursor-pointer transition-colors"
                  />
                </form>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddTaskModal
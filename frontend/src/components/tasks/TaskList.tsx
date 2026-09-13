import type { Task, TaskStatus } from "../../types"
import TaskCard from "./TaskCard"

interface Props {
  tasks: Task[]
}

type StatusGroup = Record<TaskStatus, Task[]>

const initialStatusGroups: StatusGroup = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

// const statusTranslations: Record<TaskStatus, string> = {
const statusTranslations: {[keys: string]: string} = {
  pending: 'Pendiente',
  onHold: 'En Espera',
  inProgress: 'En Progreso',
  underReview: 'En Revisión',
  completed: 'Completado'
}

const statusStyles: {[keys: string]: string} = {
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-esmerald-500'
}


const TaskList = ({ tasks }: Props) => {

  const groupedTasks = tasks.reduce((acumulador, task) => { // acumulador = initialStatusGroups
    let currentGroup = acumulador[task.status] ? [...acumulador[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acumulador, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        {/* Object.entries(obj) -> convierte el objeto en un array: [key, valor] */}
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-75 2xl:min-w-0 2xl:w-1/5'>

            {/* <h3>{statusTranslations[status as TaskStatus]}</h3> */}
            <h3 
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
            >
              {statusTranslations[status]}
            </h3>

            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default TaskList
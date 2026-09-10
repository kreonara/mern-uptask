import mongoose, { Document, Schema, Types } from "mongoose";

// enum TaskStatus {
//   PENDING = 'pending',
//   ON_HOLD = 'onHold',
//   IN_PROGRESS = 'inProgress',
//   UNDER_REVIEW = 'underReview',
//   COMPLETED = 'completed'
// }

const taskStatus = { // estado de cada tarea
  PENDING: 'pending', // pendiente - esperando quien haga la tarea
  ON_HOLD: 'onHold', // registrada - pero aún no hay que trabajar en ella
  IN_PROGRESS: 'inProgress', // en proceso - alguien ya esta trabajando con ella
  UNDER_REVIEW: 'underReview', // en revision
  COMPLETED: 'completed' // completada
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId,
  status: TaskStatus
}

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  }
}, {timestamps: true}) // createdAt & updatedAt

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
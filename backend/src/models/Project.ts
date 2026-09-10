import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
}

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    require: true,
    trim: true
  },
  clientName: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  }
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import DashboardView from '../views/DashboardView';
import EditProjectView from '../views/projects/EditProjectView';
import ProjectDetailsView from '../views/projects/ProjectDetailsView';

const CreateProjectView = lazy(() => import('../views/projects/CreateProjectView'))

export const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardView,
      },
      {
        path: 'projects/create',
        Component: CreateProjectView,
      },
      {
        path: 'projects/:projectId',
        Component: ProjectDetailsView,
      },
      {
        path: 'projects/:projectId/edit',
        Component: EditProjectView,
      },
    ]
  }
])
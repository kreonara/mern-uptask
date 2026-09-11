// import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import DashboardView from '../views/DashboardView';

// const DashboardView = lazy(() => import('../views/DashboardView'))

export const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardView,
      }
    ]
  }
])
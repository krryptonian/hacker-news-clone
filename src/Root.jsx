import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/Home'
import User from './pages/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user/:username',
        element: <User />,
      },
    ],
  },
])

const Root = () => {
  return <RouterProvider router={router} />
}

export default Root

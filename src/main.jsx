import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import MainPage from './pages/MainPage/MainPage.jsx'
import EditPage from './pages/EditPage/EditPage.jsx'
import AddPage from './pages/AddPage/AddPage.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/edit/:id',
        element: <EditPage  />
      },
      {
        path: '/add',
        element: <AddPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

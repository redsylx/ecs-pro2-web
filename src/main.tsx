import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/root"
import ErrorPage from "./routes/error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/root",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

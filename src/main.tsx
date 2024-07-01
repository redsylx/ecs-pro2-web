import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/root"
import App from './App'
import ErrorPage from "./routes/error-page";
import { Provider } from 'react-redux'
import store from './store';

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
  {
    path: "/app",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

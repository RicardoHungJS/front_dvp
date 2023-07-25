import './App.css'
import { ErrorComponent } from './components/errorComponent/errorComponent';
import MainListComponent from './components/mainList/mainList'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import UserSelectedCardComponent from './components/userCard/userSelectedCardComponent';

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorComponent}>
    <Outlet />
  </ErrorBoundary>
)

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <MainListComponent />
      },
      {
        path: "/user_card/:user_login",
        element: <UserSelectedCardComponent />
      }
    ]
  },
]);

function App() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

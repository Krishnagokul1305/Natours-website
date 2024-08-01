import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage, { loader as popularTourLoader } from "./pages/Home/HomePage";
import "./index.css";
import ToursOverview, {
  loader as allTourLoader,
} from "./Features/Tour/pages/ToursOverview";
import Tour, { loader as tourLoader } from "./Features/Tour/pages/Tour";
import LoginForm from "./Features/Auth/components/LoginForm";
import SignInForm from "./Features/Auth/components/SignInForm";
import AuthPage from "./Features/Auth/pages/AuthPage";

import "./service/apiTours";
import AppLayout from "./AppLayout";
import UserPage from "./Features/Auth/pages/UserPage";
import UserDetails from "./Features/Auth/components/UserDetails";
import UserBookings from "./Features/Auth/components/UserBookings";
import ProtectedRoute from "./Features/Auth/components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: popularTourLoader,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/tours",
        element: <ToursOverview />,
        loader: allTourLoader,
      },
      {
        path: "/tours/:id",
        element: <Tour />,
        loader: tourLoader,
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Navigate to="settings" /> },
          { path: "settings", element: <UserDetails /> },
          { path: "bookings", element: <UserBookings /> },
        ],
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "",
            element: <Navigate to="login" />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "sign-in",
            element: <SignInForm />,
          },
        ],
      },
    ],
  },
  {
    path:"*",
    element:<PageNotFound />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

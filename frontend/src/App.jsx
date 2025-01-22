import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import "./index.css";
import AppLayout from "./AppLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Lazy loading components
const ToursOverview = lazy(() => import("./Features/Tour/pages/ToursOverview"));
const Tour = lazy(() => import("./Features/Tour/pages/Tour"));
const LoginForm = lazy(() => import("./Features/Auth/components/LoginForm"));
const SignInForm = lazy(() => import("./Features/Auth/components/SignInForm"));
const AuthPage = lazy(() => import("./Features/Auth/pages/AuthPage"));
const UserPage = lazy(() => import("./Features/Auth/pages/UserPage"));
const UserDetails = lazy(() =>
  import("./Features/Auth/components/UserDetails")
);
const UserBookings = lazy(() =>
  import("./Features/Auth/components/UserBookings")
);
const ProtectedRoute = lazy(() =>
  import("./Features/Auth/components/ProtectedRoute")
);

import Loader from "./components/Loader";
import ErrorElement from "./components/ErrorElement";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/tours",
        element: (
          <Suspense fallback={<Loader />}>
            <ToursOverview />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/tours/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <Tour />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/user/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          </Suspense>
        ),
        children: [
          { path: "", element: <Navigate to="settings" /> },
          {
            path: "settings",
            element: (
              <Suspense fallback={<Loader />}>
                <UserDetails />
              </Suspense>
            ),
          },
          {
            path: "bookings",
            element: (
              <Suspense fallback={<Loader />}>
                <UserBookings />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="login" />,
          },
          {
            path: "login",
            element: (
              <Suspense fallback={<Loader />}>
                <LoginForm />
              </Suspense>
            ),
            errorElement: <ErrorElement />,
          },
          {
            path: "sign-in",
            element: (
              <Suspense fallback={<Loader />}>
                <SignInForm />
              </Suspense>
            ),
            errorElement: <ErrorElement />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <PageNotFound />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

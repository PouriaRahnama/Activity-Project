// src/app/router/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';

export default function PrivateRoute() {
  const { userStore: { isLoggined, user } } = useStore();
  const location = useLocation();

  if (!isLoggined || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

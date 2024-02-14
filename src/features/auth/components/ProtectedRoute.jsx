import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuth();
  return <>{authUser ? children : <Navigate to="/login" />}</>;
}

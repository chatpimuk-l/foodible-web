import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuth();
  return <>{authUser ? <Navigate to="/login" /> : <Navigate to="/login" />}</>;
}

import { Navigate } from "react-router-dom";
import { VerificaPermissao } from "../pages/Login/Login";

export default function ProtectedRoute({ children, permissao }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (permissao && !VerificaPermissao(permissao)) {
        return <Navigate to="/agenda" replace />;
    }

    return children;
}
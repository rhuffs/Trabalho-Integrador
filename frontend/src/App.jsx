import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Inicio from "./pages/Inicio/Inicio";
import ProtectedRoute from "./components/ProtectedRoute";
import Agenda from "./pages/Agenda/Agenda";
import Pacientes from "./pages/Pacientes/Pacientes";
import Financeiro from "./pages/Financeiro/Financeiro";


function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/agenda"
                    element = {
                        <ProtectedRoute>
                            <Agenda/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pacientes"
                    element ={
                        <ProtectedRoute>
                            <Pacientes/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/financeiro"
                    element={
                        <ProtectedRoute>
                            <Financeiro/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
  );
}

export default App
import { Navigate, Outlet } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import mascotafav from "../assets/img/caja03.png";

export const ProtectedRoute = () => {
    const { store } = useGlobalReducer();
    const token = localStorage.getItem('token');

    // Si no hay token, redirigimos al login inmediatamente
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si el store todavía está cargando el usuario desde el backend globalmente,
    // mostramos una pantalla de carga para evitar "flickering" o errores.
    if (store.userLoading) {
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fdfdf6" }}>
                <img src={mascotafav} alt="Cargando..." style={{ width: "100px", opacity: 0.7, marginBottom: "20px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="spinner"></span>
                    <p style={{ margin: 0, fontFamily: "monospace", color: "#6c6159" }}>Cargando tus datos...</p>
                </div>
            </div>
        );
    }

    // Si terminó de cargar y por algún motivo el usuario no se estableció (ej. token inválido),
    // redirigimos al login.
    if (!store.user) {
        return <Navigate to="/login" replace />;
    }

    // Si todo está correcto, renderizamos el contenido de la ruta protegida
    return <Outlet />;
};

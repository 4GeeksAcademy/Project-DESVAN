import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import "./Login.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const alertTimeoutRef = useRef(null);

  const showErrorAlert = (msg) => {
    setError(msg);
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = setTimeout(() => {
      setError("");
    }, 8000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      showErrorAlert("Por favor, ingresa un correo electrónico.");
      return;
    }

    setLoading(true);

    try {
      const data = await authService.forgotPassword(email);
      setMessage(data?.msg || "Si el email existe, recibirás un enlace para restablecer tu contraseña.");
    } catch (err) {
      showErrorAlert(err.message || "Error enviando el correo de recuperación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-area">
        <div className="auth-card auth-card-small">
          <div className="brand-header">
            <div className="brand-box-icon">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
            <h2 className="auth-card-title">Recuperar contraseña</h2>
            <p className="auth-card-subtitle">Ingresa tu email para recibir el enlace de restablecimiento.</p>
          </div>

          {message && <div className="auth-alert alert-success"><i className="fa-solid fa-circle-check"></i><span>{message}</span></div>}
          {error && <div className="auth-alert alert-danger"><i className="fa-solid fa-circle-exclamation"></i><span>{error}</span></div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">EMAIL</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          <div className="auth-switcher-divider">
            <Link to="/login" className="highlight-link">Volver a iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

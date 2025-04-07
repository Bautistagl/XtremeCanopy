"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/supabase/client"
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Verificar si hay una sesión activa al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      // Si no hay sesión, significa que el usuario no ha llegado a través
      // del enlace de restablecimiento de contraseña
      if (!data.session) {
        setError(
          "Enlace de restablecimiento inválido o expirado. Por favor solicite un nuevo enlace."
        );
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar contraseñas
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Actualizar la contraseña usando Supabase
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      // Mostrar mensaje de éxito
      setMessage("¡Contraseña actualizada con éxito!");

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Error al actualizar la contraseña:", err);
      setError(err.message || "Ocurrió un error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Restablecer Contraseña</h1>
        <p className="login-subtitle">Ingrese su nueva contraseña</p>

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        )}

        {message && (
          <div className="success-container">
            <p className="success-message">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Ingrese su nueva contraseña"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Confirme su nueva contraseña"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || !!error}
          >
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </form>

        <p className="signup-prompt">
          <Link href="/login" className="signup-link">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
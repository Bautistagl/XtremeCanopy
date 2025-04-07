"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import "./login.css"
import { signInWithGoogle, login as signInWithEmail } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email es inválido";
    }

    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores cuando el usuario comienza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Limpiar error general si existe
    if (errors.general && (name === "email" || name === "password")) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Crear un objeto FormData para pasarlo a la función de login
      const formDataObj = new FormData();
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("skipRedirect", "true");

      // Llamar a la función de servidor para iniciar sesión
      const result = await signInWithEmail(formDataObj);

      if (result && "success" in result) {
        if (result.success) {
          // Si el inicio de sesión fue exitoso, navegar a la página de perfil
          router.push("/perfil");
        } else if (result.error) {
          // Manejar diferentes tipos de errores
          if (result.error.code === "invalid_credentials") {
            setErrors({
              general: "Email o contraseña incorrectos",
            });
          } else {
            setErrors({
              general: result.error.message,
            });
          }
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        general: "Ha ocurrido un error durante el inicio de sesión",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsGoogleLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
      setErrors({
        general: "Error al iniciar sesión con Google",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido a Carpas Kim</h1>
        <p className="login-subtitle">Ingrese sus datos para iniciar sesión</p>

        {errors.general && (
          <div className="error-container">
            <p className="error-message">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="Ingrese su email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <Link href="#" className="forgot-password">
                Olvidó su contraseña?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              className={`form-input ${errors.password ? "input-error" : ""}`}
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <button
            type="button"
            className="login-button google-button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading
              ? "Conectando con Google..."
              : "Iniciar sesión con Google"}
          </button>
        </form>

        <p className="signup-prompt">
          No tenés una cuenta?{" "}
          <Link href="/register" className="signup-link">
            Registrarse!
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import "../login/login.css"
import { register, signInWithGoogle  } from "@/lib/auth-actions"
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = "Nombre es requerido";
    }

    if (!formData.email) {
      newErrors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email es inválido";
    }

    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmar contraseña es requerido";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Crear un objeto FormData para pasarlo a la función de registro
      const formDataObj = new FormData();
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("name", formData.name);

      // Llamar a la función de servidor para registrarse
      await register(formDataObj);
      // No necesitamos manejar la redirección aquí, ya que la función de servidor lo hace
    } catch (error) {
      console.error("Registro fallido:", error);
      setIsLoading(false); // Solo establecemos isLoading a false en caso de error
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsGoogleLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Registro con Google fallido:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido a Carpas Kim</h1>
        <p className="login-subtitle">Ingrese sus datos para registrarse</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

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
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={`form-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              placeholder="Confirme su contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>

          <button
            type="button"
            className="login-button google-button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading
              ? "Conectando con Google..."
              : "Registrarse con Google"}
          </button>
        </form>

        <p className="signup-prompt">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="signup-link">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
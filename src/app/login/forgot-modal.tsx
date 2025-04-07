"use client"

import type React from "react"
import { useState } from "react"
import "./login.css"
import { resetPassword } from "@/lib/auth-actions"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor ingrese su email")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingrese un email válido")
      return
    }

    try {
      setIsLoading(true)

      // Crear FormData para enviar a la función resetPassword
      const formData = new FormData()
      formData.append('email', email)
   
      
      // Llamar a la función de servidor para resetear la contraseña
      // La función no redirigirá gracias al parámetro skipRedirect
      await resetPassword(formData)

      // Si llegamos aquí sin error, mostramos el estado de éxito
      setIsSuccess(true)
    } catch (err) {
      setError("Ocurrió un error al enviar el correo de recuperación")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button" aria-label="Cerrar">
          cerrar
        </button>

        <div className="modal-content">
          <h2 className="modal-title">Recuperar contraseña</h2>

          {!isSuccess ? (
            <>
              <p className="modal-description">
                Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
              </p>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-field">
                  <label htmlFor="reset-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-input ${error ? "input-error" : ""}`}
                    placeholder="Ingrese su email"
                    disabled={isLoading}
                  />
                  {error && <p className="error-text">{error}</p>}
                </div>

                <div className="form-actions">
                  <button type="button" onClick={onClose} className="button button-secondary" disabled={isLoading}>
                    Cancelar
                  </button>
                  <button type="submit" className="button button-primary" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar enlace"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="success-container">
              <div className="success-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="success-title">¡Correo enviado!</h3>
              <p className="success-message">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor revise su bandeja de
                entrada.
              </p>
              <button type="button" onClick={onClose} className="button button-primary">
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

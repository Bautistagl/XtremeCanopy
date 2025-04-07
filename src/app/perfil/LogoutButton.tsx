"use client";

import { useState } from "react";
import { signout } from "@/lib/auth-actions";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setIsLoading(false); // Solo establecemos isLoading a false en caso de error
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="mt-6 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full"
    >
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
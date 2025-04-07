"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { User } from '@supabase/supabase-js';

// Cache para evitar múltiples solicitudes en el mismo ciclo de renderizado
// Esto es seguro porque cada solicitud obtiene su propia instancia de esta variable
let userCache: User | null = null;
let lastCheck: number = 0;
const CACHE_TTL = 10000; // 10 segundos en milisegundos

/**
 * Verifica si el usuario tiene una sesión activa
 * @returns Objeto con información del usuario o null si no hay sesión
 */
export async function getSession(): Promise<{ user: User } | null> {
  // Si ya tenemos el usuario en caché y no ha expirado, devolvemos el caché
  const now = Date.now();
  if (userCache && (now - lastCheck < CACHE_TTL)) {
    return { user: userCache };
  }
  
  const supabase = await createClient();
  
  // Usamos getUser() que es más seguro que getSession()
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Actualizamos el tiempo de última verificación
  lastCheck = Date.now();
  
  if (error || !user) {
    userCache = null;
    return null;
  }
  
  // Guardamos en caché para futuras llamadas
  userCache = user;
  
  return {
    user,
  };
}

/**
 * Verifica si el usuario está autenticado, si no, redirecciona al login
 * Utilizar esta función en páginas protegidas
 */
export async function requireAuth(): Promise<User> {
  const session = await getSession();
  
  if (!session) {
    // Usar la variable de entorno para la URL base
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    redirect(`${baseUrl}/login`);
  }
  
  return session.user;
}

/**
 * Interfaz para los datos del perfil de usuario
 */
export interface UserProfile {
  id: string;
  email: string | undefined;
  name: string;
  avatar_url?: string;
  provider?: string;
  created_at: string;
}

/**
 * Obtiene los datos del perfil del usuario actual directamente de la sesión
 * @returns Datos del usuario de la sesión
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const session = await getSession();
  
  if (!session) {
    redirect('/login')
  }
  
  const user = session.user;
  
  // Ya que no tenemos una tabla "profiles", usamos los datos de la autenticación
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || 'Usuario',
    avatar_url: user.user_metadata?.avatar_url,
    provider: user.app_metadata?.provider || 'email',
    created_at: user.created_at
  };
}
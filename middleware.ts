import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Inicializa el cliente Supabase
  const { supabase, response } = createClient(request)
  
  // Verifica la sesión del usuario
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si la URL es la callback de autenticación
  if (request.nextUrl.pathname === '/api/auth/callback') {
    if (session) {
      // Usar la variable de entorno para la URL base
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      return NextResponse.redirect(`${baseUrl}/perfil`)
    }
    // Si no hay sesión, procede con la callback
    return response
  }

  // Para otras rutas, continuar con el middleware predeterminado
  return response
}

// Configurar las rutas que activan este middleware
export const config = {
  matcher: ['/api/auth/callback'],
}
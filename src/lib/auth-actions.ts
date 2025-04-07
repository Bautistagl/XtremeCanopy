'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const skipRedirect = formData.get('skipRedirect') === 'true'

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    if (skipRedirect) {
      // Si skipRedirect es true, devolvemos el error en lugar de redirigir
      return { 
        success: false, 
        error: {
          message: error.message || 'Error durante el inicio de sesión',
          code: error.code
        }
      }
    }
    // Comportamiento original: redirigir a la página de error
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  
  // Si skipRedirect es true, simplemente devolvemos un indicador de éxito
  if (skipRedirect) {
    return { success: true }
  }
  
  // Comportamiento original: redirigir a la página de perfil
  redirect('/perfil')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

 
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login') 
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    redirect('/error')
  }
}
export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  
  if (!email) {
    // Podrías manejar esto de otra manera, por ejemplo, devolviendo un estado en lugar de redirigir
    console.log('falta mail')
  }
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/forgotPassword`,
  })
  
  if (error) {
    console.error('Error al solicitar cambio de contraseña:', error)
    redirect('/error')
  }
  
  
  redirect('/login')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  
  const password = formData.get('password') as string
  
  if (!password || password.length < 6) {
    redirect('/error?message=invalid-password')
  }
  
  const { error } = await supabase.auth.updateUser({
    password: password
  })
  
  if (error) {
    console.error('Error al actualizar la contraseña:', error)
    redirect('/error')
  }
  
  // Redirigir a la página de inicio de sesión con un mensaje de éxito
  redirect('/login?message=password-updated')
}
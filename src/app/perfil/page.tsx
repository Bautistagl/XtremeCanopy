import { getUserProfile } from "@/lib/check-session";
import LogoutButton from "./LogoutButton";


export default async function ProfilePage() {
  // Obtenemos información del perfil (ya incluye verificación de autenticación)
  const profile = await getUserProfile();
  
  // Si no hay perfil, mostramos un mensaje - la redirección se maneja en getUserProfile
  if (!profile) {
   
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando información del usuario...</p>
      </div>
      
    );
  }
  
  return (
    <div >
      <h1 >Perfil de Usuario</h1>
      
      <div >
        <div >
          {/* {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt="Avatar de usuario" 
              
            />
          ) : (
            <div >
              <span >
                {profile?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )} */}
          
          <div>
            <h2 className="text-xl font-semibold">{profile?.name || 'Usuario'}</h2>
            <p className="text-gray-600">{profile?.email}</p>
          
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">ID de usuario:</h3>
          <p className="text-gray-700 text-sm break-all mb-4">{profile.id}</p>
          
         
          
         
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
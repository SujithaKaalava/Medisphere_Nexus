import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role=== role.toLocaleLowerCase()
}

export const getRole = async () => {
    const { sessionClaims } = await auth();
  
    const userRole = sessionClaims?.metadata.role;
  
    const role = sessionClaims?.metadata.role?.toLowerCase() || "patient";
  
    return role;
  };
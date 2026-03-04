import { cookies } from 'next/headers';

export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get('tb_admin_auth');
}

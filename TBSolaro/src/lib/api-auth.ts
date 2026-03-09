import { createHash } from 'crypto';
import { prisma } from './prisma';

export type ApiPermission = 'read' | 'write' | 'all';

export async function validateApiKey(req: Request): Promise<{ valid: false } | { valid: true; permissions: ApiPermission }> {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return { valid: false };
  const key = auth.slice(7).trim();
  if (!key) return { valid: false };
  const keyHash = createHash('sha256').update(key).digest('hex');
  try {
    const row = await prisma.apiKey.findUnique({ where: { keyHash } });
    if (!row || row.status !== 'active') return { valid: false };
    prisma.apiKey.update({ where: { id: row.id }, data: { lastUsed: new Date() } }).catch(() => {});
    return { valid: true, permissions: row.permissions as ApiPermission };
  } catch {
    return { valid: false };
  }
}

export function canRead(p: ApiPermission) { return true; }
export function canWrite(p: ApiPermission) { return p === 'write' || p === 'all'; }
export function canDelete(p: ApiPermission) { return p === 'all'; }

export function unauthorized() {
  return Response.json({ error: 'Unauthorized. Provide a valid Bearer API key.' }, { status: 401 });
}
export function forbidden() {
  return Response.json({ error: 'Forbidden. Your API key does not have permission for this action.' }, { status: 403 });
}

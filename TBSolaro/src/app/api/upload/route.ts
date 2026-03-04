import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get('tb_admin_auth')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const blob = await put(`tbsolaro/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

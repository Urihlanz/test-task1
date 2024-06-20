import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { MOCK_LOGIN, MOCK_PASSWORD } from 'src/constants/user';

export async function POST(req: Request): Promise<NextResponse<{ isAuth: boolean }>> {
  const formData = await req.formData();
  const login = formData.get('login');
  const password = formData.get('password');
  let isAuth = false;

  if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
    isAuth = true;
    cookies().set('accessToken', 'some-jwt-token');
  }

  return NextResponse.json({ isAuth });
}

export function DELETE(): NextResponse<{ message: string }> {
  cookies().delete('accessToken');

  return NextResponse.json({ message: 'User logged out successfully' });
}

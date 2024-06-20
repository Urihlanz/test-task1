import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { MOCK_LOGIN } from 'src/constants/user';

export async function GET(): Promise<NextResponse<{ login?: string; isAuth?: boolean; status?: number }>> {
  const login = MOCK_LOGIN;
  const isAuth = cookies().has('accessToken');

  if (!isAuth) {
    return NextResponse.json({ status: 401 });
  }

  return NextResponse.json({ login, isAuth });
}

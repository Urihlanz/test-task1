import { atom } from 'nanostores';
import { cookies } from 'next/headers';

type UserType = {
  login: string;
  isAuth: boolean;
};

export const $users = atom<UserType[]>([]);

export const getUserData = async (): Promise<number> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/user`, {
      method: 'GET',
      headers: { Cookie: cookies().toString() },
    });

    const { login, isAuth, status } = (await res.json()) as { login: string; isAuth: boolean; status: number };

    if (isAuth) {
      $users.set([...$users.get(), { login, isAuth }]);
    }

    return status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

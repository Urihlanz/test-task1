import { atom, WritableAtom } from 'nanostores';

type UserStoreState = {
  users: {
    [key: string]: {
      password: string;
      loggedIn: boolean;
    };
  };
};

const initialState = {
  users: {
    admin: {
      password: 'admin',
      loggedIn: false,
    },
    sysadmin: {
      password: 'admin',
      loggedIn: false,
    },
  },
};

export const $userStore = atom<UserStoreState>(initialState);

export const logIn = (state: WritableAtom<UserStoreState>, login: string, password: string): boolean => {
  const user = state.get().users[login];
  if (user && user.password === password) {
    user.loggedIn = true;

    return true;
  }

  return false;
};

export const isAuth = (state: WritableAtom<UserStoreState>): boolean => {
  const user = state.get().users;
  let logIn = false;

  Object.entries(user).forEach(([key, value]) => {
    value.loggedIn ? (logIn = true) : false;
  });

  return logIn;
};

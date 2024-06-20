'use client';

import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';

import styles from './styles.module.scss';

export const AuthForm = (): JSX.Element => {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthFailed, setIsAuthFailed] = useState<boolean>(false);

  const signIn = async (formData: FormData): Promise<void> => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/auth`, {
        method: 'POST',
        body: formData,
      });
      const { isAuth } = (await res.json()) as { isAuth: boolean };

      setIsAuthFailed(isAuth);

      if (isAuth) {
        router.push('/posts');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const onSumbit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    signIn(formData);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSumbit}>
      <div className={styles.loginData}>Login: admin Password: admin</div>
      <TextField
        id='outlined-basic'
        name='login'
        label='Login'
        variant='outlined'
        value={login}
        onChange={(e): void => setLogin(e.target.value)}
      />
      <TextField
        id='outlined-basic'
        name='password'
        label='Password'
        onChange={(e): void => setPassword(e.target.value)}
        type='password'
        value={password}
        variant='outlined'
      />
      <Button variant='outlined' type='submit'>
        Log in
      </Button>
      {isAuthFailed && <p>Неверный логин или пароль</p>}
    </form>
  );
};

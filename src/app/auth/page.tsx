'use client';

import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { JSX, useState } from 'react';
import { $userStore, logIn } from 'src/api/auth/server';

import styles from './page.module.scss';

const Auth = (): JSX.Element => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <TextField
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          value={login}
          onChange={(e): void => setLogin(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Outlined'
          onChange={(e): void => setPassword(e.target.value)}
          type='password'
          value={password}
          variant='outlined'
        />
        <Link href={logIn($userStore, login, password) ? '/posts' : '/'}>
          <Button variant='outlined'>Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;

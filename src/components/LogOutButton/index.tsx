'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { JSX } from 'react';

export const LogOutButton = (): JSX.Element => {
  const router = useRouter();

  const logOut = async (): Promise<void> => {
    try {
      await fetch(`${process.env.BASE_URL}/api/auth`, {
        method: 'DELETE',
      });

      router.push('/auth');
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const clickHandler = (): void => {
    logOut();
  };

  return (
    <Button variant='outlined' onClick={(): void => clickHandler()}>
      Log Out
    </Button>
  );
};

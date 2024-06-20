'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { JSX } from 'react';

export const LogOutButton = (): JSX.Element => {
  const router = useRouter();

  const LogOut = async (): Promise<void> => {
    try {
      await fetch(`${process.env.BASE_URL}/api/auth`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    router.push('/auth');
  };

  return (
    <Button variant='outlined' onClick={async (): Promise<void> => LogOut()}>
      Log Out
    </Button>
  );
};

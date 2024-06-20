import { Metadata } from 'next';
import React, { JSX } from 'react';
import { AuthForm } from 'src/components/AuthForm';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Auth Posts Service',
  description: 'Service authorization page with posts',
};

const Auth = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <AuthForm />
    </div>
  );
};

export default Auth;

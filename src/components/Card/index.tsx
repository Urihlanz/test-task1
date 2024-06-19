import { Button } from '@mui/material';
import Link from 'next/link';
import React, { JSX } from 'react';

import styles from './styles.module.scss';

type CardTypes = {
  title: string;
  text: string;
  id: number;
};

export const Card = ({ title, text, id }: CardTypes): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{text}</p>
      <div className={styles.footer}>
        <Link href={`/posts/${id}`}>
          <Button color='secondary'>Read</Button>
        </Link>
      </div>
    </div>
  );
};

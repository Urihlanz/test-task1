import React, { JSX } from 'react';

import styles from './styles.module.scss';

type CommentType = {
  name: string;
  email: string;
  body: string;
};

export const Comment = ({ name, email, body }: CommentType): JSX.Element => (
  <div className={styles.commentCard}>
    <h5 className={styles.title}>{name}</h5>
    <h6 className={styles.email}>{email}</h6>
    <p className={styles.comment}>{body}</p>
  </div>
);

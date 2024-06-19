'use client';

import { Pagination } from '@mui/material';
import { redirect } from 'next/navigation';
import { NextSeo } from 'next-seo';
import React, { JSX, useEffect, useState } from 'react';
import { $userStore, isAuth } from 'src/api/auth/server';
import { Card } from 'src/components/Card';

import styles from './page.module.scss';

type PostTypes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const Posts = (): JSX.Element => {
  if (!isAuth($userStore)) return redirect('/auth');

  const [posts, setPosts] = useState<PostTypes[]>();
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    getPosts();
  };

  const getPosts = async (): Promise<void> => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
      const data: PostTypes[] = await res.json();

      return setPosts(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect((): void => {
    getPosts();
  }, []);

  return (
    <>
      <NextSeo title='Post page' description='List of the recieved posts' />

      <main className={styles.main}>
        <div className={styles.wrapper}>
          {posts?.map((post, index) => {
            return <Card title={post.title} text={post.body} id={post.id} key={index} />;
          })}
          <Pagination count={10} color='primary' page={page} onChange={handlePageChange} />
        </div>
      </main>
    </>
  );
};

export default Posts;

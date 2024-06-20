import { Card } from '@components/Card';
import { LogOutButton } from '@components/LogOutButton';
import { PostsPagination } from '@components/PostsPagination';
import { getUserData } from '@store/store';
import { redirect } from 'next/navigation';
import React, { JSX } from 'react';

import styles from './page.module.scss';

type PostTypes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<PostTypes[]> {
  const res = await fetch(`${process.env.API_URL}/posts?_page=1`);
  const data: PostTypes[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data;
}

export const Posts = async (): Promise<JSX.Element> => {
  const data = await getPosts();
  if ((await getUserData()) === 401) {
    redirect('/auth');
  }

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        {data?.map((post, index) => {
          return <Card title={post.title} text={post.body} id={post.id} key={index} />;
        })}
        <PostsPagination />
        <div>
          <LogOutButton />
        </div>
      </div>
    </main>
  );
};

export default Posts;

import { Comment } from '@components/Comment';
import { Metadata } from 'next';
import React, { cache, JSX } from 'react';

import styles from './page.module.scss';

type PageProps = {
  params: Record<string, number>;
  searchParams: Record<string, never>;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type CommentType = {
  name: string;
  email: string;
  body: string;
};

const getPost = cache(
  async (params: Record<string, number>): Promise<{ postData: Post; commentData: CommentType[] }> => {
    const postRes = await fetch(`${process.env.API_URL}/posts/${params.id}`);
    const commentRes = await fetch(`${process.env.API_URL}/posts/${params.id}/comments`);
    const postData: Post = await postRes.json();
    const commentData: CommentType[] = await commentRes.json();

    if (!postRes.ok || !commentRes.ok) {
      throw new Error('Failed to fetch data');
    }

    return { postData, commentData };
  },
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postData } = await getPost(params);
  const title = postData?.title;
  const description = postData?.body;

  return {
    title: title,
    description: description,
  };
}

const Post = async ({ params }: PageProps): Promise<JSX.Element> => {
  const { postData, commentData } = await getPost(params);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{postData?.title}</h4>
        <p className={styles.text}>{postData?.body}</p>
        <div className={styles.comments}>
          {commentData?.map((comment, index) => {
            return <Comment name={comment.name} email={comment.email} body={comment.body} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;

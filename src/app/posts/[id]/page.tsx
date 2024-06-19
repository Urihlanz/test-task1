'use client';

import React, { JSX, useEffect, useState } from 'react';

import styles from './page.module.scss';

type PostPropTypes = {
  params: Record<string, number>;
  searchParams: Record<string, never>;
};

type PostTypes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type CommentTypes = {
  name: string;
  email: string;
  body: string;
};

const Comment = ({ name, email, body }: CommentTypes): JSX.Element => (
  <div className={styles.commentCard}>
    <h5 className={styles.username}>{name}</h5>
    <h6 className={styles.email}>{email}</h6>
    <p className={styles.comment}>{body}</p>
  </div>
);

const Post = ({ params }: PostPropTypes): JSX.Element => {
  const [post, setPosts] = useState<PostTypes>();
  const [comments, setComments] = useState<CommentTypes[]>();

  const getPost = async (): Promise<void> => {
    try {
      const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      const commentRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`);
      const postData: PostTypes = await postRes.json();
      const commentData: CommentTypes[] = await commentRes.json();

      return setPosts(postData), setComments(commentData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect((): void => {
    getPost();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{post?.title}</h4>
        <p className={styles.text}>{post?.body}</p>
        <div className={styles.comments}>
          {comments?.map((comment, index) => {
            return <Comment name={comment.name} email={comment.email} body={comment.body} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;

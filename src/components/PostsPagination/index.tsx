'use client';

import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';

export const PostsPagination = (): JSX.Element => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    router.push(`${process.env.BASE_URL}/posts?_page=${value}`);
  };

  return <Pagination count={10} color='primary' page={page} onChange={handlePageChange} />;
};

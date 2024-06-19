import { redirect } from 'next/navigation';
import { JSX } from 'react';

const Main = (): JSX.Element => {
  redirect('/auth');
};

export default Main;

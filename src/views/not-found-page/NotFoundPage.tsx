import styles from './NotFoundPage.module.scss';

import React from 'react';

interface IProps {}

const NotFoundPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <div className={styles.wrapper}>Page not found</div>;
};

export default NotFoundPage;

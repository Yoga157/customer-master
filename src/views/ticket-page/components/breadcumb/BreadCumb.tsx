import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './BreadCumb.scss';

interface IProps {
  link: string;
  title: string;
}
const BreadCumb: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { link, title } = props;

  return (
    <div className="breadcumb-card">
      <Link to={link}>
        <Header as="h5" className="text-gray">
          <Icon name="chevron left" />
          {title}
        </Header>
      </Link>
    </div>
  );
};

export default BreadCumb;

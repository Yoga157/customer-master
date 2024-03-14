import React from 'react';
import { Image } from 'semantic-ui-react';

interface IProps {}

const NotAuthorizedPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
        <Image src="/assets/not-authorized.png" style={{ width: '40%'}}/>;
    </div>
  )
};

export default NotAuthorizedPage;

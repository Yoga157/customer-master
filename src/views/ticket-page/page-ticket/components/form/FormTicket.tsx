import React from 'react';
import { Card, Divider } from 'semantic-ui-react';

import InputFormTicket from './components/InputFormTicket';

interface IProps {
  type: string;
  page: string;
  projectId?: any;
  rowData?: any;
}
const FormTicket: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, page, projectId, rowData } = props;

  return (
    <>
      <Card.Header className="bold-8 pt-1-5r ph-1-5r">
        {type} TICKET {rowData?.ticketUID && `#${rowData?.ticketUID}`}
      </Card.Header>
      <Divider />
      <Card.Content className="pb-2r">
        <InputFormTicket type={type} page={page} projectId={projectId} rowData={rowData} />
      </Card.Content>
    </>
  );
};

export default FormTicket;

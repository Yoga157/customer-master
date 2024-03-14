import React from 'react';
import { Card, Divider } from 'semantic-ui-react';

import IAttachmentTopActiveTableRow from 'selectors/attachment/models/IAttachmentAndAcceptenceTableRow';
import InputAcceptenceDocument from './components/InputAcceptenceDocument';

interface IProps {
  type: string;
  rowData: IAttachmentTopActiveTableRow;
}

function AcceptenceDocumentForm({ type, rowData }: IProps) {
  return (
    <>
      <Card.Header className="bold-8">{type} ACCEPTENCE DOCUMENT</Card.Header>
      <Divider />
      <Card.Content>
        <InputAcceptenceDocument type={type} rowData={rowData} />
      </Card.Content>
    </>
  );
}

export default AcceptenceDocumentForm;

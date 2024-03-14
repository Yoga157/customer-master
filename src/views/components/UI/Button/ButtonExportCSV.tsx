import React from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { Button, Icon } from 'semantic-ui-react';
export const ButtonExportCSV = (props: any) => {
  return (
    <Button icon>
      <Icon name="file excel" />
      <CSVLink data={props.data} filename={props.fileName}>
        Export
      </CSVLink>
    </Button>
  );
};

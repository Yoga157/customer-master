import React from 'react';
import { Card, Divider } from 'semantic-ui-react';

import InputFormPMO from './components/InputFormPMO';

interface IProps {
  type: string;
  projectID: number;
}
const FormPMO: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, projectID } = props;

  return (
    <>
      <Card.Header className="bold-8 pt-1-5r ph-1-5r">{type} Project</Card.Header>
      <Divider />
      <Card.Content className="pb-2r">
        <InputFormPMO type={type} projectID={projectID} />
      </Card.Content>
    </>
  );
};

export default FormPMO;

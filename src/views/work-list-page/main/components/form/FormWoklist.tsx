import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Card, Divider } from 'semantic-ui-react';

import * as WorkListActions from 'stores/work-list/WorkListActions';
import InputFormWorklist from './components/InputFormWorklist';

interface IProps {
  type: string;
  rowData: any;
}
const FormWoklist: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, rowData } = props;
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(WorkListActions.reqGetDetailWorklist(rowData.workId));
  }, []);
  return (
    <>
      <Card.Header className="bold-8">
        {type} TASK #{rowData.uid}
      </Card.Header>
      <Divider />
      <Card.Content>
        <InputFormWorklist funnelGenID="136369" rowData={rowData} />
      </Card.Content>
    </>
  );
};

export default FormWoklist;

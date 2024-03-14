import React, { useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import DetailDelegationModel from 'stores/delegation/models/DetailDelegationModel';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import RowFormDelegation from './../table-row/form/RowFormDelegation';

interface IProps {
  readonly rowData: DetailDelegationModel;
  readonly indexItem: number;
}

const DelegationTableRowForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, indexItem } = props;
  const dispatch: Dispatch = useDispatch();
  const [actionType, setActionType] = useState('');

  const handleDelete = (item) => {
    const localDetail = JSON.parse(localStorage.getItem('detailDelegation'));
    const newItem = localDetail.filter((val) => val.delegasiGenID !== item.delegasiGenID);
    let newItemIfService = localDetail.filter((val) => val.delegasiGenID === item.delegasiGenID && !val.isAdd);

    if (newItemIfService.length > 0) {
      newItemIfService = [
        {
          ...newItemIfService[0],
          isAdd: 0,
          isUpdate: 0,
          isDelete: 1,
        },
      ];
    }

    localStorage.setItem('detailDelegation', JSON.stringify([...newItem, ...newItemIfService]));
    dispatch(DelegationActions.requestApplication());
  };

  const onSubmitHandler = (formObject) => {
    setActionType('ADD');
  };
  return (
    <>
      {actionType !== 'EDIT' ? (
        <Table.Row key={rowData.delegasiGenID}>
          <Table.Cell textAlign="center">{rowData.toUserStr}</Table.Cell>
          <Table.Cell textAlign="center">{rowData.applicationStr}</Table.Cell>

          <Table.Cell textAlign="center" width="1">
            {/* {currentUser.role == 'SuperAdmin' ||
          (currentUser.role == 'Presales' && ( */}
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Edit/View"
                  icon="edit outline"
                  onClick={() => {
                    setActionType('EDIT');
                  }}
                />
                <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(rowData)} />
              </Dropdown.Menu>
            </Dropdown>
            {/* ))} */}
          </Table.Cell>
        </Table.Row>
      ) : (
        <RowFormDelegation rowData={rowData} type="EDIT" enableRow={onSubmitHandler} indexItem={indexItem + 2} />
      )}
    </>
  );
};

export default DelegationTableRowForm;

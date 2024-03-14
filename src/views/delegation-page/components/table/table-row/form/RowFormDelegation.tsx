import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Search, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';
import { selectApplication } from 'selectors/delegation/DelegationSelectors';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import IStore from 'models/IStore';
import './RowFormDelegation.scss';

interface IProps {
  type: string;
  rowData: any;
  enableRow: any;
  indexItem: number;
}
const RowFormDelegation: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, type } = props;
  const dispatch: Dispatch = useDispatch();
  const userEmployee = useSelector((state: IStore) => selectEmployeeSemantic(state));
  const application = useSelector((state: IStore) => selectApplication(state));

  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(0);
  const [isExist, setIsExist] = useState(false);
  const [detailDelegation, setDetailDelegation] = useState({
    toUser: 0,
    toUserStr: '',
    application: 0,
  });

  useEffect(() => {
    dispatch(DelegationActions.requestApplication());
  }, []);

  useEffect(() => {
    if (type === 'EDIT') {
      setSelectedEmployee(rowData.toUserStr);
      setSelectedApplication(rowData.application);
    }
  }, [application]);

  const resetField = () => {
    setSelectedEmployee('');
    setSelectedApplication(0);
    setIsExist(false);
    setDetailDelegation({
      toUser: 0,
      toUserStr: '',
      application: 0,
    });
    dispatch(DelegationActions.requestApplication());
  };

  const saveToLocal = (delegationId: number, selectAppStr: string, localDetail: any) => {
    const newItem = {
      ...detailDelegation,
      applicationStr: selectAppStr === 'E.g. Aplication Type' ? '' : selectAppStr,
      delegasiGenID: delegationId,
      isAdd: 1,
      isDelete: 0,
      isUpdate: 0,
    };
    if (localDetail) {
      localStorage.setItem('detailDelegation', JSON.stringify([...localDetail, newItem]));
    } else {
      localStorage.setItem('detailDelegation', JSON.stringify([newItem]));
    }
  };

  const onSubmitHandler = () => {
    let selectAppStr = document.querySelector(`#select-${props.indexItem} > div.text`).textContent; //

    const localDetail = JSON.parse(localStorage.getItem('detailDelegation'));
    if (props.type !== 'EDIT') {
      if (localDetail) {
        let delGenId: number;
        if (localDetail.length === 0) {
          delGenId = 1;
        } else {
          delGenId =
            Math.max.apply(
              Math,
              localDetail?.map((item) => item.delegasiGenID)
            ) + 1;
        }
        saveToLocal(delGenId, selectAppStr, localDetail);
      } else {
        saveToLocal(1, selectAppStr, false);
      }
      resetField();
    } else {
      const newItem = localDetail.filter((val) => val.delegasiGenID !== rowData.delegasiGenID);

      const itemUpdate = {
        toUser: detailDelegation.toUser ? detailDelegation.toUser : rowData.toUser,
        toUserStr: detailDelegation.toUserStr ? detailDelegation.toUserStr : rowData.toUserStr,
        application: detailDelegation.application ? detailDelegation.application : rowData.application,
        applicationStr: selectAppStr === 'E.g. Aplication Type' ? '' : selectAppStr,
        delegasiGenID: rowData.delegasiGenID,
        isAdd: rowData.isAdd ? 1 : 0,
        isUpdate: rowData.isAdd ? 0 : 1,
        isDelete: 0,
      };

      localStorage.setItem('detailDelegation', JSON.stringify([...newItem, itemUpdate]));
      props.enableRow(itemUpdate);

      resetField();
    }
  };

  const handleSearchEmployee = (e, data) => {
    setSelectedEmployee(data.value);
    dispatch(EmployeeActions.requestEmployeeByName(data.value, ''));
    if (type === 'EDIT') {
      const localDetail = JSON.parse(localStorage.getItem('detailDelegation'));
      if (localDetail) {
        const localDetail = JSON.parse(localStorage.getItem('detailDelegation'));
        if (localDetail) {
          const exsist = localDetail.filter((val) => val.application === Number(data.value) && val.isDelete !== 1);
          const exsistAll = localDetail.filter((val) => val.applicationStr === 'ALL' && val.isDelete !== 1);
          if (exsistAll.length > 0) {
            detailDelegation.application === 0 ? setIsExist(false) : setIsExist(true);
          } else {
            exsist.length > 0 ? setIsExist(true) : setIsExist(false);
          }
        }
      }
    }
  };

  const onResultEmployee = (e, data) => {
    setSelectedEmployee(data.result.title);
    setDetailDelegation({ ...detailDelegation, toUser: data.result.price, toUserStr: data.result.title });
  };

  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Search
          minCharacters={3}
          placeholder="E.g. Emplyee Name"
          results={userEmployee}
          onSearchChange={handleSearchEmployee}
          onResultSelect={onResultEmployee}
          value={selectedEmployee}
          id={`search-${props.indexItem}`}
          className="search-usr"
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Dropdown
          placeholder="E.g. Aplication Type"
          selection
          options={application}
          onChange={(e, data) => {
            setSelectedApplication(Number(data.value));

            const localDetail = JSON.parse(localStorage.getItem('detailDelegation'));
            if (localDetail) {
              const exsist = localDetail.filter((val) => val.application === Number(data.value) && val.isDelete !== 1);
              const exsistAll = localDetail.filter((val) => val.applicationStr === 'ALL' && val.isDelete !== 1);

              if (exsistAll.length > 0) {
                setIsExist(true);
              } else {
                exsist.length > 0 ? setIsExist(true) : setIsExist(false);
              }
            } else {
              setIsExist(false);
            }
            setDetailDelegation({ ...detailDelegation, application: Number(data.value) });
          }}
          value={selectedApplication ? selectedApplication : null}
          className="width-100"
          id={`select-${props.indexItem}`}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        {type === 'EDIT' ? (
          // <Button size="tiny" type="button" content="Save" color="blue" disabled={isExist} onClick={() => onSubmitHandler()} />
          <Button.Group size="tiny">
            <Button color="yellow" type="button" content="Cancel" onClick={() => props.enableRow({})} className="mr-1" />
            <Button color="blue" type="button" content="Save" disabled={isExist} onClick={() => onSubmitHandler()} />
          </Button.Group>
        ) : (
          <Button
            type="button"
            content="Save"
            color="blue"
            disabled={detailDelegation.toUser === 0 || detailDelegation.application === 0 || isExist}
            onClick={() => onSubmitHandler()}
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default RowFormDelegation;

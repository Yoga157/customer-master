import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Table } from 'semantic-ui-react';
import { Field } from 'react-final-form';
import { Dispatch } from 'redux';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import styles from './../ProductListTable.module.scss';
import { TextInput } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {
  index: number;
  rowData: any;
  type;
}
const ProductListTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { index, rowData, type } = props;
  const dispatch: Dispatch = useDispatch();
  const [actionType, setActionType] = useState('');
  const [initValues, setValues] = useState({} as any);

  useEffect(() => {
    setActionType('');
    setValues(rowData);
  }, [rowData]);

  const handlePut = () => {
    dispatch(WorkListActions.putActivityProduct(initValues));
    toggleIsEdit();
  };

  const toggleIsEdit = () => {
    setActionType(actionType === 'EDIT' ? '' : 'EDIT');
    setValues(rowData);
  };
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));
  return (
    <Table.Row>
      {type !== 'ViewDetail' && (
        <Table.Cell>
          <div className={`${styles.cellAction}`}>
            <div
              className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-yellow' : 'bg-blue'} ${
                !initValues.productName && !initValues.productNumber && !initValues.serialNumber && !initValues.salesUnit
                  ? `hover-disabled`
                  : `hover-pointer`
              }`}
              onClick={() => {
                if (actionType === 'EDIT') {
                  (initValues.productName || initValues.productNumber || initValues.serialNumber || initValues.salesUnit) && handlePut();
                } else {
                  toggleIsEdit();
                }
              }}
            >
              <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
            </div>

            <div
              className={`${styles.icCircle}  ${'bg-red'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
              onClick={() => {
                actionType !== 'EDIT' ? dispatch(WorkListActions.deleteActivityProduct(rowData.activityReportProductGenID)) : toggleIsEdit();
              }}
            >
              <Icon name={actionType !== 'EDIT' ? 'trash' : 'close'} size="small" className="text-white" />
            </div>
          </div>
        </Table.Cell>
      )}

      <Table.Cell>
        {actionType !== 'EDIT' ? (
          rowData.productName
        ) : (
          <Field
            name={`${index}-productName`}
            component={TextInput}
            placeholder="Product Name"
            isRow={true}
            values={initValues.productName}
            onChange={(e) =>
              setValues({
                ...initValues,
                productName: e,
              })
            }
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {actionType !== 'EDIT' ? (
          rowData.productNumber
        ) : (
          <Field
            name={`${index}-productNumber`}
            component={TextInput}
            placeholder="Product Number"
            isRow={true}
            values={initValues.productNumber}
            onChange={(e) =>
              setValues({
                ...initValues,
                productNumber: e,
              })
            }
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {actionType !== 'EDIT' ? (
          rowData.serialNumber
        ) : (
          <Field
            name={`${index}-serialNumber`}
            component={TextInput}
            placeholder="Serial Number"
            isRow={true}
            values={initValues.serialNumber}
            onChange={(e) =>
              setValues({
                ...initValues,
                serialNumber: e,
              })
            }
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {actionType !== 'EDIT' ? (
          rowData.salesUnit
        ) : (
          <Field
            name={`${index}-salesUnit`}
            component={TextInput}
            placeholder="Sales Unit"
            isRow={true}
            values={initValues.salesUnit}
            onChange={(e) =>
              setValues({
                ...initValues,
                salesUnit: e,
              })
            }
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductListTableRow;

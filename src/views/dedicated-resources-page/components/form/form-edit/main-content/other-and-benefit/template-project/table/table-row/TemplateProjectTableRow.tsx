import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, } from 'react-redux';
import { Button, CheckBox } from 'views/components/UI';
import OtherBenefitTemplateProject from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';

interface IProps {
  readonly rowData?: OtherBenefitTemplateProject;
  flag?: string
  Temp?: any;
  setTemp?: any;
}

const TemplateProjectTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, flag, setTemp, Temp } = props;
  const [cheking, setCheking] = useState(rowData.isSave === 1 ? true : false)
  // console.log('rowData',rowData)
  const onChangeChecked = (e: any, checked: any) => {
    const filtered = Temp.filter(item => item.benefitDesc !== rowData.benefitDesc);
    setTemp(filtered)
    if (checked.checked) {
      setCheking(true)
    } else {
      setCheking(false)
    }
  }

  return (
    <>
      <Table.Row>
        <Table.Cell textAlign="left">{rowData.benefitTypeStr}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.benefitDescStr}</Table.Cell>
        <Table.Cell textAlign="left"><CheckBox checked={cheking} onChange={onChangeChecked} /></Table.Cell>
      </Table.Row>
    </>
  );
};

export default TemplateProjectTableRow;

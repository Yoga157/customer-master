import React, { useCallback } from 'react';
import { Item } from 'semantic-ui-react';
import ISummaryActionPlanItem from 'selectors/summary-actionplan/models/ISummaryActionPlanItem';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  readonly rowData: ISummaryActionPlanItem;
}

const HistorySummaryActionPlanItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  return (
    <Item key={rowData.logDate?.toString()} className="UnupdateAvatar">
      <Item.Image size="tiny" src={'/assets/UserDefault.svg'} />
      <Item.Content className="pl-1">
        <Item.Header as="a">{rowData.logUser}</Item.Header>
        <Item.Meta>{rowData.logDate}</Item.Meta>
        <Item.Description>
          {rowData.forSales}
          {rowData.actionPlan.length > 0 ? ReactHtmlParser(rowData.actionPlan) : ''}
          {rowData.reviewMonth}
        </Item.Description>
        {}
      </Item.Content>
    </Item>
  );
};

export default HistorySummaryActionPlanItems;

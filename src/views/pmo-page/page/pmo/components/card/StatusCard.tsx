import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react';

interface IProps {
  item: any;
  index?: number;
}
const StatusCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { item, index } = props;
  const { name, size, icColor } = item.icon;

  const dispatch = useDispatch();

  const path = window.location.pathname;
  return (
    <Grid.Column
      width={3}
      className={`${path !== '/data-quality/pmo' ? 'ItemStatusPMODetail' : 'ItemStatusPMO'} ${item.bg} ${item.hover ? 'hover-pointer' : ''}`}
      onClick={() => (item.action.type === 'modal' ? dispatch(item.action.item) : console.log('sttus card ok'))}
    >
      <Grid columns="equal">
        <Grid.Row className="row-item-status-pmo">
          <Grid.Column verticalAlign="middle" className="col-icon">
            <h5>
              <Icon size={size} circular name={name} className={`${icColor}`} />
            </h5>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="left" className={`ph-05r ${path !== '/data-quality/pmo' ? 'width-200' : 'width-140'}`}>
            <span className={item.bg === 'bg-gray-light' || item.bg === 'bg-yellow' ? 'text-black-900' : 'text-white-900'}>{item.title}</span>
            <h2 className={item.bg === 'bg-gray-light' || item.bg === 'bg-yellow' ? 'text-black' : 'text-white'}>
              {item.sub1}{' '}
              <span className={item.bg === 'bg-gray-light' || item.bg === 'bg-yellow' ? 'text-black-900' : 'text-white-900'}>{item.sub2}</span>
            </h2>
            {path !== '/data-quality/pmo' && <span className={index === 1 ? 'text-black-900' : 'text-white-900'}>{item.text}</span>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  );
};

export default StatusCard;

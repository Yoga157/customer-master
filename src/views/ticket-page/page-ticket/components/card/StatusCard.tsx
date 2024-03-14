import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

interface IProps {
  item: any;
  index?: number;
}
const StatusCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { item, index } = props;

  const dispatch = useDispatch();

  const path = window.location.pathname;

  return (
    <div
      className={`card-status ${item.bg} ${item.hover ? 'hover-pointer' : ''} mv-5 mh-5`}
      onClick={() => (item.action.type === 'modal' ? dispatch(item.action.item) : alert('ok'))}
    >
      <div className="item-card-status">
        {item.icon && (
          <div className="icon-status">
            <Icon size={item.size} circular name={item.name} className={`${item.icColor}`} />
          </div>
        )}

        <div className="text-status">
          <h1 className={item.textColor.title}>{item.title}</h1>
          <p className={item.textColor.sub}>{item.sub1}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;

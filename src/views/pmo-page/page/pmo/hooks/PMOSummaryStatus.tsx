import React from 'react';
import { useSelector } from 'react-redux';

function PMOSummaryStatus() {
  const pmoSummaryStatus: any = useSelector((state: any) => state.pmo.pmoSummaryStatus);

  const getStyle = (item: string) => {
    switch (item) {
      case 'Not Started':
        return {
          title: item,
          bg: 'bg-gray-light',
          icColor: 'icon-gray',
        };
      case 'On Progress':
        return {
          title: item,
          bg: 'bg-purple2',
          icColor: 'icon-purple2',
        };
      case 'On Hold':
        return {
          title: item,
          bg: 'bg-yellow',
          icColor: 'icon-yellow',
        };
      case 'Handover to SMO':
        return {
          title: 'Handover SMO',
          bg: 'bg-green',
          icColor: 'icon-green',
        };
      case 'Handover to Berca Support':
        return {
          title: 'Handover BS',
          bg: 'bg-purple1',
          icColor: 'icon-purple1',
        };
      case 'Handover 3rd':
        return {
          title: 'Handover Third',
          bg: 'bg-brown',
          icColor: 'icon-brown',
        };
      case 'Completed':
        return {
          title: item,
          bg: 'bg-blue',
          icColor: 'icon-blue',
        };
      case 'Void':
        return {
          title: item,
          bg: 'bg-red',
          icColor: 'icon-red',
        };
      default:
        return {
          title: item,
          bg: 'bg-gray-light',
          icColor: 'icon-gray',
        };
    }
  };

  let tempDataStatus = [];

  if (pmoSummaryStatus?.length > 0) {
    tempDataStatus = pmoSummaryStatus.map((item: any) => {
      let val = item.valueData;
      return {
        title: getStyle(item.textData).title,
        sub1: val?.split('/')[0],
        sub2: '/' + val?.split('/')[1],
        bg: getStyle(item.textData).bg,
        icon: {
          name: 'share alternate',
          size: 'large',
          icColor: getStyle(item.textData).icColor,
        },
      };
    });
  }

  return [tempDataStatus];
}

export default PMOSummaryStatus;

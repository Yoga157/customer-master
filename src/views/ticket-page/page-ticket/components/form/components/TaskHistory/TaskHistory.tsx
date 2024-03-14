import React, { Fragment } from 'react';

import ReactHtmlParser from 'react-html-parser';
import './TaskHistory.scss';

function TaskHistory({ page, history }) {
  // page="gundam" history={history}

  return (
    <div className={page === 'ticket' ? 'content-history-ticket' : 'content-history'}>
      {page === 'gundam' && (
        <ul style={{ maxHeight: 500, overflow: 'auto' }}>
          {history.map((item, index) => (
            <span style={{ marginBottom: 10, display: 'inline-block' }} key={index}>
              <li className={'pb-0'}>
                <span className="info-text-history">{item.activityTitle}</span>
                <span className="info-date-history"> - {item.activityText} </span>
              </li>
              {(item?.activityTitle.includes('Void') || item?.activityTitle.includes('Hold')) && (
                <li className={'remarks-hisrotory pt-0'}>
                  <span className="info-remarks-hisrotory">
                    <>
                      <b>Remarks</b> <i className="ph-05r">-</i> {item.taskRemark && ReactHtmlParser(item.taskRemark)}
                    </>
                  </span>
                </li>
              )}
            </span>
          ))}
        </ul>
      )}

      {page !== 'gundam' && (
        <ul style={{ maxHeight: 500, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {history.map((item, index) => (
            <span style={{ marginBottom: 10, display: 'inline-block' }} key={index}>
              <li className={'pb-0'}>
                <span className="info-text-history">{item.activityTitle}</span>
                <span className="info-date-history"> - {item.activityText} </span>
              </li>
              {(item?.activityTitle.includes('Void') || item?.activityTitle.includes('Hold')) && (
                <li className={'remarks-hisrotory pt-0'}>
                  <span className="info-remarks-hisrotory">
                    <>
                      <b>Remarks</b> <i className="ph-05r">-</i> {item.taskRemark && ReactHtmlParser(item.taskRemark)}
                    </>
                  </span>
                </li>
              )}
            </span>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskHistory;

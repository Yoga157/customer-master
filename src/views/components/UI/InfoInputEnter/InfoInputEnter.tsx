import React from 'react';

function InfoInputEnter() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <p className="BtmFormNote" style={{ fontWeight: 'lighter' }}>
        Press <span style={{ fontWeight: 'bold' }}>ENTER</span> to show results.
      </p>
    </div>
  );
}

export default InfoInputEnter;

import moment from 'moment';
import React, { useState } from 'react';
import { createValidator } from 'revalidate';

function ValidateEstDateHook() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndate] = useState(null);

  const isValidEstStartByPmo = createValidator(
    (message) => (value) => {
      setStartDate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'Est. Start Project must be less than Est. End Project';
      }
    },
    'Est. Start Project is required!'
  );

  const isValidEstEndByPmo = createValidator(
    (message) => (value) => {
      setEndate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'Est. End Project must be more than Est. Start Project';
      }
    },
    'Est. End Project is required!'
  );

  return { isValidEstStartByPmo, isValidEstEndByPmo };
}

export default ValidateEstDateHook;

import moment from 'moment';
import React, { useState } from 'react';
import { createValidator } from 'revalidate';

function ValidateContractDateHook() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndate] = useState(null);

  const isValidContractStart = createValidator(
    (message) => (value) => {
      setStartDate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'Start Contract must be less than End Contract';
      }
    },
    'Start Contract is required!'
  );

  const isValidContractEnd = createValidator(
    (message) => (value) => {
      setEndate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'End Contract must be more than Start Contract';
      }
    },
    'End Contract is required!'
  );

  return { isValidContractStart, isValidContractEnd };
}

export default ValidateContractDateHook;

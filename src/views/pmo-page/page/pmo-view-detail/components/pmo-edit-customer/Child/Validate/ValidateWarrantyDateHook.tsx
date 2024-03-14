import moment from 'moment';
import React, { useState } from 'react';
import { createValidator } from 'revalidate';

function ValidateWarrantyDateHook() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndate] = useState(null);

  const isValidWarrantyStart = createValidator(
    (message) => (value) => {
      setStartDate(value);

      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'Customer Warranty Start Date must be less than Customer Warranty End Date';
      }
    },
    'Customer Warranty Start Date is required!'
  );

  const isValidWarrantyEnd = createValidator(
    (message) => (value) => {
      setEndate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 0) {
        return 'Customer Warranty End Date must be more than Customer Warranty Start Date';
      }
    },
    'Customer Warranty End Date is required!'
  );

  return { isValidWarrantyStart, isValidWarrantyEnd };
}

export default ValidateWarrantyDateHook;

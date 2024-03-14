import React, { useState } from 'react';
import moment from 'moment';

import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import tinymce from 'tinymce';

function ValidateActivityFormInput({ status }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);

  const isValidResource = createValidator(
    (message) => (value) => {
      if (value && value.length === 0) {
        return message;
      }
    },
    'Engineer List is required!'
  );

  const isValidDescError = createValidator(
    (message) => (value) => {
      var content = tinymce.get('description')?.getContent({ format: 'text' });

      if (value && $.trim(content).length < 15) {
        return 'Description/Error Message Minimal must 15 characters!';
      } else if (value && $.trim(content) === '') {
        return message;
      } else {
        return false;
      }
    },
    'Description/Error Message is required!'
  );

  const isValidActionTaken = createValidator(
    (message) => (value) => {
      var content = tinymce.get('actionTaken')?.getContent({ format: 'text' });
      if (value && $.trim(content).length < 15) {
        return 'Action Taken Minimal must 15 characters!';
      } else if (value && $.trim(content) === '') {
        return message;
      } else {
        return false;
      }
    },
    'Action Taken is required!'
  );

  const isValidAddress = createValidator(
    (message) => (value) => {
      var content = tinymce.get('address')?.getContent({ format: 'text' });

      if (value && $.trim(content) === '') {
        return message;
      } else {
        return false;
      }
    },
    'Adress is required!'
  );

  const validNoteByStatus = createValidator(
    (message) => (value) => {
      var content = tinymce.get('notes')?.getContent({ format: 'text' });

      if (!value && status === 'Pending') {
        return message;
      }
    },
    'Notes is required!'
  );

  const isValidStartDate = createValidator(
    (message) => (value) => {
      setStartDate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 1) {
        return 'Start Date must be less than Finish Date';
      }
    },
    'Start Date is required!'
  );

  const isValidEndDate = createValidator(
    (message) => (value) => {
      setEndDate(value);
      if (value && moment(endDate).diff(moment(startDate), 'hours') < 1) {
        return 'Finish Date must be more than Start Date';
      }
    },
    'Finish Date is required!'
  );

  const isValidDepartureDate = createValidator(
    (message) => (value) => {
      setDepartureDate(value);
      if (value && moment(arrivalDate).diff(moment(departureDate), 'hours') < 1) {
        return 'Departure Date must be less than Arrival Date';
      }
    },
    'Departure Date is required!'
  );

  const isValidArrivalDate = createValidator(
    (message) => (value) => {
      setArrivalDate(value);
      if (value && moment(arrivalDate).diff(moment(departureDate), 'hours') < 1) {
        return 'Arrival Date must be more than Departure Date';
      }
    },
    'Arrival Date is required!'
  );

  const validate = combineValidators({
    contactName: isRequired('Contact Name'),
    phone: isRequired('Contact Number'),
    startDate: composeValidators(isRequired('Start Date'), isValidStartDate)(),
    endDate: composeValidators(isRequired('Finish Date'), isValidEndDate)(),
    departureDate: composeValidators(isRequired('Departure Date'), isValidDepartureDate)(),
    arrivalDate: composeValidators(isRequired('Arrival Date'), isValidArrivalDate)(),
    status: isRequired('Status'),
    engineerList: composeValidators(isRequired('Engineer List'), isValidResource)(),
    address: composeValidators(isRequired('Address'), isValidAddress)(),
    description: composeValidators(isRequired('Description/Error Message'), isValidDescError)(),
    actionTaken: composeValidators(isRequired('Action Taken'), isValidActionTaken)(),
    notes: composeValidators(validNoteByStatus)(),
  });
  return [validate];
}

export default ValidateActivityFormInput;

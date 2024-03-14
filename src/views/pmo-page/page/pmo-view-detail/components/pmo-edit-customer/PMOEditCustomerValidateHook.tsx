import React, { useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { useSelector } from 'react-redux';
import tinymce from 'tinymce';
import moment from 'moment';

import { ValidateContractDateHook, ValidateEstDateHook, ValidateWarrantyDateHook } from './Child/Validate';

const PMOEditCustomerValidateHook = ({ pmoViewEditStatus }) => {
  let { isValidWarrantyStart, isValidWarrantyEnd } = ValidateWarrantyDateHook();
  let { isValidContractStart, isValidContractEnd } = ValidateContractDateHook();
  let { isValidEstStartByPmo, isValidEstEndByPmo } = ValidateEstDateHook();

  const isValid3rdName = createValidator(
    (message) => (value) => {
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    '3rd Party Name is required!'
  );

  const isValidt3rdPicName = createValidator(
    (message) => (value) => {
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    'PIC Name is required!'
  );

  const isValid3rdPhoneNumber = createValidator(
    (message) => (value) => {
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    'PIC Phone Number is required!'
  );

  const validate = combineValidators({
    warrantyStart: composeValidators(isValidWarrantyStart)(),
    warrantyEnd: composeValidators(isValidWarrantyEnd)(),
    contractStart: composeValidators(isValidContractStart)(),
    contractEnd: composeValidators(isValidContractEnd)(),
    estStartByPmo: composeValidators(isValidEstStartByPmo)(),
    estEndByPmo: composeValidators(isValidEstEndByPmo)(),

    thirdPartyName: composeValidators(isValid3rdName)(),
    thirdPartyPicName: composeValidators(isValidt3rdPicName)(),
    thirdPartyPhoneNumber: composeValidators(isValid3rdPhoneNumber)(),
  });

  return { validate };
};

export default PMOEditCustomerValidateHook;

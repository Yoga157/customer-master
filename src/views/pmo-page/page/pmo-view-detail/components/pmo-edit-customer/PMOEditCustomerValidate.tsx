import React, { useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { useSelector } from 'react-redux';
import tinymce from 'tinymce';
import moment from 'moment';

import { selectPMOProjectViewEditStatus } from 'selectors/pmo/PMOSelector';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import IStore from 'models/IStore';

function PMOEditCustomerValidate() {
  const [warrantyStart, setWarrantyStart] = useState(null);
  const [warrantyEnd, setWarrantyEnd] = useState(null);

  const [contractStart, setContractStart] = useState(null);
  const [contractEnd, setContractEnd] = useState(null);

  const [estStartBypmo, setEstStartBypmo] = useState(null);
  const [estEndBypmo, setEstEndBypmo] = useState(null);

  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));

  const isValidWarrantyStart = createValidator(
    (message) => (value) => {
      setWarrantyStart(value);
      if (value && moment(warrantyEnd).diff(moment(warrantyStart), 'hours') < 0) {
        return 'Customer Warranty Start Date must be less than Customer Warranty End Date';
      }
    },
    'Customer Warranty Start Date is required!'
  );

  const isValidWarrantyEnd = createValidator(
    (message) => (value) => {
      setWarrantyEnd(value);
      if (value && moment(warrantyEnd).diff(moment(warrantyStart), 'hours') < 0) {
        return 'Customer Warranty End Date must be more than Customer Warranty Start Date';
      }
    },
    'Customer Warranty End Date is required!'
  );

  const isValidContractStart = createValidator(
    (message) => (value) => {
      setContractStart(value);
      if (value && moment(contractEnd).diff(moment(contractStart), 'hours') < 0) {
        return 'Start Contract must be less than End Contract';
      }
    },
    'Start Contract is required!'
  );

  const isValidContractEnd = createValidator(
    (message) => (value) => {
      setContractEnd(value);
      if (value && moment(contractEnd).diff(moment(contractStart), 'hours') < 0) {
        return 'End Contract must be more than Start Contract';
      }
    },
    'End Contract is required!'
  );

  const isValidEstStartByPmo = createValidator(
    (message) => (value) => {
      setEstStartBypmo(value);
      if (value && moment(estEndBypmo).diff(moment(estStartBypmo), 'hours') < 0) {
        return 'Est. Start Project must be less than Est. End Project';
      }
    },
    'Est. Start Project is required!'
  );

  const isValidEstEndByPmo = createValidator(
    (message) => (value) => {
      setEstEndBypmo(value);
      if (value && moment(estEndBypmo).diff(moment(estStartBypmo), 'hours') < 0) {
        return 'Est. End Project must be more than Est. Start Project';
      }
    },
    'Est. End Project is required!'
  );

  const isValid3rdName = createValidator(
    (message) => (value) => {
      setEstEndBypmo(value);
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    '3rd Party Name is required!'
  );

  const isValidt3rdPicName = createValidator(
    (message) => (value) => {
      setEstEndBypmo(value);
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    'PIC Name is required!'
  );

  const isValid3rdPhoneNumber = createValidator(
    (message) => (value) => {
      setEstEndBypmo(value);
      if (!value && pmoViewEditStatus.projectStatus === 'Handover 3rd') {
        return message;
      }
    },
    'PIC Phone Number is required!'
  );

  const validate = combineValidators({
    warrantyStart: composeValidators(isValidWarrantyStart, isRequired('Customer Warranty Start Date'))(),
    warrantyEnd: composeValidators(isValidWarrantyEnd, isRequired('Customer Warranty End Date'))(),
    contractStart: composeValidators(isValidContractStart)(),
    contractEnd: composeValidators(isValidContractEnd)(),
    estStartByPmo: composeValidators(isValidEstStartByPmo)(),
    estEndByPmo: composeValidators(isValidEstEndByPmo)(),

    thirdPartyName: composeValidators(isValid3rdName)(),
    thirdPartyPicName: composeValidators(isValidt3rdPicName)(),
    thirdPartyPhoneNumber: composeValidators(isValid3rdPhoneNumber)(),
  });

  return [validate];
}

export default PMOEditCustomerValidate;

import React from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import tinymce from 'tinymce';

function InputFormWorklistValidateHooks({ assignToList, taskStatus, issueType, emailReceiverList, emailCcList, sendEmail }) {
  const isValidResource = createValidator(
    (message) => (value) => {
      if (assignToList.length === 0 && taskStatus !== 'New' && taskStatus !== 'Hold' && taskStatus !== 'Void') {
        return message;
      }
      // else if (!value && taskStatus !== 'New' && taskStatus !== 'Hold' && taskStatus !== 'Void') {
      //   return message;
      // }
    },
    'Assigned To is required!'
  );

  const isValidSecondResource = createValidator(
    (message) => (value) => {
      if (value && value.length === 0) {
        return message;
      }
    },
    'Secondary Resourch is required!'
  );

  const isValidRemarks = createValidator(
    (message) => (value) => {
      var content = tinymce.get('work-remark')?.getContent({ format: 'text' });
      if (($.trim(content) == '' && taskStatus === 'Void') || ($.trim(content) == '' && taskStatus === 'Hold')) {
        return message;
      }
    },
    'Remarks is required!'
  );

  const isValidBrand = createValidator(
    (message) => (value) => {
      if (!value && (issueType === 'Add-on (Hardware)' || issueType === 'Hardware Problem')) {
        return message;
      }
    },
    'Brand is required!'
  );

  const isValidSubBrand = createValidator(
    (message) => (value) => {
      if (!value && (issueType === 'Add-on (Hardware)' || issueType === 'Hardware Problem')) {
        return message;
      }
    },
    'Sub Brand is required!'
  );

  const isValidEmailReceiver = createValidator(
    (message) => (value) => {
      if (emailReceiverList.length === 0 && sendEmail) {
        return message;
      }
    },
    'Sent Email To is required!'
  );

  const isValidEmailCC = createValidator(
    (message) => (value) => {
      if (emailCcList.length === 0 && sendEmail) {
        return message;
      }
    },
    'CC To is required!'
  );

  const validate = combineValidators({
    taskStatus: isRequired('Task Status'),
    category: isRequired('Category'),
    issueType: isRequired('Issue Type'),
    slaAssignment: isRequired('Serive Level Agreement'),
    taskResource: composeValidators(isValidResource)(),
    secondaryResources: composeValidators(isRequired('Secondary Resourch'), isValidSecondResource)(),
    // imageFile: composeValidators(isValidImages)(),
    brand: composeValidators(isValidBrand)(),
    subBrand: composeValidators(isValidSubBrand)(),
    emailReceiver: composeValidators(isValidEmailReceiver)(),
    // emailCc: composeValidators(isValidEmailCC)(),
    remark: composeValidators(isValidRemarks)(),
  });

  return { validate };
}

export default InputFormWorklistValidateHooks;

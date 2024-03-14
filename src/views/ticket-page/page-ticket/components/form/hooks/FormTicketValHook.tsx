import moment from 'moment';
import React, { useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import tinymce from 'tinymce';

export const getLengthText = (text: string, minLength: number) => {
  const val = text?.replace(/\&nbsp;/g, '');
  if (
    val
      ?.replace(/<[^>]+>/g, '')
      ?.trim()
      ?.replace(/\s/g, '').length <= minLength
  ) {
    return true;
  } else {
    return false;
  }
};

function FormTicketValHook({
  status,
  valSearchSummary,
  configList,
  valSNSearchList,
  resourceList,
  secondResourceList,
  initValTemplate,
  taskCategory,
  taskSubCategory,
  ticketDetail,
  type,
  page,

  setEstDate,
  estDate,

  emailReceiverList,
  emailCcList,
  sendEmail,
}) {
  const [estStartDate, setEstStartDate] = useState(null);
  const [estEndDate, setEstEndDate] = useState(null);

  const isValidSearchConfig = createValidator(
    (message) => (value) => {
      if (valSNSearchList.length === 0 && configList?.rows?.length > 0) {
        return message;
      }
    },
    'Serial Number is required!'
  );

  const isValidRemarks = createValidator(
    (message) => (value) => {
      var content = tinymce.get('ticket-remark')?.getContent({ format: 'text' });
      if (($.trim(content) == '' && status === 'Void') || ($.trim(content) == '' && status === 'Hold')) {
        return message;
      }
    },
    'Remarks is required!'
  );

  const isValidSearchSummary = createValidator(
    (message) => (value) => {
      if (type !== 'EDIT' && (!valSearchSummary.title || !valSearchSummary.isSelect) && page !== 'pmo-view-edit') {
        return message;
      }
    },
    'Search By is required!'
  );

  const isPrimaryResource = createValidator(
    (message) => (value) => {
      if (value && resourceList.length === 0 && type === 'EDIT' && status !== 'New' && status !== 'Hold' && status !== 'Void') {
        return message;
      } else if (resourceList.length === 0 && type === 'EDIT' && status !== 'New' && status !== 'Hold' && status !== 'Void') {
        return message;
      }
    },
    'Resource is required!'
  );

  const isValidSecondResource = createValidator(
    (message) => (value) => {
      if (!value && secondResourceList.length === 0) {
        return message;
      } else if (value?.length === 0 && secondResourceList.length === 0) {
        return message;
      }
    },
    'Resource is required!'
  );

  const isValidDesc = createValidator(
    (message) => (value) => {
      if (value && getLengthText(value, 30)) {
        return message;
      }
    },
    'Minimum 30 Characters!'
  );

  const isValidResolution = createValidator(
    (message) => (value) => {
      var content = tinymce.get('ticket-resolution')?.getContent({ format: 'text' });
      if (value && getLengthText(value, 30) && type === 'EDIT' && status === 'Resolved') {
        return message;
      } else if (!value && type === 'EDIT' && status === 'Resolved') {
        return 'Resolution is required!';
      }
    },
    'Minimum 30 Characters!'
  );

  const isValidCategory = createValidator(
    (message) => (value) => {
      if (!value || !taskCategory?.filter((e) => e.text !== 'Implementation').find((e) => e.text === initValTemplate.category)) {
        return message;
      }
    },
    'Category is required!'
  );

  const isValidSubCategory = createValidator(
    (message) => (value) => {
      // if (value && !initValTemplate.subcategory) {
      //   return message;
      // } else
      if (!value) {
        return message;
      } else if (taskSubCategory.length === 0) {
        return message;
      }
    },
    'Sub Category is required!'
  );

  const isValidEstStartDate = createValidator(
    (message) => (value) => {
      setEstStartDate(value);
      if (value && moment(estEndDate).diff(moment(estStartDate), 'hours') < 0) {
        return 'Est. Start Date must be less than Est. End Date';
      }
    },
    'Est. Start Date is required!'
  );

  const isValidEstEndDate = createValidator(
    (message) => (value) => {
      setEstEndDate(estDate.estEndDate);
      if (!estDate.estEndDate) {
        return message;
      } else if (value && moment(estEndDate).diff(moment(estStartDate), 'hours') < 0) {
        return 'Est. End Date must be more than Est. Start Date';
      }
    },
    'Est. End Date is required!'
  );

  const isValidEmailReceiver = createValidator(
    (message) => (value) => {
      if (emailReceiverList.length === 0 && sendEmail) {
        return message;
      }
    },
    'Sent Email To is required!'
  );

  const isValidSLA = createValidator(
    (message) => (value) => {
      if (type === 'EDIT' && !value) {
        return message;
      }
    },
    'Serive Level Agreement is required!'
  );

  const validate = combineValidators({
    category: composeValidators(isValidCategory)(),
    // subcategory: composeValidators(isValidSubCategory)(),
    status: isRequired('Status'),
    issueType: isRequired('Issue Type'),
    priority: isRequired('Priority'),
    complexity: isRequired('Complexity'),
    slaName: composeValidators(isValidSLA)(),
    estStartDate: composeValidators(isRequired('Est. Start Date'), isValidEstStartDate)(),
    estEndDate: composeValidators(isValidEstEndDate)(),
    ticketName: isRequired('Ticket Title'),
    description: composeValidators(isRequired('Description'), isValidDesc)(),
    resolution: composeValidators(isValidResolution)(),
    resource: composeValidators(isPrimaryResource)(),
    secondaryResource: composeValidators(isValidSecondResource)(),
    searchProjSummary: composeValidators(isValidSearchSummary)(),
    remark: composeValidators(isValidRemarks)(),
    emailReceiver: composeValidators(isValidEmailReceiver)(),
    // serialNumber: composeValidators(isValidSearchConfig)(),
  });

  return { validate };
}

export default FormTicketValHook;

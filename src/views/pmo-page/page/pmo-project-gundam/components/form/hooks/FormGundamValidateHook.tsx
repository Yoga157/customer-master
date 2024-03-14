import React from "react";
import {
  combineValidators,
  composeValidators,
  createValidator,
  isRequired,
} from "revalidate";
import tinymce from "tinymce";

function FormGundamValidateHook({
  status,
  initValTemplate,
  taskIssueType,
  assignToList,
  secoundResourceList,
  task,
  sendEmail,
  emailReceiverList,
  emailCcList,
}) {
  const isValidBrand = createValidator(
    (message) => (value) => {
      let item = "";
      if (
        initValTemplate.issueType &&
        taskIssueType?.find((item) => item.value === initValTemplate.issueType)
      ) {
        item = taskIssueType?.find(
          (item) => item.value === initValTemplate.issueType
        ).text;
      }

      if (
        !value &&
        (item === "Add-on (Hardware)" || item === "Hardware Problem")
      ) {
        return message;
      }
    },
    "Brand is required!"
  );

  const isValidSubBrand = createValidator(
    (message) => (value) => {
      let item = "";
      if (
        initValTemplate.issueType &&
        taskIssueType?.find((item) => item.value === initValTemplate.issueType)
      ) {
        item = taskIssueType?.find(
          (item) => item.value === initValTemplate.issueType
        ).text;
      }

      if (
        !value &&
        (item === "Add-on (Hardware)" || item === "Hardware Problem")
      ) {
        return message;
      }
    },
    "Sub Brand is required!"
  );

  const isValidRemarks = createValidator(
    (message) => (value) => {
      var content = tinymce
        .get("gundam-remark")
        ?.getContent({ format: "text" });
      if (
        ($.trim(content) == "" && status === "Void") ||
        ($.trim(content) == "" && status === "Hold")
      ) {
        return message;
      }
    },
    "Remark is required!"
  );

  const isDescription = createValidator(
    (message) => (value) => {
      if (!initValTemplate.taskDescription) {
        return message;
      }
    },
    "Description is required!"
  );

  const isValidCategorys = createValidator(
    (message) => (value) => {
      if (!value && !initValTemplate.category) {
        return message;
      }
    },
    "Category is required!"
  );

  const isValidIssueTypes = createValidator(
    (message) => (value) => {
      if (!value && !initValTemplate.issueType) {
        return message;
      }
    },
    "Issue Type is required!"
  );

  const isValidTaskStatus = createValidator(
    (message) => (value) => {
      if (task?.createDate) {
        if (!status) {
          return message;
        }
      }
    },
    "Task Status is required!"
  );

  const isAssignTo = createValidator(
    (message) => (value) => {
      if (
        task?.createDate &&
        assignToList.length === 0 &&
        status !== "New" &&
        status !== "Hold" &&
        status !== "Void"
      ) {
        return message;
      }
    },
    "Assign To is required!"
  );

  const isValidSecondResource = createValidator(
    (message) => (value) => {
      if (secoundResourceList.length === 0) {
        return message;
      }
    },
    "Secondary Resourch is required!"
  );

  const isValidEmailReceiver = createValidator(
    (message) => (value) => {
      if (emailReceiverList.length === 0 && sendEmail) {
        return message;
      }
    },
    "Sent Email To is required!"
  );

  const isValidEmailCC = createValidator(
    (message) => (value) => {
      if (emailCcList.length === 0 && sendEmail) {
        return message;
      }
    },
    "CC To is required!"
  );

  const isValidSLA = createValidator(
    (message) => (value) => {
      if (task?.createDate && !value) {
        return message;
      }
    },
    "Serive Level Agreement is required!"
  );

  const validate = combineValidators({
    category: composeValidators(isValidCategorys)(),
    issueTypes: composeValidators(isValidIssueTypes)(),
    brand: composeValidators(isValidBrand)(),
    subBrand: composeValidators(isValidSubBrand)(),
    text: isRequired("Task Name"),
    remark: composeValidators(isValidRemarks)(),
    slaName: composeValidators(isValidSLA)(),
    assignToo: composeValidators(isAssignTo)(),
    secondaryResourcess: composeValidators(isValidSecondResource)(),
    taskDescriptions: composeValidators(isDescription)(),
    taskStatus: composeValidators(isValidTaskStatus)(),
    emailReceiver: composeValidators(isValidEmailReceiver)(),
    // emailCc: composeValidators(isValidEmailCC)(),

    // categorys: isRequired('Category'),
    // issueTypes: isRequired('Issue Type'),
    // taskDescription: isRequired('Description'),
  });
  return { validate };
}

export default FormGundamValidateHook;
